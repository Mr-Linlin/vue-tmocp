<template>
  <el-card> 用户 </el-card>
</template>

<script>
import { getUserList } from "@/api/user";
export default {
  name: "UserList",
  data() {
    return {
      table:'tm_ocp_user'
    };
  },
  created(){
    this.getUserList(this.table)
  },

  methods:{
    /**
     * 网络请求
     */
    // 获取用户列表
    async getUserList(table){
      let formData = new FormData()
      formData.append('table',table)
     let res = await getUserList(formData)
     console.log(res);
    }
  },
};
</script>

<style  lang="less">
</style>