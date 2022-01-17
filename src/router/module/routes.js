// 存放静态路由
import Layout from '@/layout/index'
export const routes = [
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
    {
        path: '/examInfo',
        meta: { title: '考试' },
        name: 'examInfo',
        component: () => import('@/views/studentsend/exam/childrenComps/ExamInfo'),
    },
    {
        path: "/homeView",
        name: "homeView",
        meta: { title: '课程中心' },
        component: () => import('@/views/frontend/home/childrenComps/HomeView')
    },
    {
        path: "/courseDetailedInfo",
        name: "courseDetailedInfo",
        meta: { title: '课程详情' },
        component: () => import('@/views/frontend/home/childrenComps/CourseDetailedInfo')
    },
    {
        path: "/myInfo",
        name: "myInfo",
        meta: { title: '个人中心' },
        component: () => import('@/views/frontend/home/childrenComps/MyInfo')
    },
    // { path: '/404', component: () => import('@/views/error-page/404') }
]