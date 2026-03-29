import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SolveTopbar from '../../src/components/SolveTopbar.vue'

const routerLinkStub = {
  template: '<a><slot /></a>'
}

describe('SolveTopbar', () => {
  it('タイトルとラベルを表示する', () => {
    const wrapper = mount(SolveTopbar, {
      props: {
        backRouteName: 'js-practice',
        lessonLabel: 'JavaScript Lesson 1',
        title: '配列を結合する'
      },
      global: {
        stubs: {
          RouterLink: routerLinkStub
        }
      }
    })

    expect(wrapper.text()).toContain('JavaScript Lesson 1')
    expect(wrapper.text()).toContain('配列を結合する')
  })

  it('完了ボタン押下でcompleteをemitする', async () => {
    const wrapper = mount(SolveTopbar, {
      props: {
        backRouteName: 'js-practice',
        lessonLabel: 'L',
        title: 'T'
      },
      global: {
        stubs: {
          RouterLink: routerLinkStub
        }
      }
    })

    await wrapper.get('.done-button').trigger('click')
    expect(wrapper.emitted('complete')).toBeTruthy()
  })
})
