import axios from 'axios'
import qs from 'qs'
// import router from '@/router'
export function request(config) {
    const instance = axios.create({
        baseURL: "http://42.192.202.240:8087/tmocp/",
        timeout: 5000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    instance.interceptors.request.use(config => {

            config.data = qs.stringify(config.data) // 转为formdata数据格式
                // let token = window.sessionStorage.getItem('token')
                // if (token === null) {
                //     return router.push('/login')
                // }
                // config.headers.Authorization = token
            return config

            // let token = window.sessionStorage.getItem('token')
            // if (token === null) {
            //     return router.push('/login')
            // }
            // config.headers.Authorization = token



        },
        error => Promise.error(error)
    )
    instance.interceptors.response.use(res => {
        // let { code, msg } = res.data
        // if (code === 201 && msg === '身份认证失败!') {
        //     return router.push('/login')
        // }
        return res.data
    })
    return instance(config)
}