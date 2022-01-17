<template>
  <div>
    <div class="index_header">
      <div class="header_center">
        <div style="width: 30%; display: flex">
          <div v-on:click="goHomeView" style="margin: 0 auto">
            <a href="#">在线课程首页</a>
          </div>
        </div>
        <div style="width: 60%"></div>
        <div style="width: 30%; display: flex; text-align: center">
          <avatar :userInfo="userInfo"/>
          <!-- <div v-on:click="goMyInfo" style="margin: 0 auto">
            <a href="#">个人中心</a>
          </div> -->
        </div>
      </div>
    </div>

    <div class="courseinfo">
      <div style="padding-top: 90px">
        <div style="font-size: 40px; text-align: center; color: red">
          {{ courseInfo.coursename }}
        </div>
        <div
          style="
            text-align: center;
            color: black;
            padding-top: 20px;
            font-size: 15px;
          "
        >
          {{ courseInfo.coursemsg }}
        </div>
      </div>
    </div>

    <div
      style="
        width: 60%;
        margin: 0 auto;
        height: 150px;
        background: white;
        margin-top: -75px;
        box-shadow: gainsboro 1px 1px 10px;
        border-radius: 20px;
        display: flex;
      "
    >
      <div style="display: flex; width: 30%">
        <div style="width: 70%">
          <img
            style="width: 80%; height: 80%; margin-top: 15px; margin-left: 20px"
            :src="courseInfo.courseimgurl"
          />
        </div>
      </div>
      <div
        style="
          width: 15%;
          text-align: center;
          line-height: 150px;
          margin-left: -100px;
        "
      >
        <div style="font-size: 30px; color: red">
          ￥{{ courseInfo.majorprice }}
        </div>
      </div>
      <div style="width: 45%"></div>
      <div style="width: 20%">
        <el-button
          type="danger"
          style="height: 50px; width: 150px; margin-top: 50px"
          @click="dialogVisible = true"
        >
          立即报名
        </el-button>

        <el-dialog
          title="报名须知"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <div>
            <div style="color: red">
              此专业课程需要提交相应的材料审核后方可报名
            </div>
            <div
              style="margin-top: 20px"
              v-if="(courseInfo.coursegeneralcat = '安管人员培训课程')"
            >
              <el-link
                type="danger"
                href="http://r5ef12yid.hn-bkt.clouddn.com/aqycl.zip"
                >下载附件(安管人员报名材料)</el-link
              >
            </div>
            <div
              style="margin-top: 20px"
              v-else-if="(courseInfo.coursegeneralcat = '特种作业人员培训课程')"
            >
              <el-link
                type="danger"
                href="http://r5ef12yid.hn-bkt.clouddn.com/tzgcl.zip"
                >下载附件(特种作业人员报名材料)</el-link
              >
            </div>
            <div style="margin-top: 20px" v-else>
              <el-link
                type="danger"
                href="http://r5ef12yid.hn-bkt.clouddn.com/tzgcl.zip"
                >下载附件(暂无数据)</el-link
              >
            </div>
            <div style="margin-top: 20px">
              <el-upload
                :limit="maxNum"
                class="upload-demo"
                action=""
                :on-error="handleError"
                accept=".zip"
                list-type="picture"
                 :http-request="handle"
              >
                <el-button size="small" type="primary">上传审核材料</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传zip/rar文件，且不超过20MB
                </div>
              </el-upload>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="dialogVisible = false"
              v-on:click="creatSignup"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>

    <div style="width: 60%; margin: 0 auto; margin-top: 40px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="课程介绍" name="first">
          <div
            style="
              height: 500px;
              margin-top: 20px;
              box-shadow: gainsboro 1px 1px 10px;
              border-radius: 20px;
              font-size: 15px;
              background: #b3d4fc;
            "
          >
            {{ courseInfo.courseactual }}
          </div>
        </el-tab-pane>
        <el-tab-pane label="课程目录" name="second">
          <el-card
            class="box-card"
            v-for="(course, index) in courseCatalogue"
            :key="index"
          >
            <div style="margin-left: 20px; font-size: 20px; padding-top: 20px">
              <strong> {{ course.chaptername }}</strong>
              <div
                style="
                  margin-left: 20px;
                  font-size: 15px;
                  margin-top: 20px;
                  display: flex;
                "
                v-for="(course2, index2) in course.children"
                :key="index2"
              >
                <div style="width: 98%">{{ course2.chaptername }}</div>
                <div style="width: 2%">
                  <i class="el-icon-lock"></i>
                </div>
              </div>
            </div>
          </el-card>
          <div style="height: 20px"></div>
        </el-tab-pane>
        <el-tab-pane label="学习服务" name="third">
          <div
            style="
              height: 500px;
              background: #b3d4fc;
              margin-top: 20px;
              box-shadow: gainsboro 1px 1px 10px;
              border-radius: 20px;
            "
          >
            {{ courseInfo }}
          </div>
        </el-tab-pane>
        <el-tab-pane label="课程评价" name="fourth">
          <div
            style="
              height: 500px;
              background: #b3d4fc;
              margin-top: 20px;
              box-shadow: gainsboro 1px 1px 10px;
              border-radius: 20px;
            "
          ></div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <HomeViewEnd style="margin-top: 20px"></HomeViewEnd>
  </div>
