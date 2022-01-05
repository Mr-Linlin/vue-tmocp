import { request } from "./request";
import { QUERY } from '@/utils/tmController'
// 获取用户数据列表
export const getUserList = table => request({ method: 'POST', url: QUERY, data: { table } })

