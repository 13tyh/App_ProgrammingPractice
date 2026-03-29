import { computed } from 'vue'

const DAY_MS = 24 * 60 * 60 * 1000

const toDateKey = (iso) => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const shiftDateKey = (base, deltaDays) => {
  const d = new Date(base)
  if (Number.isNaN(d.getTime())) return ''
  const shifted = new Date(d.getTime() + deltaDays * DAY_MS)
  return toDateKey(shifted.toISOString())
}

export const useLearningMetrics = (allTasks, solvedTaskIds, learningHistory, reviewQueue) => {
  const solvedByLevel = computed(() => {
    const levels = ['初級', '中級', '上級', '実務']
    return levels.map((level) => {
      const levelTasks = allTasks.filter((task) => task.level === level)
      const solved = levelTasks.filter((task) => solvedTaskIds.value.includes(task.id)).length
      const percent = levelTasks.length ? Math.round((solved / levelTasks.length) * 100) : 0
      return {
        level,
        solved,
        total: levelTasks.length,
        percent
      }
    })
  })

  const recentDailySolved = computed(() => {
    const solvedEvents = learningHistory.value.filter(
      (event) => event.type === 'check-pass' || event.type === 'solve'
    )

    const countByDay = new Map()
    for (const event of solvedEvents) {
      const key = toDateKey(event.at)
      if (!key) continue
      countByDay.set(key, (countByDay.get(key) ?? 0) + 1)
    }

    const today = new Date()
    const points = []
    for (let i = 6; i >= 0; i -= 1) {
      const date = new Date(today.getTime() - i * DAY_MS)
      const key = toDateKey(date.toISOString())
      points.push({
        key,
        label: `${date.getMonth() + 1}/${date.getDate()}`,
        count: countByDay.get(key) ?? 0
      })
    }
    return points
  })

  const currentStreak = computed(() => {
    const solvedDays = new Set(
      learningHistory.value
        .filter((event) => event.type === 'check-pass' || event.type === 'solve')
        .map((event) => toDateKey(event.at))
        .filter(Boolean)
    )

    const todayKey = toDateKey(new Date().toISOString())
    if (!solvedDays.has(todayKey)) return 0

    let streak = 0
    let offset = 0
    while (true) {
      const key = shiftDateKey(new Date().toISOString(), -offset)
      if (!key || !solvedDays.has(key)) break
      streak += 1
      offset += 1
    }
    return streak
  })

  const dueReviewCount = computed(() => {
    const now = Date.now()
    return reviewQueue.value.filter((item) => new Date(item.nextReviewAt).getTime() <= now).length
  })

  const todaySolvedCount = computed(() => {
    const todayKey = toDateKey(new Date().toISOString())
    return recentDailySolved.value.find((item) => item.key === todayKey)?.count ?? 0
  })

  return {
    solvedByLevel,
    recentDailySolved,
    currentStreak,
    dueReviewCount,
    todaySolvedCount
  }
}
