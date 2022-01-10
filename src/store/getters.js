export default {
    tags: state => {
        if (state.tags.length === 1) {
            let tags = JSON.parse(sessionStorage.getItem('tags'))
            if (tags === null) {
                return state.tags
            } else {
                return tags
            }
        } else {
            return state.tags
        }
    },
    // 拿到menu的激活状态地址
    menuActive: state => {
        let active = sessionStorage.getItem('menuActive')
        if (active === null) {
            return state.menuActive
        } else {
            return active
        }
    },
    // 获取侧边栏菜单
    menuList: state => {
        let menus = JSON.parse(localStorage.getItem('menus'))
        if (state.asyncRoutes.length !== 0) {
            return state.asyncRoutes
        } else if (menus !== null) {
            return menus
        }
        return state.asyncRoutes
    }
}