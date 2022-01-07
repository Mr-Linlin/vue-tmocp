<template>
  <div id="app">
    <router-view v-if="refresh" />
  </div>
</template>

<script>
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

<style scoped>
@import url("./assets/css/base.css");
</style>
