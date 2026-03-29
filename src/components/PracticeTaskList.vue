<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import CompletionToggleButton from './CompletionToggleButton.vue'
import MutationWarningBanner from './MutationWarningBanner.vue'
import TaskMetaRow from './TaskMetaRow.vue'

const props = defineProps({
  displayTasks: { type: Array, required: true },
  solvedTaskIds: { type: Array, required: true },
  solvedCount: { type: Number, required: true },
  progressPercent: { type: Number, required: true },
  solveRouteName: { type: String, required: true },
  showDesign: { type: Boolean, default: false },
  dueReviewTaskIds: { type: Array, default: () => [] },
  weakLevels: { type: Array, default: () => [] },
  hasActiveFilters: { type: Boolean, default: false },
  activeFilterSummary: { type: Array, default: () => [] }
})

const emit = defineEmits(['toggle-solved', 'clear-filters'])

const priorityReason = (task, isSolved, isDueReview, isWeakLevel) => {
  if (isDueReview) return '前回ミスから 7 日経過。再挑戦に最適です。'
  if (!isSolved && isWeakLevel) {
    return `いま ${task.level} の達成率が低めです。ここを先に進めると効率的です。`
  }
  if (!isSolved) return '未着手の問題です。今解くと進捗が伸びます。'
  return ''
}

const solvedTaskIdSet = computed(() => new Set(props.solvedTaskIds))
const dueReviewTaskIdSet = computed(() => new Set(props.dueReviewTaskIds))
const weakLevelSet = computed(() => new Set(props.weakLevels))

const listItems = computed(() =>
  props.displayTasks.map((task) => {
    const isSolved = solvedTaskIdSet.value.has(task.id)
    const isDueReview = dueReviewTaskIdSet.value.has(task.id)
    const isWeakLevel = weakLevelSet.value.has(task.level)
    return {
      task,
      isSolved,
      isDueReview,
      priority: priorityReason(task, isSolved, isDueReview, isWeakLevel)
    }
  })
)
</script>

<template>
  <section class="content card">
    <header class="content-head">
      <h2>問題リスト</h2>
      <p>表示中 {{ displayTasks.length }} 問 / 完了 {{ solvedCount }} 問（表示条件内 {{ progressPercent }}%）</p>
    </header>

    <div class="task-list" v-if="displayTasks.length">
      <article v-for="item in listItems" :key="item.task.id" class="task-item">
        <div class="item-main">
          <TaskMetaRow
            :level="item.task.level"
            :topic="item.task.topic"
            :duration="item.task.duration"
            :star-difficulty="item.task.starDifficulty"
            :show-status="true"
            :is-solved="item.isSolved"
            :show-due-review="item.isDueReview"
          />
          <h3>{{ item.task.title }}</h3>
          <p>{{ item.task.problem }}</p>
          <MutationWarningBanner
            mode="compact"
            :short-text="item.task.mutationWarningShort"
            :level="item.task.mutationWarningLevel || 'high'"
          />
          <p class="priority" v-if="item.priority">
            {{ item.priority }}
          </p>

          <template v-if="showDesign">
            <details class="spec-toggle" v-if="item.task.spec">
              <summary>仕様詳細を開く</summary>

              <p class="spec-subtitle">前提条件</p>
              <ul class="spec-list">
                <li v-for="spec in item.task.spec.assumptions" :key="`a-${item.task.id}-${spec}`">{{ spec }}</li>
              </ul>

              <p class="spec-subtitle">入出力例</p>
              <ul class="spec-list">
                <li v-for="spec in item.task.spec.ioExamples" :key="`io-${item.task.id}-${spec}`">{{ spec }}</li>
              </ul>

              <p class="spec-subtitle">対象外</p>
              <ul class="spec-list">
                <li v-for="spec in item.task.spec.outOfScope" :key="`o-${item.task.id}-${spec}`">{{ spec }}</li>
              </ul>
            </details>
          </template>
        </div>

        <div class="item-actions">
          <CompletionToggleButton :is-solved="item.isSolved" @toggle="emit('toggle-solved', item.task.id)" />
          <RouterLink class="solve-link" :to="{ name: solveRouteName, params: { id: item.task.id } }">
            解く
          </RouterLink>
        </div>
      </article>
    </div>

    <div v-else class="empty-state">
      <p class="empty">条件に合う問題がありません。</p>
      <p v-if="hasActiveFilters" class="empty-sub">現在の条件: {{ activeFilterSummary.join(' / ') }}</p>
      <button v-if="hasActiveFilters" type="button" class="empty-clear" @click="emit('clear-filters')">
        条件をリセットする
      </button>
    </div>
  </section>
