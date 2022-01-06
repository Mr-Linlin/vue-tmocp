<template>
  <div class="lzt-tabs">
    <div class="tabs-wrap">
      <div class="left-arrow"><i class="el-icon-arrow-left"></i></div>
      <div class="right-arrow"><i class="el-icon-arrow-right"></i></div>
      <lzt-tags
        v-for="(item, index) in tags"
        :key="index"
        @close="handleClose(item, index)"
        @handleClick="handleClick(item)"
        :closable="item.name !== 'home'"
        :class="{ active: $route.path === item.path }"
      >
        <i :class="item.icon" style="margin-right: 5px"></i>
        <span>{{ item.title }}</span>
      </lzt-tags>
    </div>
  </div>
</template>

<script>
import LztTags from "./LztTags.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "LztTabs",
  components: {
    LztTags,
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["DELETETAG"]),
    //   点击关闭选项卡
    handleClose(tag,index) {
      this.DELETETAG(tag);
      // 当关闭后判断当前是否处于最右侧，如果是最右侧，那么当前活跃的路由换成上一个
      // 如果关闭的是当前路由则往右跳转一级,如果当前路由标签在右边则往左跳
      if (index === this.tags.length) {
        return this.$router.push(this.tags[index - 1].path);
      } else if (tag.path === this.$route.path) {
        return this.$router.push(this.tags[index].path);
      }
    },
    // 点击选项卡切换路由
    handleClick(item) {
      sessionStorage.setItem('menuActive',item.name)
      this.$router.push(item.path);
    },
  },
  computed: {
    ...mapGetters(["tags"]),
  },
};
</script>

<style lang="less" scoped>
.lzt-tabs {
  height: 42px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background: #fff;
  line-height: 42px;
  //   padding-right: 40px !important;
  z-index: 0;
}
.tabs-wrap {
  display: flex;
  position: relative;
  padding: 0 40px;
  .left-arrow,
  .right-arrow {
    position: absolute;
    height: 40px;
    width: 40px;
    text-align: center;
    cursor: not-allowed;
  }
  .left-arrow {
    left: 0;
  }
  .right-arrow {
    right: 0;
  }
}
.active {
  background: rgba(43, 204, 206, 0.1);
  color: rgb(43, 204, 206);
  font-weight: 600;
  border-bottom: 2px solid rgb(43, 204, 206);
}
</style>