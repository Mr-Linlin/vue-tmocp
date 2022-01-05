<template>
  <el-card>
    <!--      搜索与添加区域-->
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <el-input
          placeholder="请输入学号"
          v-model="queryInfo.stunumber"
          clearable
        >
          <el-button slot="append" icon="el-icon-search" @click="query"
            >搜索</el-button
          >
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="dialogVisible = true"
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <el-table
      :data="userList"
      border
      style="width: 100%"
      stripe
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
    >
     <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="realname" label="姓名"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="50"> </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
      </el-table-column>
      <el-table-column prop="accountnumber" label="账号" width="100">
      </el-table-column>
      <el-table-column prop="idcardno" label="身份证号"> </el-table-column>
      <el-table-column prop="photoimgurl" label="照片" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.photoimgurl" alt="" class="showImg" />
        </template>
      </el-table-column>
      <el-table-column prop="stunumber" label="学号" width="120">
      </el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="wxopenid" label="微信" width="100">
      </el-table-column>
      <!-- 状态 -->
      <el-table-column prop="userstatus" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.userstatus"
            active-color="#409eff"
            inactive-color="#dcdfe6"
          >
          </el-switch>
        </template>
      </el-table-column>
      <!-- 用户权限 -->
      <el-table-column prop="userpower" label="用户权限">
        <template slot-scope="item">
          <el-tag v-if="item.row.userpower === '1'">管理员</el-tag>
          <el-tag type="warning" v-else>用户</el-tag>
        </template>
      </el-table-column>
      <!-- 用户类别 -->
      <el-table-column prop="usercategory" label="用户类别">
        <template slot-scope="item">
          <el-tag v-if="item.row.usercategory === '1'">新考生</el-tag>
          <el-tag type="warning" v-else>继续教育</el-tag>
        </template>
      </el-table-column>
      <!-- 考试权限 -->
      <el-table-column prop="address" label="用户考试权限">
        <template slot-scope="item">
          <el-tag v-if="item.row.address === '1'">拥有权限</el-tag>
          <el-tag type="warning" v-else>暂无权限</el-tag>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="modify(scope.row.id)"
            >修改</el-button
          >
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.pageNum"
      :page-sizes="[5, 7, 10]"
      :page-size="query.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination> -->
  </el-card>
</template>

<script>
import { getUserList } from "@/api/user";
export default {
  name: "UserList",
  data() {
    return {
      userList: [],
      table: "tm_ocp_user",
      total: 0,
      stunumber: "",
      queryInfo: {
        table: "tm_ocp_user",
        stunumber: "",
      },

      //  query: {
      //   pageNum: 1,//页
      //   limit: 5,//条
      // },
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
      let { data, count } = await getUserList(table);
      // console.log(data);
      data.forEach((item) => {
        if (item.userstatus == 1) {
          return (item.userstatus = true);
        } else {
          return (item.userstatus = false);
        }
      });
      this.userList = data;
      this.total = count;
      // console.log(this.userList);
    },
    // 查询
    async query() {
      this.queryInfo.inmap = JSON.stringify({
        stunumber: this.queryInfo.stunumber,
      });
      let { data } = await getUserList(this.queryInfo);

      data.forEach((item) => {
        if (item.userstatus == 1) {
          return (item.userstatus = true);
        } else {
          return (item.userstatus = false);
        }
      });
      this.userList = data;
    },
  
    // 修改
    modify(id) {
      console.log(id);
    },
    // 分页
    // handleSizeChange(val) {//条
    //   this.query.limit = val;
    //   this.getUserList(this.query);
    // },
    // handleCurrentChange(val) {//页
    //   this.query.pageNum = val;
    //   this.getUserList(this.query);
    // },
  },
};
</script>

<style  lang="less" scoped>
.row {
  margin-bottom: 20px;
}
.showImg {
  width: 150px;
  height: 84px;
}
</style>