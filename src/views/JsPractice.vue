<script setup>
import { computed } from 'vue'
import { tasks } from '../constants/tasks'
import { difficultyOptions, usePracticeList } from '../composables/usePracticeList'
import { useSolvedTasks } from '../composables/useSolvedTasks'
import { useLearningMetrics } from '../composables/useLearningMetrics'
import DashboardHero from '../components/DashboardHero.vue'
import PracticeFiltersSidebar from '../components/PracticeFiltersSidebar.vue'
import PracticeTaskList from '../components/PracticeTaskList.vue'

const { solvedTaskIds, learningHistory, reviewQueue, toggleSolved } = useSolvedTasks('js-practice-solved-ids')

const {
  selectedDifficulty,
  keyword,
  showOnlyUnsolved,
  showOnlyDueReview,
  dueReviewTaskIds,
  displayTasks,
  solvedCount,
  progressPercent,
  totalSolvedCount,
  totalProgressPercent,
  hasActiveFilters,
  activeFilterSummary,
  resetFilters
} = usePracticeList(tasks, solvedTaskIds, reviewQueue)

const { solvedByLevel, recentDailySolved, currentStreak, dueReviewCount, todaySolvedCount } = useLearningMetrics(
  tasks,
  solvedTaskIds,
  learningHistory,
  reviewQueue
)

const dailyGoal = 3
const weakLevels = computed(() =>
  solvedByLevel.value.filter((item) => item.total > 0 && item.percent < 60).map((item) => item.level)
)
</script>

<template>
  <section class="page">
    <DashboardHero eyebrow="JavaScript" />

    <section class="workspace">
      <PracticeFiltersSidebar
        :total-progress-percent="totalProgressPercent"
        :total-solved-count="totalSolvedCount"
        :total-task-count="tasks.length"
        :difficulty-options="difficultyOptions"
        :selected-difficulty="selectedDifficulty"
        :keyword="keyword"
        :show-only-unsolved="showOnlyUnsolved"
        :show-only-due-review="showOnlyDueReview"
        :has-active-filters="hasActiveFilters"
        :current-streak="currentStreak"
        :due-review-count="dueReviewCount"
        :today-solved-count="todaySolvedCount"
        :daily-goal="dailyGoal"
        :recent-daily-solved="recentDailySolved"
        :solved-by-level="solvedByLevel"
        @update:selected-difficulty="selectedDifficulty = $event"
        @update:keyword="keyword = $event"
        @update:show-only-unsolved="showOnlyUnsolved = $event"
        @update:show-only-due-review="showOnlyDueReview = $event"
        @clear-filters="resetFilters"
      />

      <PracticeTaskList
        :display-tasks="displayTasks"
        :solved-task-ids="solvedTaskIds"
        :solved-count="solvedCount"
        :progress-percent="progressPercent"
        :due-review-task-ids="dueReviewTaskIds"
        :weak-levels="weakLevels"
        :has-active-filters="hasActiveFilters"
        :active-filter-summary="activeFilterSummary"
        solve-route-name="js-practice-solve"
        @toggle-solved="toggleSolved"
        @clear-filters="resetFilters"
      />
    </section>
  </section>
</template>

<style scoped>
.page {
  color: var(--text-main);
  padding: var(--space-4);
  background:
    radial-gradient(circle at 10% 0%, rgba(0, 113, 227, 0.12) 0%, rgba(0, 113, 227, 0) 42%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.74), rgba(255, 255, 255, 0));
  border-radius: calc(var(--radius-lg) + 0.375rem);
}

.workspace {
  margin-top: var(--space-3);
  display: grid;
  grid-template-columns: var(--layout-sidebar-w) 1fr;
  gap: var(--layout-gap);
}

@media (max-width: 62.5rem) {
  .workspace {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 47.5rem) {
  .page {
    padding: var(--space-3);
    border-radius: var(--radius-md);
  }

  .workspace {
    margin-top: var(--space-2);
    gap: var(--space-2);
  }
}
</style>
