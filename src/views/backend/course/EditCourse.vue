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
            <el-button type="danger" @click="romovez(item)">删除章</el-button>
            <el-button type="primary" @click="chapter(item)">修改章</el-button>
          </el-form-item>
          <!-- 节 -->
          <div class="form-row" v-for="citem in item.children" :key="citem.id">
            <el-form-item label="节信息:">
              <el-input
                placeholder="请输入节名称"
                style="width: 200px; margin-right: 15px"
                v-model="citem.chaptername"
              ></el-input>
            </el-form-item>
            <el-form-item label="视屏地址:">
              <el-input
                placeholder="请输入视屏地址"
                style="width: 200px"
                v-model="citem.chapterurl"
              ></el-input>
            </el-form-item>
            <el-form-item label="时长:">
              <el-input
                placeholder="请输入时长"
                style="width: 200px"
                v-model="citem.chapterduration"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="15px">
              <el-button type="warning" @click="remove(citem.id)"
                >删除节</el-button
              >
              <el-button type="primary" @click="chap(citem)">修改节</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <!-- 添加章节 -->
      <el-tab-pane label="添加章节" name="second">
        <!-- 添加章 -->
        <el-form
          :model="zhang"
          ref="zhang"
          :rules="rules"
          class="information"
          label-width="100px"
          
        >
          <el-form-item label="章名称" prop="chaptername">
            <div class="form-row">
              <el-input
              
                v-model="zhang.chaptername"
                placeholder="请输入章名称"
                style="width: 300px; margin-right: 15px"
              ></el-input>
              <el-button type="primary" @click="addCourseinfo"
                >添加章</el-button
              >
            </div>
          </el-form-item>
        </el-form>
        <!-- 添加节 -->
        <el-form
          :model="addCourse"
          :rules="rule"
          label-width="100px"
          ref="addCourse"
          class="information"
          
        >
          <!-- 添加节和章 -->
          <div class="form-row">
            <el-form-item label="章名称">
              <el-select v-model="addCourse.chapterfjid" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.chaptername"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 节名称 -->
            <el-form-item label="节信息:" prop="chaptername">
              <el-input
              clearable
                v-model="addCourse.chaptername"
                placeholder="请输入节名称"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <!-- ship地址 -->
            <el-form-item label-width="15px" prop="chapterurl">
              <el-input
              clearable
                v-model="addCourse.chapterurl"
                placeholder="请输入视屏地址"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <!-- 时长 -->
            <el-form-item label-width="15px" prop="chapterduration">
              <el-input
                v-model="addCourse.chapterduration"
                placeholder="请输入时长"
                style="width: 200px"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label-width="15px">
              <el-button type="primary" @click="jie">添加节</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import {
  gitCourseSee,
  editCourseSee,
  removeSee,
  addCourseSee,
} from "@/api/courseSee";
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
      form: {
        table: "tm_ocp_chapter",
        id: "",
        chaptername: "",
        chapterurl: "", //章节地址
        chapterduration: "", //时长
      },
      // 添加节
      addCourse: {
        table: "tm_ocp_chapter",
        chaptercourseid: "", //章节对应课程id
        chapterfjid: '', //章
        chaptername: "", //章节名称
        chapterurl: "", //地址
        chapterduration: "", //时长
        chaptersort: "4", //排序
      },
      // 添加章
      zhang: {
        table: "tm_ocp_chapter",
        chaptercourseid: "", //章节对应课程id
        chapterfjid: 0, //章父id
        chaptername: "", //章节名称
        chaptersort: "3", //排序
      },
      rules: {
        chaptername: [
          { required: true, message: "请输入章名称", trigger: "blur" },
        ],
      },
      rule: {
        chaptername: [
          { required: true, message: "请填写节名称", trigger: "blur" },
        ],

        chapterurl: [
          { required: true, message: "请填入视屏地址", trigger: "blur" },
        ],
        chapterduration: [
          { required: true, message: "请填入时长", trigger: "blur" },
        ],
      },
      options: [],
    };
  },
  created() {
    // console.log("我进来了");
    this.id = this.$route.query.id;
    this.addCourse.chaptercourseid = this.$route.query.id;
    this.zhang.chaptercourseid = this.$route.query.id;
    // this.queryInfo.chaptercourseid = this.$route.query.id;
    // console.log(this.id);
    this.gitCourseSee(this.queryInfo);
    this.getzhang(this.queryInfo);
  },

  methods: {
    // 获取章
    getzhang(table) {
      this.queryInfo.equalmap = JSON.stringify({
        chapterfjid: "0",
      });
      gitCourseSee(table).then((res) => {
        console.log(res);
        this.options = res.data;
      });
    },
    // 获取所有课程章节
    gitCourseSee(table) {
      this.queryInfo.equalmap = JSON.stringify({
        chaptercourseid: this.id,
      });
      gitCourseSee(table).then((res) => {
        // console.log(res);
        this.courseSection = this.tree(res.data, 0);
        // console.log(this.courseSection);
      });
    },
    tree(data, parentid) {
      let tree = [];
      if (data !== null && data !== undefined) {
        data.forEach((item) => {
          // console.log(item);
          if (item.chapterfjid == parentid) {
            tree.push(item); //这个item为父级
            this.treeChildren(data, item, item.id); //这个item为父级  item.id是父级的id
          }
        });
        return tree;
      }
    },
    treeChildren(data, fitem, id) {
      // console.log(fitem);
      //这个fitem为父级
      fitem.children = fitem.children ? fitem.children : [];
      // console.log(fitem);
      data.forEach((item) => {
        //这个item为所有项
        if (item.chapterfjid == id) {
          fitem.children.push(item);
          this.treeChildren(data, item, item.id);
        }
      });
      return fitem.children;
    },
    // 修改章
    async chapter(item) {
      console.log(item);
      let { id, chaptername } = item;
      this.form.chaptername = chaptername;
      this.form.id = id;
      let { code } = await editCourseSee(this.form);
      if (code !== 200) return;
      this.$message.success("修改成功");
    },
    // 修改节
    async chap(item) {
      let { id, chaptername, chapterurl, chapterduration } = item;
      this.form.id = id;
      this.form.chaptername = chaptername;
      this.form.chapterurl = chapterurl;
      this.form.chapterduration = chapterduration;
      let { code } = await editCourseSee(this.form);
      if (code !== 200) return;
      this.$message.success("修改成功");
    },
    // 删除节
    async remove(id) {
      let obj = {};
      obj.table = "tm_ocp_chapter";
      obj.deletekey = "id";
      obj.deletearray = JSON.stringify([id]);
      let {code} = await removeSee(obj);
      if(code !== 200) return this.$message.error('删除失败');
      this.$message.success('删除成功')
      this.gitCourseSee(this.queryInfo);

    },
    // 删除章
    async romovez(item) {
      console.log(item);
      let obj = {};
      let arr = [];
      arr.push(item.id)
      obj.table = "tm_ocp_chapter";
      obj.deletekey = "id";
      item.children.forEach((item) => {
        console.log(item.id);
        arr.push(item.id)
      });
      console.log(arr);
      obj.deletearray = JSON.stringify(arr);
      let {code} = await removeSee(obj);
      if(code !== 200) return this.$message.error('删除失败');
      this.$message.success('删除成功')
      this.gitCourseSee(this.queryInfo);
    },
    // 添加章
    addCourseinfo() {
      console.log(111);
      this.$refs.zhang.validate(async (valid) => {
        if (!valid) return this.$message.error("请填写好章在保存!");
        let {code} = await addCourseSee(this.zhang);
        if(code !== 200) return this.$message.error('添加失败');
        this.$message.success('添加成功')
        this.$refs.zhang.resetFields();
      });
    },
    // 添加节
    jie() {
      console.log(222);
      this.$refs.addCourse.validate(async (valid) => {
        if (!valid) return this.$message.error("请填写好节在保存!");
        let {code} = await addCourseSee(this.addCourse);
        if(code !== 200) return this.$message.error('添加失败');
        this.$message.success('添加成功')
        this.$refs.addCourse.resetFields();
      });
    },
  },
};
</script>
<style scoped>
.form-row {
  display: flex;
}
.information {
  border: 1px solid #ccc;
  border-left: 5px solid #ccc;
  padding: 15px 0;
}
</style>