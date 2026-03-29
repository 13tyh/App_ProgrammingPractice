import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SolveEditorActions from '../../src/components/SolveEditorActions.vue'

describe('SolveEditorActions', () => {
  it('showRun=true で実行ボタンを表示する', () => {
    const wrapper = mount(SolveEditorActions, {
      props: {
        showRun: true,
        isRunning: false,
        isChecking: false
      }
    })

    expect(wrapper.text()).toContain('実行')
    expect(wrapper.text()).toContain('チェック')
    expect(wrapper.text()).toContain('リセット')
  })

  it('ボタン押下で対応するイベントをemitする', async () => {
    const wrapper = mount(SolveEditorActions, {
      props: {
        showRun: true,
        isRunning: false,
        isChecking: false
      }
    })

    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    await buttons[1].trigger('click')
    await buttons[2].trigger('click')

    expect(wrapper.emitted('run')).toBeTruthy()
    expect(wrapper.emitted('check')).toBeTruthy()
    expect(wrapper.emitted('reset')).toBeTruthy()
  })
})
