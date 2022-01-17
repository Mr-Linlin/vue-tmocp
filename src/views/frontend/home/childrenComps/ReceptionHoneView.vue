<template>
  <div class="rindexbox">

    <!-- 头部-->
    <div class="index_header">
      <div class="header_center">
        <div style="width: 40%;display: flex;line-height: 80px">
          <div style="width: 50px;height: 50px;margin-top: 15px">
            <img style="width: 100%;height: 100%" src="http://r5ef12yid.hn-bkt.clouddn.com/logo.png">
          </div>
          <div style="font-size: 20px;line-height: 80px;margin-left: 10px">
            滁州永荣职业培训学校培训服务平台
          </div>
        </div>
        <div style="width: 40%;">
          2
        </div>
        <div style="width: 20%;">
          3
        </div>
      </div>
    </div>

    <!--轮播图-->
    <div class="lunbo">
      <el-carousel style="width: 70%;margin: 0 auto;padding-top: 40px;border-radius:20px;padding-bottom: 40px"
                   :interval="4000" height="500px">
        <el-carousel-item v-for="(im,index) in imgsUrl" :key="index" style="border-radius:20px;width: 100%">
          <img v-bind:src="im.imageSrc" alt="图片获取失败" style="width: 100%;height: 100%;border-radius:20px;">
        </el-carousel-item>
      </el-carousel>
    </div>

    <!--安全员培训课程区域-->
    <div style="width: 100%;height: auto;background: #F5F7FA;box-shadow:gainsboro 0px 0px 10px">
      <div style="font-size: 25px;font-family: 仿宋;text-align: center;padding-top: 20px"><strong>安全员培训课程</strong></div>
      <div style="width: 70%;margin: 0 auto;padding-top: 20px">
        <div>
          <div style="margin-top: -5px;margin-left: 20px">
            <el-tabs v-model="activeName" style="height: auto" type="border-card">
              <el-tab-pane label="安全员培训课程A类" name="first">
                <CourseRough></CourseRough>
              </el-tab-pane>
              <el-tab-pane label="安全员培训课程B类" name="second">安全员培训课程B类</el-tab-pane>
              <el-tab-pane label="安全员培训课程C类" name="third">安全员培训课程C类</el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div style="height: 20px"></div>
    </div>

    <!--特种作业培训课程（非起重类）区域-->
    <div style="width: 100%;height: auto;background: white;box-shadow:honeydew 0px 0px 10px">
      <div style="font-size: 25px;font-family: 仿宋;text-align: center;padding-top: 20px"><strong>特种作业培训课程（非起重类）</strong>
      </div>
      <div style="width: 70%;margin: 0 auto;padding-top: 20px">
        <div>
          <div style="margin-top: -5px;margin-left: 20px">
            <el-tabs v-model="activeName" style="height: 500px" type="border-card">
              <el-tab-pane label="安全员培训课程A类" name="first">安全员培训课程A类</el-tab-pane>
              <el-tab-pane label="安全员培训课程B类" name="second">安全员培训课程B类</el-tab-pane>
              <el-tab-pane label="安全员培训课程C类" name="third">安全员培训课程C类</el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div style="height: 20px"></div>
    </div>

    <!--特种作业培训课程（起重类）区域-->
    <div style="width: 100%;height: auto;background: white;box-shadow:honeydew 0px 0px 10px">
      <div style="font-size: 25px;font-family: 仿宋;text-align: center;padding-top: 20px"><strong>特种作业培训课程（起重类）</strong>
      </div>
      <div style="width: 70%;margin: 0 auto;padding-top: 20px">
        <div>
          <div style="margin-top: -5px;margin-left: 20px">
            <el-tabs v-model="activeName" style="height: 500px" type="border-card">
              <el-tab-pane label="安全员培训课程A类" name="first">安全员培训课程A类</el-tab-pane>
              <el-tab-pane label="安全员培训课程B类" name="second">安全员培训课程B类</el-tab-pane>
              <el-tab-pane label="安全员培训课程C类" name="third">安全员培训课程C类</el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div style="height: 20px"></div>
    </div>


    <!--建筑类培训课程-->
    <div style="width: 100%;height: auto;background: #F5F7FA;box-shadow:gainsboro 0px 0px 10px">
      <div style="font-size: 25px;font-family: 仿宋;text-align: center;padding-top: 20px"><strong>建筑类培训课程</strong></div>
      <div style="width: 70%;margin: 0 auto;padding-top: 20px">
        <div>
          <div style="margin-top: -5px;margin-left: 20px">
            <el-tabs v-model="activeName" style="height: 500px" type="border-card">
              <el-tab-pane label="安全员培训课程A类" name="first">安全员培训课程A类</el-tab-pane>
              <el-tab-pane label="安全员培训课程B类" name="second">安全员培训课程B类</el-tab-pane>
              <el-tab-pane label="安全员培训课程C类" name="third">安全员培训课程C类</el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div style="height: 20px"></div>
    </div>
    <homeViewEnd style="margin-top: 0px"></homeViewEnd>
  </div>

</template>
<script>

import homeViewEnd from "@/components/end/HomeViewEnd";



/*客户端-用户浏览主页*/
export default {
  name: "HomeView",
  components:{
    homeViewEnd
  },
  data() {
    return {
      visible: false,
      isLogin: false,
      activeName: "first",
      courseList: [],
      keyword: '',
      imgsUrl: [
        {imageSrc: 'http://www.sutang.fun/1.png'},
        {imageSrc: 'http://www.sutang.fun/2.png'},
        {imageSrc: 'http://www.sutang.fun/3.png'},
        {imageSrc: 'http://www.sutang.fun/4.png'},
        {imageSrc: 'http://www.sutang.fun/5.png'}
      ],
      userImg: 'https://img2.baidu.com/it/u=672952437,326337087&fm=26&fmt=auto'
    }
  }, created() {
    //模拟登陆
    sessionStorage.setItem("uid", 1)

    if (sessionStorage.getItem("uid") != null) {
      this.isLogin = true
    }

  }, methods: {
    /*跳转课程模块页面*/
    goCourseModuleView() {
      this.$router.push({
        path: '/courseModule'
      })
    },
    /*跳转课程搜索页面*/
    goSearchCourseView() {
      this.$router.push({
        path: '/searchCourse',
        query: {
          keyword: this.keyword
        }
      })
    },
    /*跳转个人中心*/
    goMyInfo() {
      this.$router.push({
        path: '/myInfo'
      })
    }
  }
}
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
  background: #FFFFFF;
  width: 100%;
  height: 100%;
}

.index_header {
  height: 80px;
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

.lunbo {
  width: 100%;
  height: auto;
  margin: 0 auto;
  background: linear-gradient(#737dfe, white); /* 标准的语法（必须放在最后） */
}


</style>
