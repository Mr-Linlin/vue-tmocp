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
    }
}