import { request } from "./request";
// 获取用户数据列表
export const getUserList = table => request({ method: 'POST', url: '/TM_getallinfo_controller', data: table })