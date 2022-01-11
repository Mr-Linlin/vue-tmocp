<template>
  <div class="home">
    <!-- 头部 -->
    <div class="top-header">
      <div class="top-wrap">
        <div class="logo">
          <img src="~@/assets/img/common/logo.png" alt="" />
          <h1>电大在线课程培训管理信息系统</h1>
        </div>
        <div class="top-btns">
          <div class="resigter-btn">注册</div>
          <div class="login-btn">登录</div>
        </div>
      </div>
    </div>
    <!-- 轮播背景 -->
    <div class="swiper">
      <div class="login-box">
        <el-form
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          class="loginForm"
        >
          <div class="title-container">
            <span class="title">用户登录</span>
          </div>
          <el-form-item prop="username">
            <i class="iconlzt icon-lzt-gerenzhongxin icon"></i>
            <el-input
              v-model="loginForm.username"
              type="text"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <i class="iconlzt icon-lzt-xiugaimima icon"></i>
            <el-input
              type="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="verifycode">
            <div class="form-row">
              <el-input
                type="text"
                v-model="loginForm.verifycode"
                placeholder="请输入验证码"
              >
              </el-input>
              <div class="verify-img">验证码</div>
            </div>
          </el-form-item>
          <el-form-item style="margin-bottom: 10px">
            <el-button type="primary" class="submit" @click="submitForm"
              >登录</el-button
            >
          </el-form-item>
          <div class="port">
            <div class="back-pwd">忘记密码？</div>
            <div class="register">注册</div>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 内筒模块 -->
    <div class="content-main">
      <div class="box-main">
        <div class="work-trend">
          <board
            :title="{
              title: '工作动态',
              icon: 'iconlzt icon-lzt-dingdanguanli',
              more: '更多',
            }"
            :newinfos="newinfos"
          />
          <div class="courses">
            <div class="tube">
              <div class="tube-img">
                <!-- <i class="iconlzt iconlzt icon-lzt--s-tezhongzuoyerenyuan"></i> -->
              </div>
              安管人员培训课程
            </div>
            <div class="special">
              <div class="special-img">
                <!-- <i class="iconlzt icon-lzt--s-tezhongzuoyerenyuan"></i> -->
              </div>
              特种作业人员培训课程
            </div>
          </div>
        </div>
        <div class="inform">
          <board
            :title="{
              title: '通知公告',
              icon: 'iconlzt icon-lzt-tongzhi',
              more: '更多',
            }"
            :newinfos="newinfos"
          />
          <div class="examtion">
            <div class="ann-tube">
              <!-- 安管人员在线考试
              <div class="goback">点击进入</div> -->
            </div>
            <div class="train-course">
              <!-- 继续教育培训课程
              <div class="goback">点击进入</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部版权信息 -->
    <div class="footer">2020 © 滁州永荣职业培训学校</div>
  </div>
</template>

<script>
import Board from "./childrenComps/Board.vue";
export default {
  name: "Index",
  components: {
    Board,
  },
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空!"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位!"));
      } else {
        callback();
      }
    };
    var validateVerifycode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入验证码！!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        verifycode: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
        verifycode: [{ validator: validateVerifycode, trigger: "blur" }],
      },
      newinfos: [
        {
          newtitle:
            "【贯彻落实党代会精神】干货满满！一图读懂学校第三次党代会工作报告",
          newvicetitle:
            "2021年12月23日上午，中国共产党滁州职业技术学院第三次代表大会隆重召开。校党委书记曹付忠同志代表学校党委作题为《立足新阶段 实现新跨越 为推进学校全面高质量发展而努力奋斗》的工作报告。",
          releasetime: "2022-01-05",
        },
        {
          newtitle:
            "【贯彻落实党代会精神】干货满满！一图读懂学校第三次党代会工作报告",
          newvicetitle:
            "2021年12月23日上午，中国共产党滁州职业技术学院第三次代表大会隆重召开。校党委书记曹付忠同志代表学校党委作题为《立足新阶段 实现新跨越 为推进学校全面高质量发展而努力奋斗》的工作报告。",
          releasetime: "2022-01-05",
        },
        {
          newtitle:
            "【贯彻落实党代会精神】干货满满！一图读懂学校第三次党代会工作报告",
          newvicetitle:
            "2021年12月23日上午，中国共产党滁州职业技术学院第三次代表大会隆重召开。校党委书记曹付忠同志代表学校党委作题为《立足新阶段 实现新跨越 为推进学校全面高质量发展而努力奋斗》的工作报告。",
          releasetime: "2022-01-05",
        },
        {
          newtitle:
            "【贯彻落实党代会精神】干货满满！一图读懂学校第三次党代会工作报告",
          newvicetitle:
            "2021年12月23日上午，中国共产党滁州职业技术学院第三次代表大会隆重召开。校党委书记曹付忠同志代表学校党委作题为《立足新阶段 实现新跨越 为推进学校全面高质量发展而努力奋斗》的工作报告。",
          releasetime: "2022-01-05",
        },
      ],
    };
  },
  methods: {
    // 点击进行登录
    submitForm(){
      // console.log('登录了');
      let roles='admin'
      this.$store.dispatch('DYNAMICROUTER',roles)
      this.$router.push('/')
    }
  },
};
</script>