</template>

<style scoped>
.card {
  border-radius: var(--radius-lg);
  border: 1px solid #e3e3e8;
  background: var(--surface);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(14px);
}

.content {
  padding: var(--space-3);
}

.content-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2);
  align-items: baseline;
  padding-bottom: var(--space-3);
  border-bottom: 1px solid #e3e5eb;
}

.content-head h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 740;
  letter-spacing: -0.015em;
}

.content-head p {
  margin: 0;
  color: var(--text-sub);
  font-size: 14px;
}

.task-list {
  margin-top: var(--space-2);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.task-item {
  border: 1px solid #e2e4ea;
  background: #ffffff;
  border-radius: var(--radius-md);
  padding: var(--space-3);
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
}

.task-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.item-main h3 {
  margin: var(--space-2) 0 var(--space-1);
  font-size: 23px;
  font-weight: 730;
  letter-spacing: -0.012em;
}

.item-main p {
  margin: 0;
  color: var(--text-sub);
  line-height: 1.5;
  font-size: 15px;
}

.priority {
  margin-top: var(--space-2) !important;
  color: #255b9b !important;
  font-weight: 700;
  font-size: 13px !important;
}

.spec-toggle {
  margin-top: var(--space-2);
  border: 1px solid #dfe3eb;
  border-radius: 10px;
  background: #f8f9fb;
  padding: var(--space-2) var(--space-3);
}

.spec-toggle summary {
  cursor: pointer;
  color: var(--accent);
  font-size: 12px;
  font-weight: 700;
}

.spec-subtitle {
  margin: var(--space-2) 0 var(--space-1) !important;
  color: #326db4 !important;
  font-size: 12px;
  font-weight: 700;
}

.spec-list {
  margin: 0;
  padding-left: 18px;
  color: var(--text-sub);
  font-size: 12px;
  line-height: 1.45;
}

.spec-list li + li {
  margin-top: var(--space-1);
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: calc(var(--layout-sidebar-w) * 0.42);
}

.solve-link {
  text-align: center;
  border-radius: var(--radius-md);
  padding: 7px var(--space-2);
  font-weight: 600;
}

.solve-link {
  text-decoration: none;
  border: 1px solid transparent;
  color: #ffffff;
  background: var(--accent);
  box-shadow: 0 6px 14px rgba(0, 113, 227, 0.24);
}

.empty {
  margin: var(--space-3) 0 0;
  color: var(--text-sub);
}

.empty-state {
  margin-top: var(--space-3);
}

.empty-sub {
  margin: var(--space-2) 0 0;
  color: var(--text-sub);
  font-size: 13px;
}

.empty-clear {
  margin-top: var(--space-2);
  border: 1px solid #cdd6e2;
  border-radius: var(--radius-md);
  background: #ffffff;
  color: var(--text-main);
  font-weight: 600;
  padding: var(--space-2) var(--space-3);
  cursor: pointer;
}

@media (max-width: 760px) {
  .task-item {
    flex-direction: column;
  }

  .item-actions {
    min-width: 0;
    flex-direction: row;
  }

  .item-actions > * {
    flex: 1;
  }
}
</style>
