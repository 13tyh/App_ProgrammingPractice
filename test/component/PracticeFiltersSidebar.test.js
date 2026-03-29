import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PracticeFiltersSidebar from '../../src/components/PracticeFiltersSidebar.vue'

const baseProps = {
  totalProgressPercent: 40,
  totalSolvedCount: 4,
  totalTaskCount: 10,
  difficultyOptions: ['すべて', '初級', '中級'],
  selectedDifficulty: 'すべて',
  keyword: '',
  showOnlyUnsolved: false,
  showOnlyDueReview: false,
  hasActiveFilters: true,
  currentStreak: 2,
  dueReviewCount: 1,
  todaySolvedCount: 1,
  dailyGoal: 3,
  recentDailySolved: [{ key: 'k', label: '3/30', count: 1 }],
  solvedByLevel: [{ level: '初級', solved: 2, total: 4, percent: 50 }]
}

describe('PracticeFiltersSidebar', () => {
  it('検索入力でupdate:keywordをemitする', async () => {
    const wrapper = mount(PracticeFiltersSidebar, { props: baseProps })

    await wrapper.get('input[type="text"]').setValue('配列')
    expect(wrapper.emitted('update:keyword')?.[0]).toEqual(['配列'])
  })

  it('難易度ボタン押下でupdate:selectedDifficultyをemitする', async () => {
    const wrapper = mount(PracticeFiltersSidebar, { props: baseProps })

    const buttons = wrapper.findAll('.level-button')
    await buttons[1].trigger('click')

    expect(wrapper.emitted('update:selectedDifficulty')?.[0]).toEqual(['初級'])
  })

  it('クリアボタンでclear-filtersをemitする', async () => {
    const wrapper = mount(PracticeFiltersSidebar, { props: baseProps })

    await wrapper.get('.clear-button').trigger('click')
    expect(wrapper.emitted('clear-filters')).toBeTruthy()
  })
})
