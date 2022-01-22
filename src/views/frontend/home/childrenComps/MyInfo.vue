<template>
  <div>
    <div class="index_header">
      <div class="header_center">
        <div style="width: 60%; display: flex">
          <div style="width: 20%" @click="goHomeView">
            <a href="#" style="color: red">在线课程首页</a>
          </div>
          <div style="width: 20%"></div>
          <div style="width: 50%">
            <avatar :userInfo="userInfo" class="avatar" />
          </div>
        </div>
        <div style="width: 20%; display: flex; text-align: center"></div>
      </div>
    </div>

    <div style="width: 80%; margin: 0 auto; margin-top: 20px">
      <el-tabs
        style="height: 800px"
        type="border-card"
        :tab-position="tabPosition"
        @tab-click="handleClick"
      >
        <el-tab-pane>
          <span slot="label"
            ><i class="el-icon-data-analysis"></i> 我的课程</span
          >
          <course-item :item="item" v-for="item in courseList" :key="item.id" @goInto="goInto"/>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-notebook-2"></i> 报名信息</span>
          我的报名信息
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"
            ><i class="el-icon-shopping-cart-2"></i> 我的订单</span
          >
          我的订单
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-user"></i> 个人信息</span>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/common/avatar/Avatar.vue";
import { mapGetters } from "vuex";
import { getDataList } from "@/api/common";
import CourseItem from "@/components/common/itemBox/CourseItem.vue";

/*个人中心*/
export default {
  name: "MyInfo",
  components: {
    Avatar,
    CourseItem,
  },
  data() {
    return {
      activeName: "second",
      tabPosition: "left",
      queryInfo: {
        table: "",
      },
      courseList: [],
    };
  },
  created() {
    // 拿到已经购买的所有课程
    this.getMyCourseList(this.queryInfo);
  },
  methods: {
    /**
     * 处理网络请求数据
     */
    async getMyCourseList(query) {
      query.table = "tm_ocp_studyrecord";
      query.inmap = JSON.stringify({ userid: 1 });
      let { data } = await getDataList(query);
      let cids = [];
      for (const item of data) {
        cids.push(item.courseid);
      }
      let ids = cids.join(",");
      query.table = "tm_ocp_courseinfo";
      query.inmap = JSON.stringify({ id: ids });
      let res = await getDataList(query);
      this.courseList = res.data;
    },
    goHomeView() {
      this.$router.push({
        path: "/homeView",
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 点击进入观看视频
    goInto(item){
      this.$router.push({path:'/studyVideo',query:{id:item.id}})
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style lang="less" scoped>
.index_header {
  height: 50px;
  background: whitesmoke;
}

.header_center {
  width: 90%;
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
  margin-bottom: 18px;
}
.avatar {
  position: absolute;
  right: 30px;
}
.el-tabs{
  background: rgba(240, 242, 245,.8) !important;
}
</style>
