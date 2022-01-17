<template>
  <div class="rindexbox">
    <!-- 头部-->
    <div class="index_header">
      <div class="header_center">
        <div style="width: 40%; display: flex; line-height: 80px">
          <div style="width: 50px; height: 50px; margin-top: 15px">
            <img
              style="width: 100%; height: 100%"
              src="http://r5ef12yid.hn-bkt.clouddn.com/logo.png"
            />
          </div>
          <div style="font-size: 20px; line-height: 80px; margin-left: 10px">
            滁州永荣职业培训学校培训服务平台
          </div>
        </div>
        <div style="width: 40%"></div>
        <div style="width: 20%">
          <avatar :userInfo="userInfo" />
        </div>
      </div>
    </div>

    <!--安全员培训课程区域-->
    <div
      style="
        width: 100%;
        height: auto;
        background: #f5f7fa;
        box-shadow: gainsboro 0 0 10px;
        margin-top: 15px;
      "
    >
      <div style="width: 70%; margin: 0 auto; padding-top: 20px">
        <div>
          <div style="margin-top: -5px; margin-left: 20px">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <div class="carttitle">
                  <strong>安管人员培训课程</strong>
                </div>
              </div>
              <div class="text item">
                <CourseRough
                  :coursegeneralcat="coursegeneralcat1"
                ></CourseRough>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <div style="height: 20px"></div>
    </div>

    <!--特种作业培训课程（非起重类）区域-->
    <div
      style="
        width: 100%;
        height: auto;
        background: white;
        box-shadow: honeydew 0px 0px 10px;
      "
    >
      <div style="width: 70%; margin: 0 auto; padding-top: 20px">
        <div>
          <div style="margin-top: -5px; margin-left: 20px">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <div class="carttitle">
                  <strong>特种作业人员培训课程</strong>
                </div>
              </div>
              <div class="text item">
                <CourseRough
                  :coursegeneralcat="coursegeneralcat2"
                ></CourseRough>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <div style="height: 20px"></div>
    </div>

    <!--继续教育培训课程区域-->
    <div
      style="
        width: 100%;
        height: auto;
        background: white;
        box-shadow: honeydew 0px 0px 10px;
      "
    >
      <div style="width: 70%; margin: 0 auto; padding-top: 20px">
        <div>
          <div style="margin-top: -5px; margin-left: 20px">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <div class="carttitle">
                  <strong>继续教育培训课程</strong>
                </div>
              </div>
              <div class="text item">
                <CourseRough
                  :coursegeneralcat="coursegeneralcat3"
                ></CourseRough>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <div style="height: 20px"></div>
    </div>
    <HomeViewEnd style="margin-top: 0"></HomeViewEnd>
  </div>
</template>
<script>
/*尾部*/
import HomeViewEnd from "./components/end/HomeViewEnd";
/*课程粗略信息*/
import CourseRough from "./components/courserough/CourseRough";
import Avatar from "@/components/common/avatar/Avatar.vue";
import { mapGetters } from "vuex";

/*客户端-用户浏览主页*/
export default {
  name: "HomeView",
  components: {
    HomeViewEnd,
    CourseRough,
    Avatar,
  },
  data() {
    return {
      courseList: [],
      userImg: "",
      coursegeneralcat1: "安管人员培训课程",
      coursegeneralcat2: "特种作业人员培训课程",
      coursegeneralcat3: "继续教育培训课程",
      userName: "",
    };
  },
  created() {
  },
  methods: {
    /*跳转个人中心*/
    goMyInfo() {
      this.$router.push({
        path: "/myInfo",
      });
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style scoped>
.el-header {
  background-color: aquamarine;
  color: #333;
  text-align: center;
  line-height: 60px;
}

a {
  text-decoration: none;
  color: #1a1a1a;
}

.rindexbox {
  background: #ffffff;
  width: 100%;
  height: 100%;
}

.index_header {
  height: 80px;
  padding-top: 10px;
}

.header_center {
  width: 90%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  line-height: 80px;
  font-size: 15px;
}

.carttitle {
  font-size: 25px;
  font-family: 仿宋;
  text-align: center;
  padding-top: 20px;
  font-size: 25px;
  font-family: 仿宋;
  text-align: center;
  padding-top: 20px;
}
</style>
