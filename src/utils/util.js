/*工具类，用来格式化数据*/
// 计算视频播放时长
export const getDuration = duration => {
    let midden = parseInt(duration / 60);
    let time = parseInt(duration % 60);
    midden = midden < 10 ? "0" + midden : midden;
    time = time < 10 ? "0" + time : time;
    return `${midden}:${time}`;
}