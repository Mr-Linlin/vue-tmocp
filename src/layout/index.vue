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
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/context/siderbar/Aside";
import Header from "./childrenComps/Header.vue";
export default {
  name: "index",
  components: {
    Aside,
    Header,
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
  box-shadow: 0 -1px 5px rgba(100, 100, 100, 0.6);
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
  position: relative;
  padding: 0 !important;
  padding: 15px !important;
  position: absolute;
  left: 220px;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
  overflow-x: hidden ;
}
</style>