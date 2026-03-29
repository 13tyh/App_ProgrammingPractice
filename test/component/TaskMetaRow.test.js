import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TaskMetaRow from '../../src/components/TaskMetaRow.vue'

describe('TaskMetaRow', () => {
  it('基本メタ情報を表示する', () => {
    const wrapper = mount(TaskMetaRow, {
      props: {
        level: '初級',
        topic: '配列',
        duration: '10分',
        starDifficulty: 4
      }
    })

    expect(wrapper.text()).toContain('初級')
    expect(wrapper.text()).toContain('配列')
    expect(wrapper.text()).toContain('10分')
    expect(wrapper.text()).toContain('難易度 ★★★★☆')
  })

  it('showStatus=trueで完了状態を表示する', () => {
    const wrapper = mount(TaskMetaRow, {
      props: {
        level: '中級',
        topic: '非同期',
        duration: '15分',
        showStatus: true,
        isSolved: true
      }
    })

    expect(wrapper.text()).toContain('完了')
  })
})
