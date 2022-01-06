<template>
  <div id="app">
    <router-view v-if="isRouterActive" />
  </div>
</template>

<script>
import { initRoutes } from "./router";
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterActive: true,
    };
  },
  created() {
    initRoutes();
  },
  methods: {
    // 刷新方法
    reload() {
      this.isRouterActive = false;
      this.$nextTick(() => {
        this.isRouterActive = true;
      });
    },
  },
};
</script>

<style scoped>
@import url("./assets/css/base.css");
</style>
