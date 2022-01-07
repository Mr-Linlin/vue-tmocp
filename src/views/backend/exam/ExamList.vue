<template>
  <div class="exam-list">
    <el-card class="box-card" shadow="never">
      <el-table :data="examList" border class="tableBox">
        <el-table-column label="序号" type="index" width="70">
        </el-table-column>
        <el-table-column
          label="考试名称"
          prop="papername"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="分类"
          prop="papertype"
          :show-overflow-tooltip="true"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="总分"
          prop="papertotalscore"
          :show-overflow-tooltip="true"
          width="100"
        >
        </el-table-column>
        <el-table-column label="创建时间" :show-overflow-tooltip="true">
          <template slot-scope="item">
            {{ dateFormat(item.row.createtime) }}
          </template>
        </el-table-column>
        <el-table-column label="修改时间" :show-overflow-tooltip="true">
          <template slot-scope="item">
            {{ dateFormat(item.row.updatetime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-button
              type="darning"
              icon="el-icon-setting"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.limit"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getExamList } from "@/api/exam";
export default {
  name: "ExamList",
  data() {
    return {
      examList: [],
      queryInfo: {
        table: "tm_ocp_paper",
        paging: true,
        page: 1,
        limit: 5,
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
      let { code, data, count } = await getExamList(query);
      if (code !== 200) return this.$message.error("数据获取失败！");
      this.examList = data;
      this.total = count;
    },
    /**
     * 点击事件和普通方法
     */
    // 格式化日期
    dateFormat(time) {
      return this.$moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
    //监听每页有多少条数据
    handleSizeChange(limit) {
      // console.log(`每页 ${limit} 条`);
      this.queryInfo.limit = limit;
      this.getExamList(this.queryInfo);
    },
    // 监听当前在第几页
    handleCurrentChange(num) {
      this.queryInfo.page = num;
      // console.log(`当前页: ${num}`);
      this.getExamList(this.queryInfo);
    },
  },
};
</script>

<style lang="less" scoped>
.exam-list {
  padding: 20px 30px;
}
.tableBox{
    margin-bottom: 15px;
}
</style>