import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import StructuredInfoBlock from '../../src/components/StructuredInfoBlock.vue'

describe('StructuredInfoBlock', () => {
  it('見出しとセクションを表示する', () => {
    const wrapper = mount(StructuredInfoBlock, {
      props: {
        title: '設計メモ',
        objective: '目的を明確にする',
        sections: [
          { title: '実装要件', items: ['条件A', '条件B'] },
          { title: '手順', items: ['1', '2'], ordered: true }
        ],
        review: 'レビュー観点'
      }
    })

    expect(wrapper.text()).toContain('設計メモ')
    expect(wrapper.text()).toContain('目的を明確にする')
    expect(wrapper.text()).toContain('条件A')
    expect(wrapper.text()).toContain('レビュー観点')
    expect(wrapper.find('ol').exists()).toBe(true)
  })
})
