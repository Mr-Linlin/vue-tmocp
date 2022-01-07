<template>
  <div class="study-video">视频</div>
</template>

<script>
export default {
  name: "StudyVideo",
  created(){
      console.log(this.$route.query.id);
  }
};
</script>

<style lang="less" scoped>
.study-video{
    padding: 20px 30px;
}
</style>