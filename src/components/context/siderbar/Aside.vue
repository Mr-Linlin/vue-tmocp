<template>
  <div class="sider-aside">
    <el-menu
      :default-active="menuActive"
      background-color="rgb(40, 42, 54)"
      text-color="#fff"
      active-text-color="#1d82fe"
      router
      unique-opened
    >
      <el-submenu :index="item.path" v-for="item in menuList" :key="item.path">
        <template slot="title">
          <i :class="item.meta.icon" class="icon"></i>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item-group v-for="(i, index) in item.children" :key="index">
          <el-menu-item :index="i.path" @click="activeClick(i)">
            <template slot="title">
              <i :class="i.meta.icon" class="icon"></i>
              <span>{{ i.meta.title }}</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
// import { rights } from "@/utils/menu";
import { mapGetters } from "vuex";
export default {
  name: "Aside",
  data() {
    return {
      // menus: rights,
    };
  },
  mounted() {
  },
  methods: {
    activeClick(item) {
      this.$store.commit("SETMUNEACTIVE", item.path);
    },
  },
  computed: {
    ...mapGetters(["menuActive", "menuList"]),
  },
};
</script>

<style lang="less">
.el-menu {
  background-color: rgb(40, 42, 54) !important;
  border-right: 1px;
  .icon {
    margin-right: 10px;
    color: #fff;
    font-size: 18px;
  }
}
//设置鼠标悬停时el-submenu的样式
.el-submenu .el-submenu__title:hover {
  background-color: #2bccce !important;
}
.el-menu-item:hover {
  background-color: #2bccce !important;
}
</style>
