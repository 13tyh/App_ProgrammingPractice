import { ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { usePracticeList } from '../../src/composables/usePracticeList'

const sampleTasks = [
  { id: 1, title: 'A', level: '初級', topic: 'array', duration: '5分', problem: 'alpha' },
  { id: 2, title: 'B', level: '中級', topic: 'promise', duration: '8分', problem: 'beta' }
]

describe('usePracticeList', () => {
  it('難易度とキーワードで絞り込みできる', () => {
    const solved = ref([])
    const reviewQueue = ref([])
    const state = usePracticeList(sampleTasks, solved, reviewQueue)

    state.selectedDifficulty.value = '初級'
    state.keyword.value = 'alp'

    expect(state.displayTasks.value).toHaveLength(1)
    expect(state.displayTasks.value[0].id).toBe(1)
  })

  it('再挑戦期限のみフィルタで期限到来問題だけ表示する', () => {
    const solved = ref([])
    const reviewQueue = ref([
      { id: 1, nextReviewAt: '2000-01-01T00:00:00.000Z' },
      { id: 2, nextReviewAt: '2999-01-01T00:00:00.000Z' }
    ])
    const state = usePracticeList(sampleTasks, solved, reviewQueue)

    state.showOnlyDueReview.value = true

    expect(state.displayTasks.value).toHaveLength(1)
    expect(state.displayTasks.value[0].id).toBe(1)
  })
})
