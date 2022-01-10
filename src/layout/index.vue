<template>
  <div class="index">
    <el-container>
      <el-header class="header">
        <Header />
      </el-header>
      <el-container>
        <el-aside class="aside">
          <Aside />
        </el-aside>
        <el-main class="content-main">
          <!-- 选项卡 -->
          <lzt-tabs class="tabs"/>
          <keep-alive :exclude="['EditCourse']">
            <router-view/>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/context/siderbar/Aside";
import Header from "./childrenComps/Header.vue";
import LztTabs from "@/components/common/LztTabs/LztTabs.vue";
export default {
  name: "index",
  components: {
    Aside,
    Header,
    LztTabs,
  },
};
</script>

<style lang='less' scoped>
.header {
  position: relative;
  width: 100%;
  background: #fff;
  height: 60px !important;
  line-height: 60px;
  // box-shadow: 0 -1px 5px rgba(100, 100, 100, 0.6);
  padding: 0;
}
.aside {
  position: absolute;
  width: 220px !important;
  top: 60px;
  left: 0;
  bottom: 0;
  background: rgb(40, 42, 54);
}

.content-main {
  position: absolute;
  padding: 0 !important;
  // padding: 15px !important;
  left: 220px;
  right: 0;
  top: 100px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  border-top: 1px solid rgba(#ccc,.1);
  // background: rgb(240, 242, 245);
  // padding-top: 1px !important;
  z-index: 0;
}
.tabs{
  position: fixed;
  top: 60px;
  left: 220px;
  right: 0;
  border-top: 1px solid rgba(#ccc,.2);
}
</style>