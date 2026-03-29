import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CompletionToggleButton from '../../src/components/CompletionToggleButton.vue'

describe('CompletionToggleButton', () => {
  it('状態に応じてラベルが変わる', async () => {
    const wrapper = mount(CompletionToggleButton, {
      props: { isSolved: false }
    })

    expect(wrapper.text()).toContain('完了にする')

    await wrapper.setProps({ isSolved: true })
    expect(wrapper.text()).toContain('未完了に戻す')
  })

  it('クリックでtoggleをemitする', async () => {
    const wrapper = mount(CompletionToggleButton, {
      props: { isSolved: false }
    })

    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('toggle')).toBeTruthy()
  })
})
