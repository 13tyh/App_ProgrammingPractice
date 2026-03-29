import { computed, onBeforeUnmount, ref, watch } from 'vue'

export const difficultyOptions = ['すべて', '初級', '中級', '上級', '実務']
const difficultyOrder = { 初級: 0, 中級: 1, 上級: 2, 実務: 3 }

const normalizeStarDifficulty = (value) => {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return 3
  return Math.max(1, Math.min(5, Math.round(numeric)))
}

export const usePracticeList = (allTasks, solvedTaskIds, reviewQueue = ref([])) => {
  const selectedDifficulty = ref('すべて')
  const keyword = ref('')
  const debouncedKeyword = ref('')
  const showOnlyUnsolved = ref(false)
  const showOnlyDueReview = ref(false)
  const solvedTaskIdSet = computed(() => new Set(solvedTaskIds.value))
  const isSolved = (id) => solvedTaskIdSet.value.has(id)
  let debounceTimer = null

  watch(
    keyword,
    (value) => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        debouncedKeyword.value = value.trim().toLowerCase()
      }, 180)
    },
    { immediate: true }
  )

  onBeforeUnmount(() => {
    if (debounceTimer) clearTimeout(debounceTimer)
  })

  const dueReviewTaskIds = computed(() => {
    const now = Date.now()
    return reviewQueue.value
      .filter((item) => new Date(item.nextReviewAt).getTime() <= now)
      .map((item) => item.id)
  })
  const dueReviewTaskIdSet = computed(() => new Set(dueReviewTaskIds.value))

  const searchableTasks = computed(() =>
    allTasks.map((task) => ({
      ...task,
      searchText: `${task.title} ${task.topic} ${task.problem}`.toLowerCase()
    }))
  )

  const filteredTasks = computed(() => {
    const taskPool = searchableTasks.value
    const byDifficulty =
      selectedDifficulty.value === 'すべて'
        ? taskPool
        : taskPool.filter((task) => task.level === selectedDifficulty.value)

    const byKeyword = byDifficulty.filter((task) => {
      const q = debouncedKeyword.value
      if (!q) return true
      return task.searchText.includes(q)
    })

    const bySolved = !showOnlyUnsolved.value
      ? byKeyword
      : byKeyword.filter((task) => !isSolved(task.id))

    if (!showOnlyDueReview.value) return bySolved
    return bySolved.filter((task) => dueReviewTaskIdSet.value.has(task.id))
  })

  const displayTasks = computed(() =>
    [...filteredTasks.value].sort((a, b) => {
      const solvedA = isSolved(a.id)
      const solvedB = isSolved(b.id)
      if (solvedA !== solvedB) return solvedA ? 1 : -1

      const levelA = difficultyOrder[a.level] ?? Number.MAX_SAFE_INTEGER
      const levelB = difficultyOrder[b.level] ?? Number.MAX_SAFE_INTEGER
      if (levelA !== levelB) return levelA - levelB

      const starA = normalizeStarDifficulty(a.starDifficulty)
      const starB = normalizeStarDifficulty(b.starDifficulty)
      if (starA !== starB) return starA - starB
      return a.id - b.id
    })
  )

  const solvedCount = computed(() =>
    filteredTasks.value.filter((task) => isSolved(task.id)).length
  )

  const progressPercent = computed(() => {
    if (filteredTasks.value.length === 0) return 0
    return Math.round((solvedCount.value / filteredTasks.value.length) * 100)
  })

  const totalSolvedCount = computed(
    () => allTasks.filter((task) => isSolved(task.id)).length
  )

  const totalProgressPercent = computed(() => {
    if (allTasks.length === 0) return 0
    return Math.round((totalSolvedCount.value / allTasks.length) * 100)
  })

  const hasActiveFilters = computed(
    () =>
      selectedDifficulty.value !== 'すべて' ||
      keyword.value.trim().length > 0 ||
        showOnlyUnsolved.value ||
        showOnlyDueReview.value
  )

  const activeFilterSummary = computed(() => {
    const items = []
    if (selectedDifficulty.value !== 'すべて') {
      items.push(`難易度: ${selectedDifficulty.value}`)
    }
    if (debouncedKeyword.value) {
      items.push(`検索: ${debouncedKeyword.value}`)
    }
    if (showOnlyUnsolved.value) {
      items.push('未完了のみ')
    }
    if (showOnlyDueReview.value) {
      items.push('再挑戦期限のみ')
    }
    return items
  })

  const resetFilters = () => {
    selectedDifficulty.value = 'すべて'
    keyword.value = ''
    showOnlyUnsolved.value = false
    showOnlyDueReview.value = false
  }

  return {
    selectedDifficulty,
    keyword,
    showOnlyUnsolved,
    showOnlyDueReview,
    dueReviewTaskIds,
    filteredTasks,
    displayTasks,
    solvedCount,
    progressPercent,
    totalSolvedCount,
    totalProgressPercent,
    hasActiveFilters,
    activeFilterSummary,
    resetFilters
  }
}
