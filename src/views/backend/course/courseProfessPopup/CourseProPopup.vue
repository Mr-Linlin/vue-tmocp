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
            <el-form-item label="课程专业名称:" prop="coursemajorname">
              <el-input v-model="form.coursemajorname"></el-input>
            </el-form-item>
            <el-form-item label="课程专业父级id:" prop="coursemajorfjid">
              <el-input v-model="form.coursemajorfjid"></el-input>
            </el-form-item>
          </div>
         
      
          <div class="box">
            <el-form-item label="权重:" prop="weight">
              <el-input v-model="form.weight"></el-input>
            </el-form-item>
            <el-form-item label="专业价格:" prop="majorprice">
              <el-input v-model="form.majorprice"></el-input>
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
import { editproinfo, addproinfo } from "@/api/courseProfessional";
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
        coursemajorname: "", //课程专业名称
        coursemajorfjid: "", //课程专业父级id
        weight: "", //权重
        majorprice: "", //专业价格
      },
      dialogVisible: this.visible,
      // 是否是修改还是添加
      isUpdate: false,
      rules: {
        coursemajorname: [{ required: true, message: "请输入课程专业名称", trigger: "blur" }],
        coursemajorfjid: [{ required: true, message: "请输入课程专业父级id", trigger: "blur" }],
        weight: [{ required: true, message: "请输入权重", trigger: "blur" }],
        majorprice: [{ required: true, message: "请输入专业价格", trigger: "blur" }],
      },
    };
  },

  created() {},
  methods: {
    // 修改--添加
    save() {
      if (this.isUpdate) {
        this.form.table = "tm_ocp_coursemajor";
        console.log(this.form);
        this.$refs.form.validate(async (valid) => {
          if (!valid) return;
          let { code, msg } = await editproinfo(this.form);
          if (code !== 200) return this.$message.error(msg);
          this.$message.success(msg);
          this.dialogVisibles();
          this.reload();
        });
      } else {
        // console.log(2);
        console.log(this.form);
        this.form.table = "tm_ocp_coursemajor";
        this.$refs.form.validate(async (valid) => {
          if (!valid) return this.$message.error("请填写完课程数据在进行添加!");
          let { code, msg } = await addproinfo(this.form);
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