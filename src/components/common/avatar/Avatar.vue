<template>
  <div class="acatar">
    <el-dropdown :hide-on-click="false">
      <span class="el-dropdown-link">
        <img :src="userInfo.photoimgurl" alt="" class="avatar" />
        {{ userInfo.realname }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item  @click.native="goMyInfo"
          ><i class="iconlzt icon-lzt-gerenzhongxin"></i
          >个人中心</el-dropdown-item
        >
        <el-dropdown-item
          ><i class="iconlzt icon-lzt-xiugaimima"></i>修改密码</el-dropdown-item
        >
        <el-dropdown-item @click.native="logout"
          ><i class="iconlzt icon-lzt-tuichudenglu"></i
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  inject: ["reload"], //注入刷新方法
  props: {
    userInfo: { type: Object },
    top: { type: String, default: "45px" },
  },
  methods: {
    // 点击退出登录
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push("/index");
      // this.reload();
      window.location.reload();
    },
    /*跳转个人中心*/
    goMyInfo() {
      this.$router.push({
        path: "/myInfo",
      });
    },
  },
};
</script>

<style lang="less" scopde>
.acatar {
  margin-right: 25px;
  cursor: pointer;
  .el-dropdown-link {
    display: block;
    .avatar {
      position: relative;
      top: 9px;
      height: 28px;
      width: 28px;
      border-radius: 50%;
    }
  }
}
// .el-dropdown-menu {
//   top: 45px !important;
// }
</style>