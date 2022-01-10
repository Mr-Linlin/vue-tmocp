<template>
  <el-card>
    <!--      搜索与添加区域-->
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <el-input
          @keyup.enter.native="query"
          @clear="clear"
          placeholder="请输入课程名称"
          v-model="queryInfo.coursemajorname"
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
      :data="coursepro"
      border
      stripe
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
      style="width: 100%; margin-bottom: 20px"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="coursemajorname" label="课程专业名称">
      </el-table-column>
      <el-table-column prop="coursemajorfjid" label="课程专业父级id">
      </el-table-column>
      <el-table-column prop="weight" label="权重"> </el-table-column>
      <el-table-column prop="majorprice" label="专业价格"> </el-table-column>
      <el-table-column label="操作">
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
      :page-sizes="[3, 7, 15, 20]"
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
import { getpro, remove } from "@/api/courseProfessional";
import UserPopup from "./courseProfessPopup/CourseProPopup.vue";
export default {
  name: "CourseProfessional",
  inject: ["reload"],
  components: { UserPopup },
  data() {
    return {
      queryInfo: {
        table: "tm_ocp_coursemajor",
        coursemajorname: "",
        page: 1,
        paging: true,
        limit: 3,
        orderarray: JSON.stringify([
          {
            id: "ASC",
          },
        ]),
      },
      coursepro: [],
      // 当前编辑数据
      current: null,
      // 是否显示编辑弹窗
      showEdit: false,
       total:0
    };
  },
  created() {
    this.getpro(this.queryInfo);
  },
  methods: {
    // 获取专业数据
    async getpro(table) {
      let { data,count } = await getpro(table);
      console.log(data);
      this.coursepro = data;
      this.total = count
    },
    // 查询
    async query() {
      console.log(111);
      this.queryInfo.likemap = JSON.stringify({
        coursemajorname: this.queryInfo.coursemajorname,
      });
      let { data } = await getpro(this.queryInfo);
      this.coursepro = data;
    },
    // 删除
    async reomve(id) {
      let obj = {};
      obj.table = "tm_ocp_coursemajor";
      obj.deletekey = "id";
      obj.deletearray = JSON.stringify([id]);
      let res = await remove(obj);
      this.getpro(this.queryInfo);
      // this.reload();
      console.log(res);
    },
    // 清空对话框,把数据全部显示回来
    clear() {
      this.queryInfo.likemap = "";
      this.getpro(this.queryInfo);
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
      this.reload();
    },
      //条数
    handleSizeChange(newSize){
      this.queryInfo.limit = newSize
      this.getpro(this.queryInfo)
    },
    //页码
    handleCurrentChange(newPage){
      this.queryInfo.page = newPage
      this.getpro(this.queryInfo)
    }
  },
};
</script>

<style soped>
.row {
  margin-bottom: 20px;
}
</style>