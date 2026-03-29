<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import CompletionToggleButton from './CompletionToggleButton.vue'
import MutationWarningBanner from './MutationWarningBanner.vue'
import TaskMetaRow from './TaskMetaRow.vue'

const PAGE_SIZE = 24

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
const currentPage = ref(1)

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

const totalPages = computed(() => Math.max(1, Math.ceil(listItems.value.length / PAGE_SIZE)))

const pageStartIndex = computed(() => (currentPage.value - 1) * PAGE_SIZE)

const pagedItems = computed(() =>
  listItems.value.slice(pageStartIndex.value, pageStartIndex.value + PAGE_SIZE)
)

const pageRangeLabel = computed(() => {
  if (!listItems.value.length) return '0-0'
  const start = pageStartIndex.value + 1
  const end = Math.min(pageStartIndex.value + PAGE_SIZE, listItems.value.length)
  return `${start}-${end}`
})

const movePage = (nextPage) => {
  currentPage.value = Math.min(totalPages.value, Math.max(1, nextPage))
}

watch(
  () => props.displayTasks,
  () => {
    currentPage.value = 1
  }
)

watch(totalPages, (value) => {
  if (currentPage.value > value) currentPage.value = value
})
</script>

<template>
  <section class="content card">
    <header class="content-head">
      <h2>問題リスト</h2>
      <p>表示中 {{ displayTasks.length }} 問 / 完了 {{ solvedCount }} 問（表示条件内 {{ progressPercent }}%）</p>
    </header>

    <div v-if="displayTasks.length" class="paging-status">
      <span>{{ pageRangeLabel }} / {{ displayTasks.length }} 問</span>
      <span>ページ {{ currentPage }} / {{ totalPages }}</span>
    </div>

    <div class="task-list" v-if="displayTasks.length">
      <article v-for="item in pagedItems" :key="item.task.id" class="task-item">
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

    <nav v-if="displayTasks.length && totalPages > 1" class="pagination" aria-label="問題リストページ移動">
      <button type="button" :disabled="currentPage === 1" @click="movePage(currentPage - 1)">前へ</button>
      <button type="button" :disabled="currentPage === totalPages" @click="movePage(currentPage + 1)">次へ</button>
    </nav>
  </section>
</template>

<style scoped>
.card {
  border-radius: var(--radius-lg);
  border: 0.0625rem solid #e3e3e8;
  background: var(--surface);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(0.875rem);
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
  border-bottom: 0.0625rem solid #e3e5eb;
}

.content-head h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 740;
  letter-spacing: -0.015em;
}

.content-head p {
  margin: 0;
  color: var(--text-sub);
  font-size: 0.875rem;
}

.task-list {
  margin-top: var(--space-2);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.paging-status {
  margin-top: var(--space-2);
  display: flex;
  justify-content: space-between;
  gap: var(--space-2);
  font-size: 0.75rem;
  color: var(--text-sub);
}

.task-item {
  border: 0.0625rem solid #e2e4ea;
  background: #ffffff;
  border-radius: var(--radius-md);
  padding: var(--space-3);
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
}

.task-item:hover {
  transform: translateY(-0.0625rem);
  box-shadow: 0 0.5rem 1.25rem rgba(15, 23, 42, 0.08);
}

.item-main h3 {
  margin: var(--space-2) 0 var(--space-1);
  font-size: 1.4375rem;
  font-weight: 730;
  letter-spacing: -0.012em;
}

.item-main p {
  margin: 0;
  color: var(--text-sub);
  line-height: 1.5;
  font-size: 0.9375rem;
}

.priority {
  margin-top: var(--space-2) !important;
  color: #255b9b !important;
  font-weight: 700;
  font-size: 0.8125rem !important;
}

.spec-toggle {
  margin-top: var(--space-2);
  border: 0.0625rem solid #dfe3eb;
  border-radius: 0.625rem;
  background: #f8f9fb;
  padding: var(--space-2) var(--space-3);
}

.spec-toggle summary {
  cursor: pointer;
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 700;
}

.spec-subtitle {
  margin: var(--space-2) 0 var(--space-1) !important;
  color: #326db4 !important;
  font-size: 0.75rem;
  font-weight: 700;
}

.spec-list {
  margin: 0;
  padding-left: 1.125rem;
  color: var(--text-sub);
  font-size: 0.75rem;
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
  padding: 0.4375rem var(--space-2);
  font-weight: 600;
}

.solve-link {
  text-decoration: none;
  border: 0.0625rem solid transparent;
  color: #ffffff;
  background: var(--accent);
  box-shadow: 0 0.375rem 0.875rem rgba(0, 113, 227, 0.24);
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
  font-size: 0.8125rem;
}

.empty-clear {
  margin-top: var(--space-2);
  border: 0.0625rem solid #cdd6e2;
  border-radius: var(--radius-md);
  background: #ffffff;
  color: var(--text-main);
  font-weight: 600;
  padding: var(--space-2) var(--space-3);
  cursor: pointer;
}

.pagination {
  margin-top: var(--space-3);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
}

.pagination button {
  border: 0.0625rem solid var(--line);
  border-radius: var(--radius-md);
  padding: 0.4375rem 0.75rem;
  background: #ffffff;
  color: var(--text-main);
  font-weight: 600;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

@media (max-width: 47.5rem) {
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

  .paging-status,
  .pagination {
    justify-content: space-between;
  }

  .pagination button {
    flex: 1;
  }
}

@media (max-width: 26.875rem) {
  .content {
    padding: var(--space-2);
  }

  .content-head h2 {
    font-size: 1.25rem;
  }

  .content-head p {
    font-size: 0.75rem;
  }

  .task-item {
    padding: var(--space-2);
  }

  .item-main h3 {
    font-size: 1.125rem;
  }

  .item-main p {
    font-size: 0.8125rem;
  }

  .item-actions {
    flex-direction: column;
  }
}

@media (max-width: 18.75rem) {
  .content-head {
    gap: 0.25rem;
  }

  .content-head h2 {
    font-size: 1.0625rem;
  }

  .task-item {
    gap: var(--space-2);
    padding: 0.5rem;
  }

  .item-main h3 {
    font-size: 1rem;
  }

  .item-main p,
  .priority,
  .spec-list {
    font-size: 0.75rem !important;
  }
}
</style>
