<script setup>
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { vueTasks } from '../constants/vueTasks'
import { useSolvedTasks } from '../composables/useSolvedTasks'
import SolveTopbar from '../components/SolveTopbar.vue'
import DisclosureToggleButton from '../components/DisclosureToggleButton.vue'
import MutationWarningBanner from '../components/MutationWarningBanner.vue'
import SolveCheckResult from '../components/SolveCheckResult.vue'
import SolveEditorActions from '../components/SolveEditorActions.vue'
import SolveProblemDetails from '../components/SolveProblemDetails.vue'
import StructuredInfoBlock from '../components/StructuredInfoBlock.vue'
import TaskMetaRow from '../components/TaskMetaRow.vue'

const Codemirror = defineAsyncComponent(() => import('vue-codemirror').then((m) => m.Codemirror))

const route = useRoute()
const router = useRouter()
const { markSolved, markCheckResult, reviewQueue } = useSolvedTasks('vue-practice-solved-ids')

const taskId = computed(() => Number(route.params.id))
const task = computed(() => vueTasks.find((item) => item.id === taskId.value))

const code = ref('')
const checkMessage = ref('まだチェックしていません。')
const checkPassed = ref(false)
const checkState = ref('idle')
const showHint = ref(false)
const showAnswer = ref(false)
const focusMode = ref(false)
const editorExtensions = shallowRef([])
const editorReady = ref(false)
const isChecking = ref(false)
const EXECUTION_TIMEOUT_MS = 1500
const MAX_EXEC_SOURCE_LENGTH = 20000
const BLOCKED_EXEC_PATTERNS = [
  {
    pattern: /\b(importScripts|XMLHttpRequest|WebSocket|EventSource|BroadcastChannel)\b/,
    message: 'セキュリティ上の理由でネットワーク関連APIの一部は実行できません。'
  },
  {
    pattern: /\bnavigator\.sendBeacon\s*\(/,
    message: 'sendBeacon は実行できません。'
  },
  {
    pattern: /\b(postMessage)\s*\(/,
    message: 'postMessage の直接利用は制限されています。'
  }
]
let scriptWorker = null
let scriptWorkerUrl = ''
let scriptRequestId = 0
const pendingScriptRequests = new Map()

const validateExecutableSource = (source) => {
  if (source.length > MAX_EXEC_SOURCE_LENGTH) {
    return `コード量が上限（${MAX_EXEC_SOURCE_LENGTH}文字）を超えています。`
  }

  const blocked = BLOCKED_EXEC_PATTERNS.find((item) => item.pattern.test(source))
  if (blocked) return blocked.message
  return null
}

onMounted(async () => {
  const [{ javascript }, { oneDark }] = await Promise.all([
    import('@codemirror/lang-javascript'),
    import('@codemirror/theme-one-dark')
  ])
  editorExtensions.value = [javascript(), oneDark]
  editorReady.value = true
})

watch(
  task,
  (newTask) => {
    if (!newTask) {
      code.value = ''
      return
    }
    code.value = newTask.starter
    checkMessage.value = 'まだチェックしていません。'
    checkPassed.value = false
    checkState.value = 'idle'
    showHint.value = false
    showAnswer.value = false
  },
  { immediate: true }
)

const stripComments = (value) =>
  value
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')

const normalize = (value) => value.replace(/\s+/g, ' ').trim()
const normalizeForCheck = (value) => normalize(stripComments(value))

const extractScriptContent = (source) => {
  const matched = source.match(/<script[^>]*>([\s\S]*?)<\/script>/i)
  return matched?.[1] ?? ''
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

    const sandbox = {
      ref: (value) => ({ value }),
      reactive: (value) => value,
      computed: (getter) => ({ value: getter() }),
      watch: () => {},
      watchEffect: (effect) => effect(),
      onMounted: (handler) => handler(),
      defineProps: () => ({}),
      defineEmits: () => () => {},
      useRouter: () => ({ push: () => {}, replace: () => {} }),
      useRoute: () => ({ params: {}, query: {} })
    }

    const guardedSource = [
      '"use strict";',
      'const importScripts = undefined;',
      'const XMLHttpRequest = undefined;',
      'const WebSocket = undefined;',
      'const EventSource = undefined;',
      'const BroadcastChannel = undefined;',
      'const postMessage = undefined;',
      'with (sandbox) {',
      source,
      '}'
    ].join('\n')

    const runner = new Function('console', 'sandbox', guardedSource)
    runner(fakeConsole, sandbox)
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
    const validationError = validateExecutableSource(source)
    if (validationError) {
      resolve({ logs: [], error: new Error(validationError), timedOut: false })
      return
    }

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

const shouldRuntimeCheck = (scriptContent) => {
  const withoutImport = scriptContent.replace(/^\s*import[^\n]*$/gm, '').trim()
  if (!withoutImport) return false
  return !/\b(await|export)\b/.test(withoutImport)
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

const designSections = computed(() => {
  if (!task.value?.design) return []
  return [
    { title: '実装要件', items: task.value.design.requirements ?? [] },
    { title: '推奨手順', items: task.value.design.steps ?? [], ordered: true },
    { title: '達成条件', items: task.value.design.acceptance ?? [] },
    { title: 'ハマりどころ', items: task.value.design.pitfalls ?? [] }
  ]
})

const specSections = computed(() => {
  if (!task.value?.spec) return []
  return [
    { title: '前提条件', items: task.value.spec.assumptions ?? [] },
    { title: '入出力例', items: task.value.spec.ioExamples ?? [] },
    { title: '対象外', items: task.value.spec.outOfScope ?? [] }
  ]
})

const checkCode = async () => {
  if (!task.value || isChecking.value) return
  isChecking.value = true

  try {
    const source = normalizeForCheck(code.value)
    const answer = normalizeForCheck(task.value.answer)
    const checks = task.value.checks ?? []
    const hasPlaceholder = code.value.includes('// ここを実装')
    const needsTemplate = task.value.starter.includes('<template>')
    const hasTemplate = /<template[\s>]/.test(code.value) && /<\/template>/.test(code.value)
    const hasScript = /<script[\s>]/.test(code.value) && /<\/script>/.test(code.value)

    const missing = checks.filter((token) => !source.includes(normalizeForCheck(token)))

    if (hasPlaceholder) {
      checkPassed.value = false
      checkState.value = 'ng'
      checkMessage.value = 'チェックNG: プレースホルダーが残っています。（7日後に再挑戦へ追加）'
      markCheckResult(task.value.id, false)
      return
    }

    if ((needsTemplate && !hasTemplate) || !hasScript) {
      checkPassed.value = false
      checkState.value = 'ng'
      checkMessage.value = 'チェックNG: template/script の基本構造を整えてください。（7日後に再挑戦へ追加）'
      markCheckResult(task.value.id, false)
      return
    }

    const scriptContent = extractScriptContent(code.value).replace(/^\s*import[^\n]*$/gm, '').trim()
    if (shouldRuntimeCheck(scriptContent)) {
      const runtime = await executeScript(scriptContent)
      if (runtime.error) {
        checkPassed.value = false
        checkState.value = 'ng'
        checkMessage.value = `チェックNG: 実行時エラーがあります -> ${runtime.error.message}（7日後に再挑戦へ追加）`
        markCheckResult(task.value.id, false)
        return
      }
    }

    if (source === answer || missing.length === 0) {
      checkPassed.value = true
      checkState.value = 'ok'
      checkMessage.value = 'チェックOK: 必須ポイントを満たしています。'
      markSolved(task.value.id)
      markCheckResult(task.value.id, true)
      return
    }

    checkPassed.value = false
    checkState.value = 'ng'
    checkMessage.value = `チェックNG: 次の要素を追加してください -> ${missing.join(' / ')}（7日後に再挑戦へ追加）`
    markCheckResult(task.value.id, false)
  } finally {
    isChecking.value = false
  }
}

const resetCode = () => {
  if (!task.value) return
  code.value = task.value.starter
  checkMessage.value = 'リセットしました。'
  checkPassed.value = false
  checkState.value = 'idle'
}

const completeAndBack = () => {
  if (!task.value) return
  markSolved(task.value.id)
  router.push({ name: 'vue-practice' })
}
</script>

<template>
  <section class="page" v-if="task">
    <SolveTopbar
      back-route-name="vue-practice"
      :lesson-label="`Vue Lesson ${task.id}`"
      :title="task.title"
      @complete="completeAndBack"
    />

    <section class="workspace" :class="{ focus: focusMode }">
      <aside class="panel card info-panel">
        <p class="panel-title">問題</p>
        <p class="problem">{{ task.problem }}</p>
        <MutationWarningBanner :detail-text="task.mutationWarning" :level="task.mutationWarningLevel || 'high'" />
        <TaskMetaRow :level="task.level" :topic="task.topic" :duration="task.duration" :star-difficulty="task.starDifficulty" />

        <StructuredInfoBlock
          v-if="task.design"
          title="設計メモ"
          :objective="task.design.objective"
          :sections="designSections"
          :review="task.design.review"
        />

        <p v-if="retryEntry" class="retry-note">再挑戦予定: {{ retryLabel }} 以降にもう一度解いてみよう</p>

        <StructuredInfoBlock v-if="task.spec" title="仕様詳細" :sections="specSections" />

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

      <section class="panel card editor-panel" :aria-busy="isChecking">
        <div class="editor-head">
          <p class="panel-title">エディタ</p>
          <button type="button" class="focus-toggle" :class="{ on: focusMode }" @click="focusMode = !focusMode">
            {{ focusMode ? '集中モード解除' : '集中モード' }}
          </button>
        </div>

        <SolveProblemDetails :task="task" :include-spec-assumptions="true" />

        <component
          :is="Codemirror"
          v-if="editorReady"
          v-model="code"
          :extensions="editorExtensions"
          :style="{ height: '520px' }"
        />
        <div v-else class="editor-loading">エディタを読み込み中...</div>

        <SolveEditorActions :is-running="false" :is-checking="isChecking" @check="checkCode" @reset="resetCode" />

        <SolveCheckResult :state="checkState" :message="checkMessage" />
      </section>
    </section>
  </section>

  <section class="page" v-else>
    <div class="card empty-card">
      <h1>問題が見つかりません</h1>
      <RouterLink class="back-link" :to="{ name: 'vue-practice' }">Vue問題一覧へ戻る</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.page {
  color: var(--text-main);
  padding: var(--space-4);
  background:
    radial-gradient(circle at 80% -20%, rgba(20, 89, 178, 0.14) 0%, rgba(20, 89, 178, 0) 42%),
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
  grid-template-columns: var(--layout-sidepane-w) 1fr;
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

.hint {
  margin-top: var(--space-2);
  border: 1px solid #e8d6a8;
  background: #fff8e7;
  color: #7a5c1e;
  border-radius: var(--radius-md);
  padding: var(--space-3);
  font-size: 14px;
}

.retry-note {
  margin: var(--space-2) 0 0;
  color: #91571c;
  font-size: 12px;
  font-weight: 700;
}

.answer {
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

.workspace.focus .info-panel {
  display: none;
}

@media (max-width: 1240px) {
  .workspace {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .page {
    padding: var(--space-3);
    border-radius: var(--radius-md);
  }

  .workspace {
    margin-top: var(--space-2);
    gap: var(--space-2);
  }

  .panel {
    padding: var(--space-2);
  }

  .editor-head {
    align-items: stretch;
    flex-direction: column;
  }

  .focus-toggle {
    width: 100%;
    min-height: 40px;
  }

  .answer,
  .hint,
  .retry-note {
    font-size: 12px;
    line-height: 1.45;
  }

  :deep(.cm-editor) {
    font-size: 13px;
  }

  .editor-loading {
    height: 380px;
  }
}

@media (max-width: 430px) {
  .page {
    padding: var(--space-2);
  }

  .panel-title {
    font-size: 12px;
    margin-bottom: var(--space-2);
  }

  .problem,
  .retry-note {
    font-size: 12px;
  }

  .answer,
  .hint {
    padding: var(--space-2);
  }

  :deep(.cm-editor) {
    min-height: 360px;
  }
}
</style>
