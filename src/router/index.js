import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const NowView = () => import('../views/NowView.vue')
const TodayView = () => import('../views/TodayView.vue')
const RecentView = () => import('../views/RecentView.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/now', component: NowView },
      { path: '/today', component: TodayView },
      { path: '/recent', component: RecentView },
      { path: '/', redirect: '/now' }
    ]
  })
}
