<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <el-input
            placeholder="根据学号查询"
            class="input-with-select"
            v-model="stunumber"
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
          <el-button type="primary">添加用户</el-button>
        </div></el-col
      >
    </el-row>

    <!-- 用户列表 -->
    <el-table :data="userList" border class="tableBox">
      <el-table-column label="序号" type="index" width="70"> </el-table-column>
      <el-table-column
        label="姓名"
        prop="realname"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column label="性别" prop="sex"> </el-table-column>
      <el-table-column
        label="手机号"
        prop="phone"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="账号"
        prop="accountnumber"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="身份证"
        prop="idcardno"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="照片"
        prop="photoimgurl"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="学号"
        prop="stunumber"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column label="密码" prop="password"> </el-table-column>
      <el-table-column label="用户权限" :show-overflow-tooltip="true">
        <template slot-scope="item">
          {{ item.row.userpower === "1" ? "超级管理员" : "学生" }}
        </template>
      </el-table-column>
      <el-table-column label="考生类别">
        <template slot-scope="item">
          {{ item.row.usercategory === "1" ? "新考生" : "继续教育学生" }}
        </template>
      </el-table-column>
      <el-table-column label="考试权限">
        <template slot-scope="item">
          {{ item.row.userexamcategory === "1" ? "拥有权限" : "暂无权限" }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <el-switch v-model="item.row.userstatus">></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template>
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
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
  </el-card>
</template>

<script>
import { getUserList } from "@/api/user";
export default {
  name: "UserList",
  data() {
    return {
      userList: [],
      queryInfo: {
        table: "tm_ocp_user",
        inmap: "",
      },
      stunumber: "",
    };
  },
  created() {
    this.getUserList(this.queryInfo);
  },

  methods: {
    /**
     * 网络请求
     */
    // 获取用户列表
    async getUserList(table) {
      let { code, data } = await getUserList(table);
      if (code !== 200) return this.$message.error("用户列表获取失败！");
      for (const item of data) {
        if (item.userstatus == 1 && item.userstatus == "1") {
          item.userstatus = true;
        } else {
          item.userstatus = false;
        }
      }
      this.userList = data;
    },
    /**
     * 点击查询后根据学号查询学生
     */
    async queryUser() {
      this.queryInfo.inmap = JSON.stringify({ stunumber: this.stunumber });
      let { data } = await getUserList(this.queryInfo);
      if (data.length === 0) return this.$message.error("查无此人！");
      for (const item of data) {
        if (item.userstatus == 1 && item.userstatus == "1") {
          item.userstatus = true;
        } else {
          item.userstatus = false;
        }
      }
      this.userList = data;
    },
  },
};
</script>

<style  lang="less" scoped>
.tableBox {
  margin-top: 15px !important;
}
.box-card {
  width: 100% !important;
  margin: 15px;
}
</style>