<script setup>
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { tasks } from '../constants/tasks'
import { useSolvedTasks } from '../composables/useSolvedTasks'
import SolveTopbar from '../components/SolveTopbar.vue'
import DisclosureToggleButton from '../components/DisclosureToggleButton.vue'
import MutationWarningBanner from '../components/MutationWarningBanner.vue'
import SolveCheckResult from '../components/SolveCheckResult.vue'
import SolveEditorActions from '../components/SolveEditorActions.vue'
import SolveProblemDetails from '../components/SolveProblemDetails.vue'
import TaskMetaRow from '../components/TaskMetaRow.vue'

const Codemirror = defineAsyncComponent(() => import('vue-codemirror').then((m) => m.Codemirror))

const route = useRoute()
const router = useRouter()
const { markSolved, markCheckResult, reviewQueue } = useSolvedTasks('js-practice-solved-ids')

const taskId = computed(() => Number(route.params.id))
const task = computed(() => tasks.find((item) => item.id === taskId.value))

const code = ref('')
const logs = ref([])
const checkMessage = ref('まだチェックしていません。')
const checkPassed = ref(false)
const checkState = ref('idle')
const showHint = ref(false)
const showAnswer = ref(false)
const focusMode = ref(false)
const editorExtensions = shallowRef([])
const editorReady = ref(false)
const isRunning = ref(false)
const isChecking = ref(false)
const EXECUTION_TIMEOUT_MS = 1500
let scriptWorker = null
let scriptWorkerUrl = ''
let scriptRequestId = 0
const pendingScriptRequests = new Map()

onMounted(async () => {
  const [{ javascript }, { oneDark }] = await Promise.all([
    import('@codemirror/lang-javascript'),
    import('@codemirror/theme-one-dark')
  ])
  editorExtensions.value = [javascript(), oneDark]
  editorReady.value = true
})

const withConsoleTemplate = (source) => {
  if (/console\.log\s*\(/.test(source)) return source
  return `${source}\n\nconsole.log(/* ここに確認したい値 */)`
}

const buildExpectedScript = (source) => {
  if (/console\.log\s*\(/.test(source)) return source

  const varMatches = [...source.matchAll(/(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=/g)]
  const lastVar = varMatches[varMatches.length - 1]?.[1]
  if (lastVar) return `${source}\nconsole.log(${lastVar})`

  const fnMatches = [...source.matchAll(/function\s+([A-Za-z_$][\w$]*)\s*\(/g)]
  const lastFn = fnMatches[fnMatches.length - 1]?.[1]
  if (lastFn) {
    return `${source}\nconsole.log(typeof ${lastFn} === "function" ? "function defined" : ${lastFn})`
  }

  return source
}

const ensureScriptWorker = () => {
  if (scriptWorker) return scriptWorker

  const workerSource = `
self.onmessage = (event) => {
  const id = event.data?.id
  const source = event.data?.source ?? ''
  try {
    const localLogs = []
    const fakeConsole = {
      log: (...args) => localLogs.push(args.map((arg) => String(arg)).join(' ')),
      error: (...args) => localLogs.push('ERROR: ' + args.map((arg) => String(arg)).join(' '))
    }
    const runner = new Function('console', source)
    runner(fakeConsole)
    self.postMessage({ id, type: 'result', logs: localLogs })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    self.postMessage({ id, type: 'error', message })
  }
}
`

  scriptWorkerUrl = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }))
  scriptWorker = new Worker(scriptWorkerUrl)

  scriptWorker.onmessage = (event) => {
    const data = event.data ?? {}
    const request = pendingScriptRequests.get(data.id)
    if (!request) return
    clearTimeout(request.timer)
    pendingScriptRequests.delete(data.id)

    if (data.type === 'result') {
      request.resolve({ logs: Array.isArray(data.logs) ? data.logs : [], error: null, timedOut: false })
      return
    }
    request.resolve({ logs: [], error: new Error(data.message || '実行エラー'), timedOut: false })
  }

  scriptWorker.onerror = (event) => {
    const error = new Error(event.message || 'Worker実行エラー')
    for (const request of pendingScriptRequests.values()) {
      clearTimeout(request.timer)
      request.resolve({ logs: [], error, timedOut: false })
    }
    pendingScriptRequests.clear()
  }

  return scriptWorker
}

const executeScript = (source, timeoutMs = EXECUTION_TIMEOUT_MS) =>
  new Promise((resolve) => {
    const worker = ensureScriptWorker()
    const requestId = ++scriptRequestId

    const timer = setTimeout(() => {
      if (!pendingScriptRequests.has(requestId)) return
      pendingScriptRequests.delete(requestId)
      resolve({
        logs: [],
        error: new Error(`実行が${timeoutMs}msを超えたため停止しました。無限ループの可能性があります。`),
        timedOut: true
      })
    }, timeoutMs)

    pendingScriptRequests.set(requestId, { resolve, timer })
    worker.postMessage({ id: requestId, source })
  })

onBeforeUnmount(() => {
  for (const request of pendingScriptRequests.values()) {
    clearTimeout(request.timer)
    request.resolve({ logs: [], error: new Error('ページ遷移で実行を中断しました。'), timedOut: false })
  }
  pendingScriptRequests.clear()
  if (scriptWorker) {
    scriptWorker.terminate()
    scriptWorker = null
  }
  if (scriptWorkerUrl) {
    URL.revokeObjectURL(scriptWorkerUrl)
    scriptWorkerUrl = ''
  }
})

const toComparableLogs = (arr) =>
  arr
    .map((line) => String(line).replace(/\s+/g, ' ').trim())
    .filter((line) => line.length > 0)

const starterVariables = computed(() => {
  if (!task.value) return []

  const vars = []
  const pattern = /(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*([^\n;]+)/g
  let match = pattern.exec(task.value.starter)

  while (match) {
    vars.push({ name: match[1], sample: match[2].trim() })
    match = pattern.exec(task.value.starter)
  }

  return vars
})

const functionHints = computed(() => {
  if (!task.value) return []

  const hints = []
  const sources = [task.value.starter, task.value.answer]
  const pattern = /function\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)/g

  for (const source of sources) {
    let match = pattern.exec(source)
    while (match) {
      const params = match[2]
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean)

      const already = hints.find((item) => item.name === match[1])
      if (!already) hints.push({ name: match[1], params })

      match = pattern.exec(source)
    }
  }

  return hints
})

