<template>

  <el-card>
    <!--      搜索与添加区域-->
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <el-input
          @keyup.enter.native="query"
          @clear="clear"
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
        <el-button type="primary" @click="oppenPopup(null)">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="userList"
      border
      style="width: 100%;margin-bottom:20px"
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
      <el-table-column prop="photoimgurl" label="照片" width="150">
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
        <template slot-scope="item">
          <el-tag v-if="item.row.userstatus === '1'">使用</el-tag>
          <el-tag type="warning" v-else>停用</el-tag>
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
      <el-table-column prop="userexamcategory" label="用户考试权限">
        <template slot-scope="item">
          <el-tag v-if="item.row.userexamcategory === '1'">拥有权限</el-tag>
          <el-tag type="warning" v-else>暂无权限</el-tag>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="oppenPopup(scope.row)"
            >修改</el-button
          >
          <el-button size="mini" type="danger" @click="reomve(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
   <!--      分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="queryInfo.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      backgroundf
    >
    </el-pagination>
    <!-- 弹窗 -->
    <user-popup
      class="popup"
      :data="current"
      :visible.sync="showEdit"
      @cancelPopup="cancelPopup"
      
    />

 </el-card>
</template>

<script>
import { getUserList, remove } from "@/api/user";
import UserPopup from "./userPopup/UserPopup.vue";
export default {
  components: { UserPopup },
  name: "UserList",
  inject:['reload'],
  data() {
    return {
      userList: [],
      table: "tm_ocp_user",
      total: 0,
      stunumber: "",
      queryInfo: {
        table: "tm_ocp_user",
        stunumber: "",
          page: 1,
        paging: true,
        limit: 5,
        orderarray: JSON.stringify([
          {
            id: "ASC",
          },
        ]),
      },
      // 当前编辑数据
      current: null,
      // 是否显示编辑弹窗
      showEdit: false,
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
      this.userList = data;
      this.total = count;
    },
    // 查询
    async query() {
      this.queryInfo.likemap = JSON.stringify({
        stunumber: this.queryInfo.stunumber,
      });
      let { data } = await getUserList(this.queryInfo);
      this.userList = data;
    },
    // 删除
    async reomve(id) {
      let obj = {};
      obj.table = "tm_ocp_user";
      obj.deletekey = "id";
      obj.deletearray = JSON.stringify([id]);
      let res = await remove(obj);
      this.getUserList(this.queryInfo);
      
      console.log(res);
    },
    // 清空对话框,把数据全部显示回来
    clear() {
      this.queryInfo.likemap = "";
      this.getUserList(this.queryInfo);
      this.reload();
    },

    // 添加--修改打开对话框
    oppenPopup(row) {
      this.current = row;
      this.showEdit = true;
    },

    // 子组件关闭弹窗
    cancelPopup(val) {
      this.showEdit = !val;
      this.reload()
    },
     //条数
    handleSizeChange(newSize){
      this.queryInfo.limit = newSize
      this.getUserList(this.queryInfo)
    },
    //页码
    handleCurrentChange(newPage){
      this.queryInfo.page = newPage
      this.getUserList(this.queryInfo)
    }
  },
};
</script>

<style  lang="less" scoped>
.row {
  margin-bottom: 20px;
}
.showImg {
  width: 80px;
  height: 40px;
}
.popup {
  z-index: 2000;
}

</style>
