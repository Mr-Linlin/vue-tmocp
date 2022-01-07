<template>
  <div class="lzt-box">
    <div class="lzt-item">
      <div class="item-title">{{ item.papername }}</div>
      <div class="item-row">
        <span>开始时间：</span>
        {{ $moment(item.createtime).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
      <div class="item-row">
        <span>结束时间：</span>
        {{ $moment(item.createtime).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
      <div class="item-row">
        {{ `考试时长：${item.papertime}分钟` }}
      </div>
      <div class="item-footer">
        <div class="btn-primary" @click="goExam">进入</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LztItem",
  props: {
    item: { type: Object },
  },
  methods:{
    //   点击想父组件发送进入考试请求
    goExam(){
        this.$emit('goExam',this.item)
    }
  }
};
</script>

<style lang="less" scoped>
.lzt-item {
  position: relative;
  width: 220px;
  height: 180px !important;
  margin-right: 14px !important;
  margin-bottom: 15px !important;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgb(58 62 81 / 20%);
  border-radius: 4px;
  padding-top: 5px;
  transition: all 0.5s;
  .item-row {
    padding-left: 5px;
    font-size: 12px;
    transform: scale(0.94);
    font-weight: 400;
    color: #656577;
    line-height: 17px;
    height: 17px;
    margin-bottom: 5px;
  }
  .item-title {
    font-size: 14px;
    font-weight: 500;
    color: #27274a;
    line-height: 20px;
    padding: 0 12px;
    box-sizing: border-box;
    margin-bottom: 5px;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-footer {
    position: absolute;
    bottom: 10px;
    right: 12px;
    .btn-primary {
      width: 68px;
      height: 28px;
      padding: 0;
      line-height: 28px;
      font-size: 12px;
      font-weight: 500;
      color: #fff;
      background-color: #1a8cfe;
      text-align: center;
      cursor: pointer;
    }
    .btn-primary:hover {
      background: rgba(rgb(44, 6, 6), 0.5);
    }
  }
}
.lzt-item:hover{
    top: -5px;
}
</style>