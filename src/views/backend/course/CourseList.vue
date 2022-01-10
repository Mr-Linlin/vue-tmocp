<template>
  <el-card>
    <!--      搜索与添加区域-->
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <el-input
          @keyup.enter.native="query"
          @clear="clear"
          placeholder="请输入课程名称"
          v-model="queryInfo.coursename"
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
      :data="course"
      border
      stripe
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
      style="width: 100%;margin-bottom:20px"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="coursename" label="课程名称"> </el-table-column>
      <el-table-column prop="coursegeneralcat" label="课程大类">
      </el-table-column>
      <el-table-column prop="coursesubclass" label="课程小类">
      </el-table-column>
      <el-table-column prop="courseimgurl" label="课程封面" width="220">
        <template slot-scope="scope">
          <img :src="scope.row.courseimgurl" alt="" class="showImg" />
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column prop="coursestate" label="课程状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.coursestate === '1'">使用</el-tag>
          <el-tag type="warning" v-else>停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="coursemsg" label="课程描述"> </el-table-column>
      <el-table-column prop="courseactual" label="课程简介"> </el-table-column>
      <el-table-column prop="textinfo" label="富文本课程信息介绍">
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="oppenPopup(scope.row)"
            >修改</el-button
          >
          <el-button size="mini" type="warning" @click="see(scope.row.id)"
            >查看</el-button
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
import { gitCourse, remove } from "@/api/course";
import UserPopup from "./courseListPopup/CourseListPopup.vue";
export default {
  components: { UserPopup },
  name: "CourseList",
  inject: ["reload"],
  data() {
    return {
      course: [],
      queryInfo: {
        table: "tm_ocp_courseinfo",
        coursename: "",
        page: 1,
        paging: true,
        limit: 3,
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
      total:0
    };
  },
  created() {
    this.gitCourse(this.queryInfo);
  },
  methods: {
    // 获取所有课程数据
    async gitCourse(table) {
      let { data,count } = await gitCourse(table);
      console.log(data);
      this.course = data;
      this.total = count
    },
    // 查询
    async query() {
      this.queryInfo.likemap = JSON.stringify({
        coursename: this.queryInfo.coursename,
      });
      let { data } = await gitCourse(this.queryInfo);
      this.course = data;
    },
    // 删除
    async reomve(id) {
      let obj = {};
      obj.table = "tm_ocp_courseinfo";
      obj.deletekey = "id";
      obj.deletearray = JSON.stringify([id]);
      let res = await remove(obj);
      // this.reload();
       this.gitCourse(this.queryInfo);
      console.log(res);
    },
    // 清空对话框,把数据全部显示回来
    clear() {
      this.queryInfo.likemap = "";
      this.gitCourse(this.queryInfo);
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
    // 跳转详情页
    see(id) {
      console.log(id);
      this.$router.push({ path: "/editcourse", query: { id } });
    },
     //条数
    handleSizeChange(newSize){
      this.queryInfo.limit = newSize
      this.gitCourse(this.queryInfo)
    },
    //页码
    handleCurrentChange(newPage){
      this.queryInfo.page = newPage
      this.gitCourse(this.queryInfo)
    }
  },
};
</script>

<style  lang="less" scoped>
.row {
  margin-bottom: 20px;
}
.showImg {
  width: 180px;
  height: 80px;
}
.popup {
  z-index: 2000;
}
</style>