watch(
  task,
  (newTask) => {
    if (!newTask) {
      code.value = ''
      return
    }
    code.value = withConsoleTemplate(newTask.starter)
    logs.value = []
    checkMessage.value = 'まだチェックしていません。'
    checkPassed.value = false
    checkState.value = 'idle'
    showHint.value = false
    showAnswer.value = false
  },
  { immediate: true }
)

const normalize = (value) => value.replace(/\s+/g, ' ').trim()

const extractRequiredTokens = (source) => {
  const tokens = []
  const fnMatches = [...source.matchAll(/function\s+([A-Za-z_$][\w$]*)\s*\(/g)]
  const declMatches = [...source.matchAll(/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/g)]
  const methodMatches = [...source.matchAll(/\.(map|reduce|filter|toISOString|all|allSettled|catch|finally)\s*\(/g)]

  for (const match of fnMatches) tokens.push(match[1])
  for (const match of declMatches) tokens.push(match[1])
  for (const match of methodMatches) tokens.push(match[1])

  return [...new Set(tokens)].slice(0, 6)
}

const retryEntry = computed(() => {
  if (!task.value) return null
  return reviewQueue.value.find((item) => item.id === task.value.id) ?? null
})

const retryLabel = computed(() => {
  if (!retryEntry.value) return ''
  const date = new Date(retryEntry.value.nextReviewAt)
  if (Number.isNaN(date.getTime())) return ''
  return `${date.getMonth() + 1}/${date.getDate()}`
})

const runCode = async () => {
  if (isRunning.value || isChecking.value) return
  isRunning.value = true
  try {
    const executed = await executeScript(code.value)
    if (executed.error) {
      logs.value = [`実行エラー: ${executed.error.message}`]
      return
    }
    logs.value = executed.logs.length > 0 ? executed.logs : ['実行完了（console出力なし）']
  } finally {
    isRunning.value = false
  }
}

const checkCode = async () => {
  if (!task.value || isRunning.value || isChecking.value) return
  isChecking.value = true

  try {
    const userExec = await executeScript(code.value)
    if (userExec.error) {
      checkPassed.value = false
      checkState.value = 'ng'
      checkMessage.value = `構文/実行エラー: ${userExec.error.message}`
      markCheckResult(task.value.id, false)
      return
    }

    const expectedExec = await executeScript(buildExpectedScript(task.value.answer))
    if (expectedExec.error) {
      checkPassed.value = false
      checkState.value = 'ng'
      checkMessage.value = 'チェック基準の実行に失敗しました。時間をおいて再試行してください。'
      return
    }

    const userLogs = toComparableLogs(userExec.logs)
    const expectedLogs = toComparableLogs(expectedExec.logs)

    const matchedLogs =
      userLogs.length > 0 &&
      expectedLogs.length > 0 &&
      userLogs.length === expectedLogs.length &&
      userLogs.every((line, idx) => line === expectedLogs[idx])

    const matchedCode = normalize(code.value) === normalize(task.value.answer)
    const requiredTokens = extractRequiredTokens(task.value.answer)
    const missingTokens = requiredTokens.filter((token) => !code.value.includes(token))

    if (matchedCode || (matchedLogs && missingTokens.length === 0)) {
      checkPassed.value = true
      checkState.value = 'ok'
      checkMessage.value = matchedLogs
        ? 'チェックOK: 実行ログが期待値と一致しました。'
        : 'チェックOK: 解答例と一致しました。'
      markSolved(task.value.id)
      markCheckResult(task.value.id, true)
    } else {
      checkPassed.value = false
      checkState.value = 'ng'
      markCheckResult(task.value.id, false)
      if (matchedLogs && missingTokens.length > 0) {
        checkMessage.value = `チェックNG: 実装要素が不足しています -> ${missingTokens.join(' / ')}（7日後に再挑戦へ追加）`
        return
      }
      checkMessage.value = expectedLogs.length
        ? `チェックNG: 実行ログが一致しません。期待ログ: ${expectedLogs.join(' | ')}（7日後に再挑戦へ追加）`
        : 'チェックNG: ログまたはコードが一致しません。（7日後に再挑戦へ追加）'
    }
  } finally {
    isChecking.value = false
  }
}

const resetCode = () => {
  if (!task.value) return
  code.value = withConsoleTemplate(task.value.starter)
  logs.value = []
  checkMessage.value = 'リセットしました。'
  checkPassed.value = false
  checkState.value = 'idle'
}

const completeAndBack = () => {
  if (!task.value) return
  markSolved(task.value.id)
  router.push({ name: 'js-practice' })
}
</script>

<template>
  <section class="page" v-if="task">
    <SolveTopbar
      back-route-name="js-practice"
      :lesson-label="`JavaScript Lesson ${task.id}`"
      :title="task.title"
      @complete="completeAndBack"
    />

    <section class="workspace" :class="{ focus: focusMode }">
      <aside class="panel card info-panel">
        <p class="panel-title">問題</p>
        <p class="problem">{{ task.problem }}</p>
        <MutationWarningBanner :detail-text="task.mutationWarning" :level="task.mutationWarningLevel || 'high'" />
        <TaskMetaRow :level="task.level" :topic="task.topic" :duration="task.duration" :star-difficulty="task.starDifficulty" />

        <div class="context-box">
          <p class="label">前提データ</p>
          <p class="context-note">スターターコードから変数と引数を抽出しています。</p>

          <div v-if="starterVariables.length" class="context-group">
            <p class="context-title">用意されている変数</p>
            <ul>
              <li v-for="item in starterVariables" :key="item.name">
                <strong>{{ item.name }}</strong>: {{ item.sample }}
              </li>
            </ul>
          </div>

          <div v-if="functionHints.length" class="context-group">
            <p class="context-title">実装対象の関数</p>
            <ul>
              <li v-for="fn in functionHints" :key="fn.name">
                <strong>{{ fn.name }}</strong> ({{ fn.params.length ? fn.params.join(', ') : '引数なし' }})
              </li>
            </ul>
          </div>
        </div>

        <p v-if="retryEntry" class="retry-note">再挑戦予定: {{ retryLabel }} 以降にもう一度解いてみよう</p>

        <DisclosureToggleButton
          :expanded="showHint"
          collapsed-label="ヒントを表示"
          expanded-label="ヒント表示中"
          @toggle="showHint = !showHint"
        />
        <p v-if="showHint" class="hint">{{ task.hint }}</p>

        <DisclosureToggleButton
          :expanded="showAnswer"
          collapsed-label="解答例を表示"
          expanded-label="解答例表示中"
          @toggle="showAnswer = !showAnswer"
        />
        <pre v-if="showAnswer" class="answer">{{ task.answer }}</pre>
      </aside>

      <section class="panel card editor-panel" :aria-busy="isRunning || isChecking">
        <div class="editor-head">
          <p class="panel-title">エディタ</p>
          <button type="button" class="focus-toggle" :class="{ on: focusMode }" @click="focusMode = !focusMode">
            {{ focusMode ? '集中モード解除' : '集中モード' }}
          </button>
        </div>

        <SolveProblemDetails :task="task" :include-starter-samples="true" />

        <component
          :is="Codemirror"
          v-if="editorReady"
          v-model="code"
          :extensions="editorExtensions"
          :style="{ height: '520px' }"
        />
        <div v-else class="editor-loading">エディタを読み込み中...</div>

        <SolveEditorActions
          :show-run="true"
          :is-running="isRunning"
          :is-checking="isChecking"
          @run="runCode"
          @check="checkCode"
          @reset="resetCode"
        />

        <SolveCheckResult :state="checkState" :message="checkMessage" />
      </section>

      <aside class="panel card output-panel">
        <p class="panel-title">実行ログ</p>
        <pre class="log-box">{{ logs.length ? logs.join('\n') : 'まだ実行していません。' }}</pre>
      </aside>
    </section>
  </section>

  <section class="page" v-else>
    <div class="card empty-card">
      <h1>問題が見つかりません</h1>
      <RouterLink class="back-link" :to="{ name: 'js-practice' }">JavaScript問題一覧へ戻る</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.page {
  color: var(--text-main);
  padding: var(--space-4);
  background:
    radial-gradient(circle at 80% -20%, rgba(7, 80, 171, 0.14) 0%, rgba(7, 80, 171, 0) 42%),
    linear-gradient(180deg, rgba(240, 245, 252, 0.82), rgba(240, 245, 252, 0.26));
  border-radius: calc(var(--radius-lg) + 6px);
}

.card {
  border-radius: 14px;
  border: 1px solid var(--line);
  background: var(--surface);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(14px);
}

.back-link {
  text-decoration: none;
  color: var(--accent);
  font-weight: 600;
}

.workspace {
  margin-top: var(--space-3);
  display: grid;
  grid-template-columns: var(--layout-sidepane-w) 1fr var(--layout-sidepane-w);
  gap: var(--layout-gap);
}

.panel {
  padding: var(--space-3);
  min-width: 0;
}

.panel-title {
  margin: 0 0 var(--space-3);
  font-size: 13px;
  letter-spacing: 0.06em;
  color: var(--text-sub);
  text-transform: uppercase;
  font-weight: 700;
}

.editor-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.focus-toggle {
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
}

.focus-toggle.on {
  background: #e9f2ff;
  color: #1d4f91;
}

.problem {
  margin: 0;
  color: var(--text-main);
  line-height: 1.55;
}

.context-box {
  margin-top: var(--space-3);
  border-radius: 10px;
  border: 1px solid #dfe3eb;
  background: #f8f9fb;
  padding: var(--space-3);
}

.label {
  margin: 0;
  font-weight: 700;
  color: var(--text-main);
}

.context-note {
  margin: var(--space-2) 0 0;
  color: var(--text-sub);
  font-size: 13px;
}

.context-group {
  margin-top: var(--space-2);
}

.context-title {
  margin: 0 0 var(--space-1);
  color: #44638e;
  font-weight: 700;
}

.context-group ul {
  margin: 0;
  padding-left: 18px;
}

.context-group li {
  margin-bottom: 3px;
  color: var(--text-sub);
}

.retry-note {
  margin: var(--space-2) 0 0;
  color: #91571c;
  font-size: 12px;
  font-weight: 700;
}

.hint {
  margin-top: var(--space-2);
  border: 1px solid #e8d6a8;
  background: #fff8e7;
  color: #7a5c1e;
  border-radius: var(--radius-md);
  padding: var(--space-3);
  font-size: 14px;
}

.answer,
.log-box {
  margin-top: var(--space-2);
  border-radius: var(--radius-md);
  border: 1px solid #dfe3eb;
  background: #f7f8fa;
  color: #1f232b;
  padding: var(--space-3);
  font-size: 13px;
  line-height: 1.5;
  overflow-x: auto;
}

:deep(.cm-editor) {
  border: 1px solid #d2d8e2;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
}

:deep(.cm-gutters) {
  background: #f3f5f8;
  border-right: 1px solid #d2d8e2;
}

.editor-loading {
  height: 520px;
  display: grid;
  place-items: center;
  border: 1px solid #d2d8e2;
  border-radius: 10px;
  color: var(--text-sub);
  background: #f8fafc;
}

.empty-card {
  padding: var(--space-4);
}

.workspace.focus {
  grid-template-columns: 1fr;
}

.workspace.focus .info-panel,
.workspace.focus .output-panel {
  display: none;
}

@media (max-width: 1200px) {
  .workspace {
    grid-template-columns: 1fr;
  }
}
</style>
