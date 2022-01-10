import { request } from "./request";
import { QUERY, LOGIN, USERINFO, EXAMINFO } from '@/utils/tmController'
// 获取用户数据列表
export const getUserList = table => request({ url: QUERY, data: table })
// 登录
export const loginInfo = user => request({ url: LOGIN, data: user })
// 根据token拿到用户信息
export const userInfo = token => request({ url: USERINFO, data: token })
// 根据试题类型与试卷类型 获取随机试卷信息
export const getExamTopic = title => request({ url: EXAMINFO, data: title })
