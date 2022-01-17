<template>
  <div style="display: flex; flex-wrap: wrap">
    <div
      @click="goCourseDetailedInfo(course.id)"
      class="course-item"
      style="
        width: 280px;
        height: auto;
        border: gainsboro 1px solid;
        margin-left: 20px;
        margin-top: 20px;
        border-radius: 5px;
        box-shadow: gainsboro 0px 0px 10px;
      "
      v-for="(course, index) in courseInfoList"
      :key="index"
    >
      <div style="width: 100%; height: 160px; text-align: center">
        <img
          style="width: 80%; height: 100%; border-radius: 5px; margin-top: 10px"
          :src="course.courseimgurl"
          alt=""
        />
      </div>
      <div
        style="
          font-size: 15px;
          width: 90%;
          margin: 5px auto 0;
          margin-top: 20px;
          text-align: center;
        "
      >
        <strong> {{ course.coursename }}</strong>
      </div>
      <div
        style="
          font-size: 15px;
          width: 90%;
          margin: 5px auto 0;
          color: red;
          text-align: center;
        "
      >
        <strong>￥{{ course.majorprice }}</strong>
      </div>
      <div style="height: 10px"></div>
    </div>
  </div>
</template>

<script>
/*粗略课程信息组件*/
import { getUserList } from "@/api/user";
export default {
  name: "CourseRough",
  data() {
    return {
      courseInfoList: [],
      queryInfo: {
        table: "tm_ocp_courseinfo",
        equalmap: "",
      },
    };
  },
  methods: {
    goCourseDetailedInfo(courseid) {
      this.$router.push({
        path: "/courseDetailedInfo",
        query: { courseid: courseid },
      });
    },
    async getCourseList(query) {
      query.equalmap = JSON.stringify({
        coursegeneralcat: this.coursegeneralcat,
        coursestate: "1",
      });
      let { data } = await getUserList(query);
      this.courseInfoList = data;
    },
  },
  props: {
    //课程类别名称
    coursegeneralcat: String,
  },
  created() {
    //根据课程类别名称获取课程列表
    this.getCourseList(this.queryInfo);
  },
};
</script>

<style scoped>
.course-item{
  cursor: pointer;
}
</style>
