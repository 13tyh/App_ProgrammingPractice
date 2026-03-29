import { onBeforeUnmount, ref } from 'vue'

export const useSolvedTasks = (storageKey) => {
  const historyKey = `${storageKey}:history`
  const reviewQueueKey = `${storageKey}:review-queue`
  const WRITE_DELAY_MS = 180
  const writeTimers = new Map()
  const pendingWrites = new Map()

  const loadSolvedIds = () => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return []
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  const loadHistory = () => {
    try {
      const raw = localStorage.getItem(historyKey)
      if (!raw) return []
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  const loadReviewQueue = () => {
    try {
      const raw = localStorage.getItem(reviewQueueKey)
      if (!raw) return []
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  const solvedTaskIds = ref(loadSolvedIds())
  const learningHistory = ref(loadHistory())
  const reviewQueue = ref(loadReviewQueue())

  const scheduleWrite = (key, value) => {
    pendingWrites.set(key, value)

    const existingTimer = writeTimers.get(key)
    if (existingTimer) clearTimeout(existingTimer)

    const timer = setTimeout(() => {
      const nextValue = pendingWrites.get(key)
      if (typeof nextValue === 'string') {
        localStorage.setItem(key, nextValue)
      }
      pendingWrites.delete(key)
      writeTimers.delete(key)
    }, WRITE_DELAY_MS)

    writeTimers.set(key, timer)
  }

  onBeforeUnmount(() => {
    for (const timer of writeTimers.values()) clearTimeout(timer)
    for (const [key, value] of pendingWrites.entries()) {
      localStorage.setItem(key, value)
    }
    writeTimers.clear()
    pendingWrites.clear()
  })

  const saveSolvedIds = (ids) => {
    scheduleWrite(storageKey, JSON.stringify(ids))
    solvedTaskIds.value = ids
  }

  const saveHistory = (items) => {
    const capped = items.slice(-600)
    scheduleWrite(historyKey, JSON.stringify(capped))
    learningHistory.value = capped
  }

  const saveReviewQueue = (items) => {
    scheduleWrite(reviewQueueKey, JSON.stringify(items))
    reviewQueue.value = items
  }

  const addHistory = (event) => {
    const entry = {
      type: event.type,
      id: event.id,
      at: new Date().toISOString()
    }
    saveHistory([...learningHistory.value, entry])
  }

  const scheduleRetry = (id, days = 7) => {
    const nextReviewAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
    const withoutTask = reviewQueue.value.filter((item) => item.id !== id)
    saveReviewQueue([
      ...withoutTask,
      {
        id,
        nextReviewAt,
        createdAt: new Date().toISOString(),
        reason: 'check-fail'
      }
    ])
  }

  const clearRetry = (id) => {
    if (!reviewQueue.value.some((item) => item.id === id)) return
    saveReviewQueue(reviewQueue.value.filter((item) => item.id !== id))
  }

  const refreshSolved = () => {
    solvedTaskIds.value = loadSolvedIds()
    learningHistory.value = loadHistory()
    reviewQueue.value = loadReviewQueue()
  }

  const isSolved = (id) => solvedTaskIds.value.includes(id)

  const toggleSolved = (id) => {
    if (isSolved(id)) {
      saveSolvedIds(solvedTaskIds.value.filter((item) => item !== id))
      addHistory({ type: 'unsolve', id })
      return
    }
    saveSolvedIds([...solvedTaskIds.value, id])
    addHistory({ type: 'solve', id })
  }

  const markSolved = (id) => {
    if (isSolved(id)) return
    saveSolvedIds([...solvedTaskIds.value, id])
    addHistory({ type: 'solve', id })
  }

  const markCheckResult = (id, passed) => {
    if (passed) {
      addHistory({ type: 'check-pass', id })
      clearRetry(id)
      return
    }
    addHistory({ type: 'check-fail', id })
    scheduleRetry(id, 7)
  }

  return {
    solvedTaskIds,
    learningHistory,
    reviewQueue,
    refreshSolved,
    isSolved,
    toggleSolved,
    markSolved,
    markCheckResult
  }
}
