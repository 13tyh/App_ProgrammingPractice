import { beforeEach, describe, expect, it } from 'vitest'
import { useSolvedTasks } from '../../src/composables/useSolvedTasks'

beforeEach(() => {
  localStorage.clear()
})

describe('useSolvedTasks', () => {
  it('toggleSolvedで完了状態を切り替える', () => {
    const state = useSolvedTasks('test-solved')

    state.toggleSolved(10)
    expect(state.solvedTaskIds.value).toContain(10)

    state.toggleSolved(10)
    expect(state.solvedTaskIds.value).not.toContain(10)
  })

  it('markCheckResult(false)で7日後再挑戦キューに入る', () => {
    const state = useSolvedTasks('test-review')
    state.markCheckResult(3, false)

    expect(state.reviewQueue.value).toHaveLength(1)
    expect(state.reviewQueue.value[0].id).toBe(3)
    expect(state.learningHistory.value.at(-1).type).toBe('check-fail')
  })
})
