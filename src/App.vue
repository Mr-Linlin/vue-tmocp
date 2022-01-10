<template>
  <div id="app">
    <router-view v-if="refresh" />
  </div>
</template>
<script>
import {initRoutes} from './router'
export default {
  name: "app",
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      refresh:true
    }
  },
  created(){
    initRoutes()
  },
  methods:{
    reload(){
      this.refresh = false;
      this.$nextTick(()=>{
        this.refresh = true;
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./assets/css/base.css");

</style>
