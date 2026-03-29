import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MutationWarningBanner from '../../src/components/MutationWarningBanner.vue'

describe('MutationWarningBanner', () => {
  it('detailモードでdetailTextを表示する', () => {
    const wrapper = mount(MutationWarningBanner, {
      props: {
        detailText: '破壊的変更に注意',
        level: 'high'
      }
    })

    expect(wrapper.text()).toContain('破壊的変更に注意')
    expect(wrapper.classes()).toContain('is-high')
  })

  it('compactモードでWARNINGプレフィックスを表示する', () => {
    const wrapper = mount(MutationWarningBanner, {
      props: {
        mode: 'compact',
        shortText: '配列を直接変更します',
        level: 'caution'
      }
    })

    expect(wrapper.text()).toContain('WARNING: 配列を直接変更します')
    expect(wrapper.classes()).toContain('is-caution')
  })
})
