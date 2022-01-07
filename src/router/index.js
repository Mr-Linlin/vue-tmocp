import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/index'
// import store from '@/store'

// 解决重复点击路由导致的错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
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
      { path: '/welcome', name: "home", meta: { title: 'Dashboard', icon: 'el-icon-s-home' }, component: () => import('@/views/backend/home/Welcome') },
      { path: '/studyVideo', name: "studyVideo", meta: { title: '观看视频', icon: 'el-icon-s-home' }, component: () => import('@/views/studentsend/course/childComps/StudyVideo') },
    ]
  },
  {
    path: '/index',
    meta: { title: '首页' },
    name: 'Index',
    component: () => import('@/views/frontend/home/index'),
  },

  // { path: '/404', component: () => import('@/views/error-page/404') }
]
// 点击登录时将路由动态添加到路由中，根据用户权限显示不同的路由
export const aysncRouter = [
  {
    path: '/user',
    component: Layout,
    meta: { title: '学员管理', roles: ['admin'], icon: 'iconlzt icon-lzt-yonghuguanli' },
    redirect: '/userList',
    children: [
      { path: '/userList', name: 'userList', meta: { title: '用户列表', icon: 'iconlzt icon-lzt-yonghuguanli' }, component: () => import('@/views/backend/user/UserList') },
    ]
  },
  {
    path: '/record',
    component: Layout,
    meta: { title: '学习管理', roles: ['admin'], icon: 'iconlzt icon-lzt-xuexiguanli' },
    redirect: '/learnRecord',
    children: [
      { path: '/learnRecord', name: 'learnRecord', meta: { title: '学习记录', icon: 'iconlzt icon-lzt-xuexiguanli' }, component: () => import('@/views/backend/record/LearnRecord') },
    ]
  },
  {
    path: '/order',
    component: Layout,
    meta: { title: '订单管理', roles: ['admin'], icon: 'iconlzt icon-lzt-dingdanguanli' },
    redirect: '/orderList',
    children: [
      { path: '/orderList', name: 'orderList', meta: { title: '订单', icon: 'iconlzt icon-lzt-dingdanguanli' }, component: () => import('@/views/backend/order/OrderList') },
      { path: '/orderWater', name: 'orderWater', meta: { title: '订单流水', icon: 'iconlzt icon-lzt-dingdanguanli' }, component: () => import('@/views/backend/order/OrderWater') }
    ]
  },
  {
    path: '/course',
    component: Layout,
    meta: { title: '课程管理', roles: ['admin'], icon: 'iconlzt icon-lzt-kechengguanli' },
    redirect: '/courseList',
    children: [
      { path: '/courseList', name: 'courseList', meta: { title: '课程', icon: 'iconlzt icon-lzt-kechengguanli' }, component: () => import('@/views/backend/course/CourseList') },
      { path: '/courseProfessional', name: 'courseProfessional', meta: { title: '课程专业', icon: 'iconlzt icon-lzt-kechengguanli' }, component: () => import('@/views/backend/course/CourseProfessional') }
    ]
  },
  {
    path: '/news',
    component: Layout,
    meta: { title: '公告管理', roles: ['admin'], icon: 'iconlzt icon-lzt-kechengguanli' },
    redirect: '/courseList',
    children: [
      { path: '/courseList', name: 'courseList', meta: { title: '课程', icon: 'iconlzt icon-lzt-kechengguanli' }, component: () => import('@/views/backend/course/CourseList') },
    ]
  },
  {
    path: '/exam',
    component: Layout,
    meta: { title: '考试管理', roles: ['admin'], icon: 'iconlzt icon-lzt-kaoshi' },
    redirect: '/examList',
    children: [
      { path: '/examList', name: 'examList', meta: { title: '考试列表', icon: 'iconlzt icon-lzt-kaoshi' }, component: () => import('@/views/backend/exam/ExamList') },
    ]
  },
  {
    path: '/stuexam',
    component: Layout,
    meta: { title: '考试', roles: ['testin'], icon: 'iconlzt icon-lzt-kaoshi' },
    redirect: '/stuExams',
    children: [
      { path: '/stuExams', name: 'stuExams', meta: { title: '试卷列表', icon: 'iconlzt icon-lzt-kaoshi' }, component: () => import('@/views/studentsend/exam/StuExams') },
    ]
  },
  {
    path: '/stucourse',
    component: Layout,
    meta: { title: '课程', roles: ['testin'], icon: 'iconlzt icon-lzt-kechengguanli' },
    redirect: '/stucourse',
    children: [
      { path: '/stucourse', name: 'stucourses', meta: { title: '我的课程', icon: 'iconlzt icon-lzt-kechengguanli' }, component: () => import('@/views/studentsend/course/StuCourse') },
    ]
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  let token = sessionStorage.getItem('token')
  // 判断用户是否登录或者当前是否在前台首页上
  if (to.name !== 'Index' && !token) {
    next({ name: 'Index' })
  }
  next()
})
// 防止页面刷新后丢失数据,在页面刷新时初始化动态路由
export const initRoutes = () => {
  let roles = localStorage.getItem('roles')
  let currentRoutes = []
  aysncRouter.forEach(item => {
    let result = item.meta.roles.findIndex(item => item === roles)
    if (result !== -1) {
      currentRoutes.push(item)
    }
  });
  currentRoutes.push({ path: '*', meta: { title: "404" }, component: () => import('@/views/error-page/404') })
  router.addRoutes(currentRoutes)
}
export default router