<style lang="less" scoped>
.top-header {
  position: relative;
  height: 70px;
  line-height: 70px;
  margin-bottom: 10px;
  // box-shadow: 0px 1px 5px rgba(100, 100, 100, 0.5);
  .top-wrap {
    width: 1151px;
    // background: fuchsia;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .logo {
      display: flex;
      padding-left: 20px;
      img {
        position: relative;
        top: 10px;
        width: 50px;
        height: 50px;
        margin-right: 20px;
      }
      h1 {
        margin: 0;
        color: #000;
      }
    }
    .top-btns {
      margin-right: 120px;
      margin-top: 20px;
      display: flex;
      cursor: pointer;
      .resigter-btn,
      .login-btn {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        padding: 0 20px;
        border-radius: 2px;
        margin-left: 11px;
      }
      .resigter-btn {
        background: rgb(241, 16, 18);
        color: rgb(#fff);
      }
      .login-btn {
        // border: 1px solid #ccc;
        box-shadow: 1px 1px 3px rgba(100, 100, 100, 0.4);
      }
    }
  }
}
.swiper {
  position: relative;
  background: url("~@/assets/img/home/bg.jpg") no-repeat;
  background-size: 100%;
  height: 400px;
  margin-bottom: 10px;
  .login-box {
    position: absolute;
    top: 50%;
    right: 30%;
    transform: translate(0, -50%);
    width: 350px;
    height: 320px;
    box-shadow: 1px 1px 10px rgba(100, 100, 100, 0.6);
    background: #fff;
    border-radius: 5px;
    padding: 15px;
    .loginForm {
      // background: pink;
      .title-container {
        color: rgb(241, 16, 18);
        font-weight: 600;
        margin-bottom: 10px;
      }
      .submit {
        width: 100%;
        background: rgb(241, 16, 18);
        border: 0;
      }
      .el-input {
        position: relative;
        /deep/.el-input__inner {
          padding-left: 30px !important;
        }
      }
      .icon {
        position: absolute;
        display: inline-block;
        top: 0;
        left: 10px;
        color: rgb(241, 16, 18);
        z-index: 999;
      }
    }
    .form-row {
      display: flex;
      .el-input {
        width: 200px;
        margin-right: 10px;
      }
      .verify-img {
        border: 1px solid #ccc;
        flex: 1;
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
      }
    }
    .port {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
    .back-pwd,
    .register {
      cursor: pointer;
    }
    .back-pwd:hover,
    .register:hover {
      color: rgb(241, 16, 18);
    }
  }
}
.content-main {
  height: 410px;
  margin-bottom: 10px;
  .box-main {
    display: flex;
    margin: 0 auto;
    width: 1151px;
    height: 100%;
    .work-trend {
      flex: 1;
      margin-right: 15px;
      .trend {
        height: 250px;
        background: yellow;
      }
      .courses {
        height: 150px;
        margin-top: 10px;
        display: flex;
        text-align: center;
        align-items: center;
        .tube,
        .special {
          flex: 1;
          cursor: pointer;
          .tube-img,
          .special-img {
            height: 68px;
            width: 100px;
            border-radius: 15px;
            line-height: 60px;
            margin: 0 auto;
            margin-bottom: 10px;
            i {
              font-size: 40px;
            }
          }
        }
        .tube {
          position: relative;
          .tube-img {
            background: url("~@/assets/img/home/t_1.png");
          }
        }
        .tube-img::before {
          position: absolute;
          right: 0;
          display: block;
          content: "";
          width: 1px;
          height: 80%;
          background: #ccc;
        }
        .special-img {
          background: url("~@/assets/img/home/t_2.png");
          // border: 1px solid rgb(13, 172, 203);
          // color: rgb(13, 172, 203);
        }
      }
    }
    .inform {
      flex: 1;
      .trend {
        height: 250px;
        background: yellow;
      }
      .examtion {
        height: 150px;
        margin-top: 10px;
        .ann-tube,
        .train-course {
          display: flex;
          height: 70px;
          justify-content: center;
          line-height: 70px;
          color: #fff;
          font-size: 20px;
          font-weight: 550;
          cursor: pointer;
          .goback {
            margin-left: 20px;
            color: #000;
            font-weight: 400;
            font-size: 18px;
            background: rgba(#fff, 0.5);
            height: 40px;
            line-height: 40px;
            padding: 0 25px;
            border-radius: 10px;
            cursor: pointer;
            margin-top: 15px;
          }
        }
        .ann-tube {
          background: url("~@/assets/img/home/link_1.jpg");
        }
        .train-course {
          // background: rgb(251, 203, 118);
          background: url("~@/assets/img/home/link_2.jpg");
          margin-top: 10px;
        }
      }
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgb(171, 171, 171);
  color: #fff;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 14px;
}

</style>