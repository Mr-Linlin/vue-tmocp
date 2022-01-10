<template>
  <el-card>
     <!-- 章节 -->
    <el-tabs v-model="activeName">
      <!-- 章节信息 -->
      <el-tab-pane label="章节信息" name="first">
        <el-form
          ref="information"
          label-width="80px"
          class="information"
          v-for="item in courseSection"
          :model="item"
          :key="item.id"
        >
          <!-- 章 -->
          <el-form-item label="章名称:">
            <el-input
              v-model="item.chaptername"
              placeholder="请输入章名称"
              style="width: 300px; margin-right: 15px"
            ></el-input>
            <el-button type="danger">删除章</el-button>
            <el-button type="primary" >修改章</el-button>
          </el-form-item>
          <!-- 节 -->
          <div class="form-row" v-for="citem in item.children" :key="citem.id">
            <el-form-item label="节信息:">
              <el-input
                placeholder="请输入节名称"
                style="width: 200px"
                v-model="citem.chaptername"
              ></el-input>
            </el-form-item>
            <el-form-item label="视屏地址:">
              <el-input
                placeholder="请输入视屏地址"
                style="width: 200px"
                v-model="citem.video_url"
              ></el-input>
            </el-form-item>
            <el-form-item label="时长:">
              <el-input
                placeholder="请输入时长"
                style="width: 200px"
                v-model="citem.time"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="15px">
              <el-button type="warning">删除节</el-button>
              <el-button type="primary"
                >修改节</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
  
    </el-tabs>
  </el-card>
</template>
<script>
import { gitCourseSee } from "@/api/courseSee";
export default {
  name: "EditCourse",
  components: {},
  props: {},
  data() {
    return {
     courseSection: [], //章节信息
      id: null,
      queryInfo: {
        table: "tm_ocp_chapter",
        chaptercourseid: "",
      },
      activeName: "first",
    };
  },
  created() {
    console.log("我进来了");
    this.id = this.$route.query.id;
    // this.queryInfo.chaptercourseid = this.$route.query.id;
    console.log(this.id);
    this.gitCourseSee(this.queryInfo);
  },
 
  methods: {
    // 获取所有课程章节
    gitCourseSee(table) {
      this.queryInfo.equalmap = JSON.stringify({
        chaptercourseid: this.id,
      });

      gitCourseSee(table).then((res) => {
        console.log(res);
        this.courseSection = this.tree(res.data, 0);
      });
    },
    tree(data, parentid) {
      let tree = [];
      if (data !== null && data !== undefined) {
        data.forEach((item) => {
          if (item.chapterfjid === parentid) {
            tree.push(item); //这个item为父级
            console.log(tree);
            this.treeChildren(data, item, item.id); //这个item为父级  item.id是父级的id
          }
        });
        return tree;
      }
    },
    treeChildren(data, fitem, id) {
      console.log(fitem);
      //这个fitem为父级
      fitem.children = fitem.children ? fitem.children : [];
      console.log(fitem);
      data.forEach((item) => {
        //这个item为所有项
        if (item.chapterfjid === id) {
          fitem.children.push(item);
          this.treeChildren(data, item, item.id); 
        }
      });
      return fitem.children;
    },
  },
};
</script>
<style scoped>
</style>