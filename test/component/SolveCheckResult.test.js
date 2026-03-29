import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SolveCheckResult from '../../src/components/SolveCheckResult.vue'

describe('SolveCheckResult', () => {
  it('ok状態でチェック成功表示になる', () => {
    const wrapper = mount(SolveCheckResult, {
      props: {
        state: 'ok',
        message: 'チェックOK'
      }
    })

    expect(wrapper.classes()).toContain('ok')
    expect(wrapper.text()).toContain('チェックOK')
    expect(wrapper.text()).toContain('✓')
  })

  it('ng状態でエラー表示になる', () => {
    const wrapper = mount(SolveCheckResult, {
      props: {
        state: 'ng',
        message: 'チェックNG'
      }
    })

    expect(wrapper.classes()).toContain('ng')
    expect(wrapper.text()).toContain('!')
  })
})
