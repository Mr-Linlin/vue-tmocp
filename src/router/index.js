import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: { title: '电大在线教育平台' },
    component: Layout,
    redirect: '/home'
  },
  {
    path: '/home',
    component: Layout,
    meta: { title: '后台首页' },
    redirect: '/welcome',
    children: [
      { path: '/welcome', meta: { title: 'Dashboard', icon: 'el-icon-s-home' }, component: () => import('@/views/backend/home/Welcome') },
    ]
  },
  {
    path: '/user',
    component: Layout,
    meta: { title: '用户管理' },
    redirect: '/userList',
    children: [
      { path: '/userList', meta: { title: '用户列表', icon: 'el-icon-s-home' }, component: () => import('@/views/backend/user/UserList') },
    ]
  },
  {
    path: '/course',
    component: Layout,
    meta: { title: '课程管理' },
    redirect: '/courseList',
    children: [
      { path: '/courseList', meta: { title: '课程', icon: 'el-icon-s-home' }, component: () => import('@/views/backend/course/CourseList') },
      { path: '/courseProfessional', meta: { title: '课程专业', icon: 'el-icon-s-home' }, component: () => import('@/views/backend/course/CourseProfessional') }
    ]
  },
  {
    path: '/order',
    component: Layout,
    meta: { title: '订单管理' },
    redirect: '/orderList',
    children: [
      { path: '/orderList', meta: { title: '订单', icon: 'el-icon-s-home' }, component: () => import('@/views/backend/order/OrderList') },
      { path: '/orderWater', meta: { title: '订单流水', icon: 'el-icon-s-home' }, component: () => import('@/views/backend/order/OrderWater') }
    ]
  },
  {
    path: '/record',
    component: Layout,
    meta: { title: '学习管理' },
    redirect: '/learnRecord',
    children: [
      { path: '/learnRecord', meta: { title: '学习记录', icon: 'el-icon-s-home' }, component: () => import('@/views/backend/record/LearnRecord') },
    ]
  },
  {
    path: '/index',
    meta: { title: '首页' },
    name: 'index',
    component: () => import('@/views/frontend/home/index'),
  },
  { path: '*', component: () => import('@/views/error-page/404') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
