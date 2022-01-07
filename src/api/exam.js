import { request } from "./request";
import { QUERY } from '@/utils/tmController'
// 获取用考试列表
export const getExamList = queryInfo => request({ method: 'POST', url: QUERY, data: queryInfo })