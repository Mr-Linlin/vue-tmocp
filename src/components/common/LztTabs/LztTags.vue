<template>
  <div class="lzt-tags">
    <div class="tags" @click="handleClick">
      <i class="el-icon-close close" @click="close" v-if="closable"></i>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LztTags",
  props: {
    activeColor: { type: String, default: "rgba(43, 204, 206,.2)" },
    closable: { type: Boolean },
  },
  computed: {
    isActiveColor() {
      return { background: this.activeColor };
    },
  },
  methods: {
    //   点击关闭选项卡
    close() {
      this.$emit("close");
    },
    // handleClick,选项卡的点击事件
    handleClick() {
      this.$emit("handleClick");
    },
  },
};
</script>

<style scoped lang="less">
.tags {
  position: relative;
  height: 40px;
  line-height: 40px;
  padding: 0 25px;
  font-size: 12px;
  cursor: pointer;
  .close {
    position: absolute;
    right: 3px;
    display: inline-block;
    width: 12px;
    height: 12px;
    top: 54%;
    transform: translate(-50%, -50%);
    font-size: 12px;
  }
  .close:hover {
    color: #fff;
    background: rgb(241, 16, 18);
    border-radius: 50%;
  }
}
.tags:hover {
  background: rgba(6, 12, 12, 0.1);
  color: rgb(43, 204, 206);
  height: 42px;
}
</style>