import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SolveProblemDetails from '../../src/components/SolveProblemDetails.vue'

const sampleTask = {
  id: 1,
  title: 'タイトル',
  problem: '問題文',
  level: '初級',
  topic: '配列',
  duration: '10分',
  starDifficulty: 3,
  thinking: {
    functionSignature: 'sum(a, b)',
    argumentHints: ['a: number', 'b: number'],
    starterSamples: ['sum(1, 2)'],
    conditions: ['戻り値は number']
  },
  spec: {
    assumptions: ['null は来ない']
  }
}

describe('SolveProblemDetails', () => {
  it('問題詳細とシグネチャを表示する', () => {
    const wrapper = mount(SolveProblemDetails, {
      props: { task: sampleTask }
    })

    expect(wrapper.text()).toContain('タイトル')
    expect(wrapper.text()).toContain('シグネチャ: sum(a, b)')
  })

  it('オプション有効時に追加情報を表示する', () => {
    const wrapper = mount(SolveProblemDetails, {
      props: {
        task: sampleTask,
        includeStarterSamples: true,
        includeSpecAssumptions: true
      }
    })

    expect(wrapper.text()).toContain('例: sum(1, 2)')
    expect(wrapper.text()).toContain('null は来ない')
  })
})
