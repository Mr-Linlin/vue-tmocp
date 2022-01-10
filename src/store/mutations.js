import router from '@/router'
export default {
    // 点击路由时添加一下选项卡
    ADDTAG(state, tag) {
        let obj = {}
            // 查询是否存在tags，如果存在就将tagslist覆盖，否则存在会话里面的就会被重新清空
        let tags = JSON.parse(sessionStorage.getItem('tags'))
        if (tags) {
            state.tags = tags
        }
        // 如果返回结果为-1则是tags里面没有，再进行添加
        let result = state.tags.findIndex(item => item.name === tag.name)
        if (result == -1) {
            obj.path = tag.path
            obj.name = tag.name
            obj.icon = tag.meta.icon
            obj.title = tag.meta.title
            state.tags.push(obj)
            sessionStorage.setItem('tags', JSON.stringify(state.tags))
        }
    },
    // 删除选项卡
    DELETETAG(state, tag) {
        let tags = JSON.parse(sessionStorage.getItem('tags'))
        if (state.tags.length !== 1) {
            if (tags === null) {
                let result = state.tags.findIndex(item => item.name === tag.name)
                state.tags.splice(result, 1)
                sessionStorage.setItem('tags', JSON.stringify(state.tags))
            } else {
                state.tags = tags
                    // 获取tag的左边去删除对应的tag
                let result = state.tags.findIndex(item => item.name === tag.name)
                state.tags.splice(result, 1)
                sessionStorage.setItem('tags', JSON.stringify(state.tags))
            }
        }
    },
    // 修改menu的状态保村
    SETMUNEACTIVE(state, active) {
        // console.log(active);
        state.menuActive = active
        sessionStorage.setItem("menuActive", state.menuActive);
    },
    // 将处理好有权限的路由和静态路由进行合并，最后在getters就能实现左边侧边栏展示
    DYNAMICROUTER(state, data) {
        router.addRoutes(data.newRoutes)
        state.asyncRoutes = data.newRoutes
            // 改变当前登录状态，改为true存起来
        state.isLoginActive = true
            // 将状态保存到本地存储中
        localStorage.setItem('menus', JSON.stringify(state.asyncRoutes))
        localStorage.setItem('roles', data.roles)
    },
    // 点击退出登录，将登录状态清除
    LOGOUT(state) {
        state.asyncRoutes = []
        state.tags = [{
            path: '/',
            title: '首页',
            name: 'home',
            icon: 'el-icon-s-home'
        }]
        localStorage.clear()
        sessionStorage.clear()
    }
}