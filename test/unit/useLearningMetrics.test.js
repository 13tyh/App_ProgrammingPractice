import { ref } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useLearningMetrics } from '../../src/composables/useLearningMetrics'

describe('useLearningMetrics', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-30T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('レベル別達成率と当日件数を計算できる', () => {
    const tasks = [
      { id: 1, level: '初級' },
      { id: 2, level: '初級' },
      { id: 3, level: '中級' }
    ]

    const solvedTaskIds = ref([1, 3])
    const learningHistory = ref([
      { type: 'solve', at: '2026-03-30T08:00:00.000Z' },
      { type: 'check-pass', at: '2026-03-30T09:00:00.000Z' },
      { type: 'check-fail', at: '2026-03-30T10:00:00.000Z' }
    ])
    const reviewQueue = ref([{ id: 9, nextReviewAt: '2026-03-29T00:00:00.000Z' }])

    const metrics = useLearningMetrics(tasks, solvedTaskIds, learningHistory, reviewQueue)

    const beginner = metrics.solvedByLevel.value.find((item) => item.level === '初級')
    expect(beginner).toMatchObject({ solved: 1, total: 2, percent: 50 })
    expect(metrics.todaySolvedCount.value).toBe(2)
    expect(metrics.dueReviewCount.value).toBe(1)
  })

  it('当日学習が無い場合は連続日数が0になる', () => {
    const tasks = [{ id: 1, level: '初級' }]
    const solvedTaskIds = ref([])
    const learningHistory = ref([{ type: 'solve', at: '2026-03-29T09:00:00.000Z' }])
    const reviewQueue = ref([])

    const metrics = useLearningMetrics(tasks, solvedTaskIds, learningHistory, reviewQueue)
    expect(metrics.currentStreak.value).toBe(0)
  })
})
