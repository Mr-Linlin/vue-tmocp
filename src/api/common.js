import { request } from "./request";
import { QUERY, LOGIN, USERINFO, EXAMINFO, DELETE, UPLOADIMG, ADD, UPDATE, STUDYRECORD } from '@/utils/tmController'
// 获取用户数据列表
export const getDataList = table => request({ url: QUERY, data: table })
// 登录
export const loginInfo = user => request({ url: LOGIN, data: user })
// 根据token拿到用户信息
export const userInfo = token => request({ url: USERINFO, data: token })
// 根据试题类型与试卷类型 获取随机试卷信息
export const getExamTopic = title => request({ url: EXAMINFO, data: title })
// 添加章节学习记录
export const addObject = obj => request({ url: ADD, data: obj })
// 上传图片
export const upload = from => request({ url: UPLOADIMG, data: from })
// 删除
export const Delete = table => request({ url: DELETE, data: table })
// 修改
export const Updata = table => request({ url: UPDATE, data: table })
// 生成课程学习记录
export const StudyRecoed = table => request({ url: STUDYRECORD, data: table })