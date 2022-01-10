<template>
  <div class="header">
    <div class="logo">
      <img src="~@/assets/img/common/logo.svg" alt="" />
      <span>在线教育后台</span>
    </div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in routes" :key="item.path">
          <router-link :to="item.path">{{ item.meta.title }}</router-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-tool">
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          <img src="~@/assets/img/common/avtavar.jpg" alt="" class="avatar" />
          admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            ><i class="iconlzt icon-lzt-gerenzhongxin"></i
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item
            ><i class="iconlzt icon-lzt-xiugaimima"></i
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item @click.native=logout
            ><i class="iconlzt icon-lzt-tuichudenglu"></i
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  inject:['reload'],//注入刷新方法
  data() {
    return {
      routes: [],
    };
  },
  created() {
    this.routes = this.$router.history.current.matched;
  },
  watch: {
    //   监听路由的变化，动态生成面包屑
    $route(to) {
      this.routes = to.matched;
      this.$store.commit("ADDTAG", to);
    },
  },
  methods: {
    // 点击退出登录
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push("/index");
      this.reload()
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 219px;
  background: rgb(40, 42, 54);
  height: 100%;
  img {
    width: 30px;
    height: 30px;
  }
  span {
    margin-left: 10px;
    color: #fff;
    font-weight: 500;
  }
}
.header-tool {
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
.el-dropdown-menu {
  top: 45px !important;
}
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: rgba(#2bccce, 0.2) !important;
  color: #2bccce !important;
}
.breadcrumb {
  position: absolute;
  display: flex;
  left: 235px;
  top: 22px;
  font-size: 16px;
}
</style>