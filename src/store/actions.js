import { aysncRouter } from '@/router/index'
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
        commit('DYNAMICROUTER',{ newRoutes,roles})
    }
}