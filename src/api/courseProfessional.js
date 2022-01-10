import { request } from "./request";
// 获取用户数据列表
export const getpro = table => request({ method: 'POST', url: '/TM_getallinfo_controller', data: table });
// 修改用户信息
export const editproinfo = userinfo => request({ method: 'POST', url: 'TM_updateone_controller', data: userinfo });
// 添加用户信息
export const addproinfo = adduserinfo => request({ method: 'POST', url: 'TM_insertone_controller', data: adduserinfo });
// 删除用户信息
export const remove = removeinfo => request({ method: 'POST', url: 'TM_deletebatchbydeletekeys_controller', data: removeinfo })