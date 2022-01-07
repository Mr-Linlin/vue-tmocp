import { request } from "./request";
// 获取课程数据
export const gitCourse = table => request({ method: 'POST', url: 'TM_getallinfo_controller', data: table })