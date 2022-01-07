<template>
  <el-card> 课程 </el-card>
</template>

<script>
import { gitCourse } from "@/api/course";
export default {
  name: "CourseList",
  data() {
    return {
      course:[],
      form:{
        table:'tm_ocp_courseinfo'
      }
    };
  },
  created() {
    this.gitCourselist(this.form);
  },
  methods: {
    async gitCourselist(form) {
     let {data} = await gitCourse(form);
     console.log(data);
     this.course = data
    },
  },
};
</script>

<style  lang="less" scoped>
</style>