<template>
  <div class="audit-list">
    <el-card>
      <el-table :data="auditList" border class="tableBox">
        <el-table-column label="序号" type="index" width="70">
        </el-table-column>
        <el-table-column
          label="课程ID"
          prop="cid"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="用户ID"
          prop="uid"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="审核状态"
          prop="isadopt"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="注册文件"
          prop="signupfile"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="item">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
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
    </el-card>
  </div>
</template>

<script>
import { getUserList, Delete } from "@/api/user";
export default {
  name: "AuditList",
  inject: ["reload"],
  data() {
    return {
      auditList: [],
      queryInfo: {
        table: "tm_ocp_signup",
      },
    };
  },
  created() {
    this.getAuditList(this.queryInfo);
  },
  methods: {
    /**
     * 处理网络请求
     */
    async getAuditList(query) {
      let { code, data } = await getUserList(query);
      if (code !== 200) return this.$message.error("获取失败！");
      this.auditList = data;
      //   console.log(data);
    },
    // 根据id删除
    async deleteClick(id) {
      let table = {
        table: "tm_ocp_signup",
        deletekey: "id",
        deletearray: JSON.stringify([id]),
      };
      let { code } = await Delete(table);
      if (code !== 200) return this.$message.error("删除失败");
      this.$message.success("删除成功！");
      this.reload();
    },
  },
};
</script>

<style lang="less" scopde>
</style>