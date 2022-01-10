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
            <el-form-item label="姓名:" prop="realname">
              <el-input v-model="form.realname"></el-input>
            </el-form-item>
            <el-form-item label="性别:" prop="sex">
              <el-input v-model="form.sex"></el-input>
            </el-form-item>
          </div>
          <div class="box"> 
            <el-form-item label="手机号:" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="账号:" prop="accountnumber">
            <el-input v-model="form.accountnumber"></el-input>
          </el-form-item>
          </div>
          <div class="box">
            <el-form-item label="身份证号:" prop="idcardno">
            <el-input v-model="form.idcardno"></el-input>
          </el-form-item>
          <el-form-item label="照片:" prop="photoimgurl">
            <el-input v-model="form.photoimgurl"></el-input>
          </el-form-item>
          </div>
          <div class="box">
            <el-form-item label="学号:" prop="stunumber">
            <el-input v-model="form.stunumber"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          </div>
         <div class="box">
            <el-form-item label="微信:" prop="wxopenid">
            <el-input v-model="form.wxopenid"></el-input>
          </el-form-item>
          <el-form-item label="状态:" prop="userstatus">
            <el-select
              v-model="form.userstatus"
              placeholder="请选择"
            >
              <el-option
                v-for="item in userstatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
         </div>
          <div class="box">
              <el-form-item label="用户权限:" prop="userpower">
            <el-select
              v-model="form.userpower"
              placeholder="请选择"
            >
              <el-option
                v-for="item in userpower"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户类别:" prop="usercategory">
            <el-select
              v-model="form.usercategory"
              placeholder="请选择"
            >
              <el-option
                v-for="item in usercategory"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          </div>
          <el-form-item label="用户考试权限:" prop="userexamcategory">
            <el-select
              v-model="form.userexamcategory"
              placeholder="请选择"
            >
              <el-option
                v-for="item in userexamcategory"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
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
import { editUserinfo, addUserinfo } from "@/api/user";
export default {
  name: "UserPopup",
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
        realname: "", //姓名
        sex: "", //性别
        phone: "", //手机号
        accountnumber: "", //账号
        idcardno: "", //身份证号
        photoimgurl: "", //照片
        stunumber: "", //学号
        password: "", //密码
        wxopenid: "", //微信
        userstatus: "", //状态
        userpower: "", //用户权限
        usercategory: "", //用户类别
        userexamcategory: "", //用户考试权限
      },
      dialogVisible: this.visible,
      // 是否是修改还是添加
      isUpdate: false,
      rules: {
        realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        accountnumber: [
          { required: true, message: "请输入账号", trigger: "blur" },
        ],
        idcardno: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        photoimgurl: [
          { required: true, message: "请输入照片", trigger: "blur" },
        ],
        stunumber: [{ required: true, message: "请输入学号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        wxopenid: [{ required: true, message: "请输入微信", trigger: "blur" }],
        userstatus: [
          { required: true, message: "请选择状态", trigger: "blur" },
        ],
        userpower: [
          { required: true, message: "请选择用户权限", trigger: "blur" },
        ],
        usercategory: [
          { required: true, message: "请选择用户类别", trigger: "blur" },
        ],
        userexamcategory: [
          { required: true, message: "请选择考试权限", trigger: "blur" },
        ],
      },
      // 状态
      userstatus: [
        {
          value: "1",
          label: "使用",
        },
        {
          value: "2",
          label: "停用",
        },
      ],
      // 权限
      userpower: [
        {
          value: "1",
          label: "管理员",
        },
        {
          value: "2",
          label: "用户",
        },
      ],
      // 用户类别
      usercategory: [
        {
          value: "1",
          label: "新考生",
        },
        {
          value: "2",
          label: "继续教育学生",
        },
      ],
      // 用户考试权限
      userexamcategory: [
        {
          value: "1",
          label: "拥有权限",
        },
        {
          value: "2",
          label: "暂无权限",
        },
      ],
    };
  },

  created() {},
  methods: {
    // 修改--添加
    save() {
      if (this.isUpdate) {
        this.form.table = "tm_ocp_user";
        console.log(this.form);
        this.$refs.form.validate(async (valid) => {
          if (!valid) return;
          let { code, msg } = await editUserinfo(this.form);
          if (code !== 200) return this.$message.error(msg);
          this.$message.success(msg);
          this.dialogVisibles();
          this.reload();
        });
      } else {
        // console.log(2);
        console.log(this.form);
        this.form.table = "tm_ocp_user";
        this.$refs.form.validate(async (valid) => {
          if (!valid) return this.$message.error("请填写完用户数据在进行添加!");
          let { code, msg } = await addUserinfo(this.form);
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
    close(){
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