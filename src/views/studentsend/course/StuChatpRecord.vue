<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-input
            placeholder="根据章节id查询"
            class="input-with-select"
            v-model="chapterid"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="queryUser"
            ></el-button>
          </el-input></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-button type="primary">添加</el-button>
        </div></el-col
      >
    </el-row>

    <!-- 用户列表 -->
    <el-table :data="chapterList" border class="tableBox">
      <el-table-column label="序号" type="index" width="70"> </el-table-column>
      <el-table-column
        label="课程ID"
        prop="courseid"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column label="章节ID" prop="chapterid"> </el-table-column>
      <el-table-column
        label="视频总时长"
        prop="totalduration"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="已经观看时间"
        prop="viewedduration"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="item">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteClick(item.row.id)"
          ></el-button>
          <el-button
            type="darning"
            icon="el-icon-setting"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="queryInfo.limit"
      layout=" total,prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { getUserList, Delete } from "@/api/user";
export default {
  name: "StuChatpRecord",
  data() {
    return {
      chapterList: [],
      queryInfo: {
        table: "tm_ocp_chapterdurationrecord",
        inmap: "",
        paging: true,
        page: 1,
        limit: 10,
        orderarray: JSON.stringify([{ id: "ASC" }]),
      },
      chapterid: "",
      total: 0,
    };
  },
  inject: ["reload"],
  created() {
    this.getUserList(this.queryInfo);
  },
  methods: {
    /**
     * 网络请求
     */
    // 获取用户列表
    async getUserList(table) {
      let { code, data, count } = await getUserList(table);
      if (code !== 200) return this.$message.error("获取失败！");
      this.total = count;
      this.chapterList = data;
    },
    /**
     * 点击查询后根据学号查询学生
     */
    async queryUser() {
      this.queryInfo.inmap = JSON.stringify({ chapterid: this.chapterid });
      let { data } = await getUserList(this.queryInfo);
      if (data.length === 0) return this.$message.error("查无记录！");
      this.chapterList = data;
    },
    // 监听当前在第几页
    handleCurrentChange(num) {
      this.queryInfo.page = num;
      // console.log(`当前页: ${num}`);
      this.getUserList(this.queryInfo);
    },
    // 根据id删除记录
    async deleteClick(id) {
      let table = {
        table: "tm_ocp_chapterdurationrecord",
        deletekey: "id",
        deletearray: JSON.stringify([id]),
      };
      let { code } = await Delete(table);
      if (code !== 200) return this.$message.error("删除失败！");
      this.$message.success("删除成功！");
      this.reload();
    },
  },
};
</script>

<style  lang="less" scoped>
.tableBox {
  margin: 15px 0 !important;
}
.box-card {
  width: 100% !important;
  margin: 15px;
}
</style>