</template>

<script>
import HomeViewEnd from "./components/end/HomeViewEnd";
import myutils from "@/utils/myutils";
import { getUserList,addObject } from "@/api/user";
import { directoryTree } from "@/utils/treeChildren";
import { mapGetters } from "vuex";
import Avatar from '@/components/common/avatar/Avatar.vue';

/*课程详细信息*/
export default {
  name: "CourseDetailedInfo",
  data() {
    return {
      activeName: "second",
      userImg: sessionStorage.getItem("userImg"),
      courseCatalogue: [], //章节列表
      courseInfo: {}, //课程信息
      dialogVisible: false,
      maxNum: 1, //最大上传数量
      PictureUploadserviceurl: this.PictureUploadserviceurl,
      form: {},
      courseid: 0,
      queryinfo: {
        table: "",
        equalmap: "",
      },
    };
  },
  created() {
    this.courseid = this.$route.query.courseid;
    //根据课程ID获取课程信息
    this.getCourseInfo();
    //根据课程ID获取课程章节信息
    this.getCourseChapter();
  },
  methods: {
    /*创建审核记录*/
   async creatSignup() {
      //用户ID
      this.form.uid = this.userInfo.id;
      //课程ID
      this.form.cid = this.courseInfo.id;
      //审核时间
      this.form.submittime = myutils.getTime(new Date());
      //是否通过
      this.form.isadopt = "-1";
      let  query={
        table:"tm_ocp_signup",
        uid:this.form.uid,
        cid:this.form.cid,
        submittime:this.form.submittime,
        isadopt:this.form.isadopt,
        signupfile:this.form.signupfile
      }
      console.log(query);
        let {code} = await addObject(query)
        if(code!==200)return this.$message("报名材料上传失败，请联系管理员");
        this.$message("报名材料上传成功，等待管理员审核");
    },
    /*图片上传成功*/
    handle(response) {
      // console.log(response);
      this.form.signupfile = response.file.size;
    },
    /*图片上传失败*/
    handleError(response) {
      console.log(response);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        // eslint-disable-next-line no-unused-vars
        .then((_) => {
          done();
        })
        // eslint-disable-next-line no-unused-vars
        .catch((_) => {});
    },
    goHomeView() {
      this.$router.push({
        path: "/homeView",
      });
    },
    //根据课程ID获取课程信息
    async getCourseInfo() {
      this.queryinfo.table = "tm_ocp_courseinfo";
      this.queryinfo.equalmap = JSON.stringify({ id: this.courseid });
      let { data } = await getUserList(this.queryinfo);
      this.courseInfo = data[0];
    },
    //根据课程ID获取课程章节信息
    async getCourseChapter() {
      this.queryinfo.table = "tm_ocp_chapter";
      this.queryinfo.equalmap = JSON.stringify({
        chaptercourseid: this.courseid,
      });
      let { data } = await getUserList(this.queryinfo);
      this.courseCatalogue = directoryTree(data, 0);
    },
  },
  components: {
    HomeViewEnd,
    Avatar,
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style scoped>
a {
  color: black;
}

.index_header {
  height: 50px;
}

.header_center {
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  line-height: 50px;
  font-size: 15px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 99%;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 10px;
}

.courseinfo {
  height: 300px;
  background: -moz-linear-gradient(top, #e0ffff, #fafafa);
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#d1eeee),
    to(#fafafa)
  );
  background-size: 100% 100%;
}
</style>



