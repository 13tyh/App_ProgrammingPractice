import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DashboardHero from '../../src/components/DashboardHero.vue'

describe('DashboardHero', () => {
  it('eyebrowとtitleを表示する', () => {
    const wrapper = mount(DashboardHero, {
      props: {
        eyebrow: 'JavaScript',
        title: '学習ダッシュボード'
      }
    })

    expect(wrapper.text()).toContain('JavaScript')
    expect(wrapper.text()).toContain('学習ダッシュボード')
  })
})
