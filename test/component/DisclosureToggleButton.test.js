import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DisclosureToggleButton from '../../src/components/DisclosureToggleButton.vue'

describe('DisclosureToggleButton', () => {
  it('expandedに応じてラベルを切り替える', async () => {
    const wrapper = mount(DisclosureToggleButton, {
      props: {
        expanded: false,
        collapsedLabel: 'ヒントを表示',
        expandedLabel: 'ヒント表示中'
      }
    })

    expect(wrapper.text()).toContain('ヒントを表示')

    await wrapper.setProps({ expanded: true })
    expect(wrapper.text()).toContain('ヒント表示中')
  })

  it('クリックでtoggleをemitする', async () => {
    const wrapper = mount(DisclosureToggleButton, {
      props: {
        expanded: false,
        collapsedLabel: 'A',
        expandedLabel: 'B'
      }
    })

    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('toggle')).toBeTruthy()
  })
})
