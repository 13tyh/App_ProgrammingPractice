import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PracticeTaskList from '../../src/components/PracticeTaskList.vue'

const routerLinkStub = {
  template: '<a><slot /></a>'
}

describe('PracticeTaskList', () => {
  it('空状態でリセットボタンを押すとclear-filtersをemitする', async () => {
    const wrapper = mount(PracticeTaskList, {
      props: {
        displayTasks: [],
        solvedTaskIds: [],
        solvedCount: 0,
        progressPercent: 0,
        solveRouteName: 'js-practice-solve',
        hasActiveFilters: true,
        activeFilterSummary: ['難易度: 初級']
      },
      global: {
        stubs: {
          RouterLink: routerLinkStub
        }
      }
    })

    await wrapper.get('.empty-clear').trigger('click')

    expect(wrapper.emitted('clear-filters')).toBeTruthy()
    expect(wrapper.text()).toContain('現在の条件')
  })

  it('完了トグル操作でtoggle-solvedをemitする', async () => {
    const wrapper = mount(PracticeTaskList, {
      props: {
        displayTasks: [
          {
            id: 12,
            title: '配列を結合する',
            problem: 'concatで新しい配列を作る',
            level: '初級',
            topic: '配列',
            duration: '8分',
            starDifficulty: 2
          }
        ],
        solvedTaskIds: [],
        solvedCount: 0,
        progressPercent: 0,
        solveRouteName: 'js-practice-solve'
      },
      global: {
        stubs: {
          RouterLink: routerLinkStub
        }
      }
    })

    await wrapper.get('.toggle-button').trigger('click')

    expect(wrapper.emitted('toggle-solved')?.[0]).toEqual([12])
  })
})
