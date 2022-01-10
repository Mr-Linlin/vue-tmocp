<template>
  <el-dialog
    :title="isUpdate ? '修改用户信息' : '添加用户'"
    :visible.sync="dialogVisible"
    @close="close"
    width="45%"
    class="dialog"
    :before-close="handleClose"
    :modal-append-to-body='false'
  >
    <!-- 主题内容 -->
    <el-form
      :model="form"
      ref="form"
      @keyup.enter.native="save"
      :rules="rules"
      label-width="120px"
    >
      <el-row :gutter="15" style="height: 450px">
        <el-col :sm="20">
          <div class="box">
            <el-form-item label="课程名称:" prop="coursename">
              <el-input v-model="form.coursename"></el-input>
            </el-form-item>
            <el-form-item label="课程大类:" prop="coursegeneralcat">
              <el-input v-model="form.coursegeneralcat"></el-input>
            </el-form-item>
          </div>
          <div class="box">
            <el-form-item label="课程小类:" prop="coursesubclass">
              <el-input v-model="form.coursesubclass"></el-input>
            </el-form-item>
            <el-form-item label="课程封面地址:" prop="courseimgurl">
              <el-input v-model="form.courseimgurl"></el-input>
            </el-form-item>
          </div>
          <div class="box">
            <el-form-item label="课程状态:" prop="coursestate">
              <el-select v-model="form.coursestate" placeholder="请选择">
                <el-option
                  v-for="item in coursestate"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="课程描述:" prop="coursemsg">
              <el-input v-model="form.coursemsg"></el-input>
            </el-form-item>
          </div>
          <div class="box">
            <el-form-item label="课程简介:" prop="courseactual">
              <el-input v-model="form.courseactual"></el-input>
            </el-form-item>
            <el-form-item label="课程信息介绍:" prop="textinfo">
              <el-input v-model="form.textinfo"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <!-- 底部操作按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibles">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { editCourse, addCourse } from "@/api/course";
export default {
  name: "CourseListPopup",
  inject: ["reload"],
  components: {},
  props: {
    // 弹窗是否打开
    visible: Boolean, //true
    // 修改回显的数据
    data: Object,
  },
  watch: {
    data() {
      if (this.data) {
        delete this.data.createtime;
        delete this.data.updatetime;
        console.log(this.data);
        this.form = this.data;
        this.isUpdate = true;
      } else {
        this.form = {};
        this.isUpdate = false;
      }
    },
    visible(val) {
      this.dialogVisible = val;
    },
  },
  data() {
    return {
      form: {
        id: "",
        coursename: "", //课程名称
        coursegeneralcat: "", //课程大类
        coursesubclass: "", //课程小类
        courseimgurl: "", //课程封面
        coursestate: "", //课程状态
        coursemsg: "", //课程描述
        courseactual: "", //课程简介
        textinfo: "", //课程信息介绍
      
      },
      dialogVisible: this.visible,
      // 是否是修改还是添加
      isUpdate: false,
      rules: {
        coursename: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        coursegeneralcat: [{ required: true, message: "请输课程大类", trigger: "blur" }],
        coursesubclass: [{ required: true, message: "请输入课程小类", trigger: "blur" }],
        courseimgurl: [{ required: true, message: "请输入课程封面", trigger: "blur" }],
        coursestate: [{ required: true, message: "请选择课程状态", trigger: "blur" }],
        coursemsg: [{ required: true, message: "请输入课程描述", trigger: "blur" }],
        courseactual: [{ required: true, message: "请输入课程简介", trigger: "blur" }],
        textinfo: [{ required: true, message: "请输入课程信息介绍", trigger: "blur" }],
      },
      // 课程状态
      coursestate: [
        {
          value: "1",
          label: "使用",
        },
        {
          value: "2",
          label: "停用",
        },
      ],
    
     
     
    };
  },

  created() {},
  methods: {
    // 修改--添加
    save() {
      if (this.isUpdate) {
        this.form.table = "tm_ocp_courseinfo";
        console.log(this.form);
        this.$refs.form.validate(async (valid) => {
          if (!valid) return;
          let { code, msg } = await editCourse(this.form);
          if (code !== 200) return this.$message.error(msg);
          this.$message.success(msg);
          this.dialogVisibles();
          this.reload();
        });
      } else {
        // console.log(2);
        console.log(this.form);
        this.form.table = "tm_ocp_courseinfo";
        this.$refs.form.validate(async (valid) => {
          if (!valid) return this.$message.error("请填写完课程数据在进行添加!");
          let { code, msg } = await addCourse(this.form);
          if (code !== 200) return this.$message.error(msg);
          this.$message.success(msg);
          this.dialogVisibles();
          this.reload();
        });
      }
    },
    // 告诉父组件关闭弹窗
    dialogVisibles() {
      this.$emit("cancelPopup", this.dialogVisible);
    },
    close() {
      this.dialogVisibles();
    },
    handleClose() {
      this.dialogVisibles();
    },
  },
};
</script>
<style lang="less" scoped>
.box {
  display: flex;
}
</style>