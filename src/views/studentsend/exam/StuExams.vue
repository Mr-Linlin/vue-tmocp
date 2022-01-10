<template>
  <div class="stu-exam">
    <div class="header-wrap">
      <tab-bar :titleTab="['当前考试', '历史考试', '错题本']" />
      <div class="filter-item">
        筛选<i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      </div>
    </div>
    <div class="exam-body">
      <lzt-item
        v-for="item in examList"
        :key="item.id"
        :item="item"
        @goExam="goExam"
      />
    </div>
    <!-- 分页功能 -->
    <!-- <el-pagination
      @current-change="handleCurrentChange"
      :page-size="queryInfo.limit"
      layout=" prev, pager, next"
      :total="total"
    >
    </el-pagination> -->
  </div>
</template>

<script>
import { getUserList } from "@/api/user";
import LztItem from "@/components/common/itemBox/LztItem.vue";
import TabBar from "@/components/context/tabs/TabBar.vue";
export default {
  name: "StuExams",
  components: {
    LztItem,
    TabBar,
  },
  data() {
    return {
      examList: [],
      queryInfo: {
        table: "tm_ocp_paper",
        paging: true,
        page: 1,
        limit: 10,
        orderarray: JSON.stringify([{ id: "ASC" }]),
      },
      total: 0,
    };
  },
  created() {
    this.getExamList(this.queryInfo);
  },
  methods: {
    /**
     * 获取网络请求你
     */
    //  获取考试列表
    async getExamList(query) {
      let { code, data, count } = await getUserList(query);
      if (code !== 200) return this.$message.error("数据获取失败！");
      this.examList = data;
      this.total = count;
    },
    /**
     * 点击事件和普通方法
     */
    // 监听当前在第几页
    handleCurrentChange(num) {
      this.queryInfo.page = num;
      // console.log(`当前页: ${num}`);
      this.getUserList(this.queryInfo);
    },
    // 点击进入考试
    goExam(item) {
      const loading = this.$loading({
        lock: true,
        text: "正在组卷中,请稍等！",
        spinner: "el-icon-loading",
        background: "#fff",
      });
      setTimeout(async () => {
        loading.close();
        this.$store.dispatch("SET_EXAMINFO", item).then(() => {
          this.$router.push("/examInfo");
        });
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.stu-exam {
  padding: 5px 30px;
}
.header-wrap {
  position: relative;
  line-height: 55px;
  border-bottom: 1px solid rgba(#ccc, 0.6);
  margin-bottom: 20px;
  .filter-item {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
}
.el-pagination {
  margin-top: 15px !important;
  margin-right: auto !important;
}
.exam-body {
  display: flex;
  flex-wrap: wrap;
}
</style>