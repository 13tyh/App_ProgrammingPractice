export const routes = [
  {
    path: '/',
    redirect: '/js-practice'
  },
  {
    path: '/js-practice',
    name: 'js-practice',
    component: () => import('../views/JsPractice.vue')
  },
  {
    path: '/js-practice/:id',
    name: 'js-practice-solve',
    component: () => import('../views/JsPracticeSolve.vue')
  },
  {
    path: '/vue-practice',
    name: 'vue-practice',
    component: () => import('../views/VuePractice.vue')
  },
  {
    path: '/vue-practice/:id',
    name: 'vue-practice-solve',
    component: () => import('../views/VuePracticeSolve.vue')
  }
]
