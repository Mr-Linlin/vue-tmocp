import { aysncRouter } from '@/router/index'
import { userInfo } from '@/api/user';
export default {
    // 添加动态路由
    DYNAMICROUTER({ commit }, roles) {
        let newRoutes = []
        if (roles !== undefined && roles !== null) {
            aysncRouter.forEach(item => {
                let result = item.meta.roles.findIndex(item => item === roles)
                if (result !== -1) {
                    newRoutes.push(item)
                }
            });
        }
        commit('DYNAMICROUTER', newRoutes)
        commit('SET_Roles', roles)
    },
    // 拿到token，并发送请求获取用户数据
    async SET_TOKEN({ commit }, token) {
        let {data} = await userInfo({ token })
        commit('SET_TOKEN', token)
        commit('SET_USERINFO', data[0])
    },
    SET_EXAMINFO({commit},examInfo){
        commit('SET_EXAMINFO',examInfo)
    }
}