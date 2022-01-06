export default {
    tags: state => {
        if (state.tags.length === 1) {
            let tags = JSON.parse(sessionStorage.getItem('tags'))
            if (tags===null) {
                return state.tags
            }else{
                return tags
            }
        } else {
            return state.tags
        }
    }
}