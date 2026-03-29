import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { nextTick } from 'vue'
import App from '../../src/App.vue'

const routes = [
  { path: '/js-practice', component: { template: '<div>JS</div>' } },
  { path: '/vue-practice', component: { template: '<div>Vue</div>' } }
]

describe('App', () => {
  it('ハンバーガーメニューを開閉でき、リンククリックで閉じる', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes
    })

    router.push('/js-practice')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })

    const button = wrapper.get('.hamburger-button')
    const nav = wrapper.get('.course-nav')

    expect(button.attributes('aria-expanded')).toBe('false')
    expect(nav.classes()).not.toContain('open')

    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('true')
    expect(nav.classes()).toContain('open')

    await wrapper.get('a[href="/vue-practice"]').trigger('click')
    await nextTick()

    expect(button.attributes('aria-expanded')).toBe('false')
    expect(nav.classes()).not.toContain('open')
  })
})
