//import setting from "@/config/setting";


export default {

  //日期格式化
  getTime(date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // 拼接
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  },
  isScAnswer(num) {
    if (num == 1) {
      return "A"
    } else if (num == 2) {
      return "B"
    } else if (num == 3) {
      return "C"
    } else if (num == 4) {
      return "D"
    } else {
      return null
    }
  }
}
