<template>
  <div>
    <div class="index_header">
      <div class="header_center">
        <div style="width: 60%; display: flex">
          <div style="width: 20%" @click="goHomeView">
            <a href="#" style="color: red">在线课程首页</a>
          </div>
          <div style="width: 20%"></div>
          <div style="width: 50%">
            <avatar :userInfo="userInfo" class="avatar"/>
          </div>
        </div>
        <div style="width: 20%; display: flex; text-align: center"></div>
      </div>
    </div>

    <div style="width: 80%; margin: 0 auto; margin-top: 20px">
      <el-tabs
        style="height: 800px"
        type="border-card"
        :tab-position="tabPosition"
        @tab-click="handleClick"
      >
        <el-tab-pane>
          <span slot="label"
            ><i class="el-icon-data-analysis"></i> 我的课程</span
          >
          我的课程
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-notebook-2"></i> 报名信息</span>
          我的报名信息
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"
            ><i class="el-icon-shopping-cart-2"></i> 我的订单</span
          >
          我的订单
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-user"></i> 个人信息</span>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/common/avatar/Avatar.vue";
import { mapGetters } from 'vuex';

/*个人中心*/
export default {
  name: "MyInfo",
  components: {
    Avatar,
  },
  data() {
    return {
      activeName: "second",
      tabPosition: "left",
    };
  },
  methods: {
    goHomeView() {
      this.$router.push({
        path: "/homeView",
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  computed:{
    ...mapGetters(['userInfo'])
  }
};
</script>

<style scoped>
.index_header {
  height: 50px;
  background: whitesmoke;
}

.header_center {
  width: 90%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  line-height: 50px;
  font-size: 15px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.avatar{
  position: absolute;
  right: 30px;
}
</style>
