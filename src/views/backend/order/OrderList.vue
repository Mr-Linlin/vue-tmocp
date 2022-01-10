<template>
  <el-card>
    <!--      搜索与添加区域-->
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <el-input
          @keyup.enter.native="query"
          @clear="clear"
          placeholder="请输入订单号"
          v-model="queryInfo.courseordernum"
          clearable
        >
          <el-button slot="append" icon="el-icon-search" @click="query"
            >搜索</el-button
          >
        </el-input>
      </el-col>
      <!-- <el-col :span="4">
        <el-button type="primary" @click="oppenPopup(null)">添加用户</el-button>
      </el-col> -->
    </el-row>
    <el-table
      :data="order"
      border
      stripe
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
       style="width: 100%;margin-bottom:20px"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="userid" label="所属用户ID"> </el-table-column>
      <el-table-column prop="coursmajoreid" label="所属专业ID">
      </el-table-column>
      <el-table-column prop="courseordernum" label="订单号">
      </el-table-column>
      <el-table-column prop="paytype" label="支付类型" width="220">
      </el-table-column>
  
      <el-table-column prop="orderqrcodeurl" label="订单二维码链接"> </el-table-column>
          <!-- 状态 -->
      <el-table-column prop="orderstate" label="订单状态" width="140">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.orderstate === '1'">已完成</el-tag>
          <el-tag type="warning" v-else>未完成</el-tag>
        </template>
      </el-table-column>

    </el-table>
       <!--      分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.page"
      :page-sizes="[3, 7, 15, 20]"
      :page-size="queryInfo.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      backgroundf
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { getOrderList } from "@/api/order";
export default {
   name: "OrderList",
   inject:['reload'],
  data() {
    return {
      order: [],
      total:0,
      queryInfo: {
        table: "tm_ocp_order",
        courseordernum: "",
          page: 1,
        paging: true,
        limit: 3,
        orderarray: JSON.stringify([
          {
            id: "ASC",
          },
        ]),
      },
    };
  },
    created() {
    this.getOrderList(this.queryInfo);
  },
  methods:{
     // 获取所有课程数据
    async getOrderList(table) {
      let { data,count } = await getOrderList(table);
      console.log(data);
      this.order = data;
      this.total = count
    },
    // 查询
     async query() {
       console.log(111);
      this.queryInfo.inmap = JSON.stringify({
        courseordernum: this.queryInfo.courseordernum,
      });
      let { data } = await getOrderList(this.queryInfo);
      console.log(data);
      this.order = data;
    },
      clear() {
      this.queryInfo.inmap = "";
      this.getOrderList(this.queryInfo);
      this.reload();
    },
     //条数
    handleSizeChange(newSize){
      this.queryInfo.limit = newSize
      this.getOrderList(this.queryInfo)
    },
    //页码
    handleCurrentChange(newPage){
      this.queryInfo.page = newPage
      this.getOrderList(this.queryInfo)
    }
  }
  
};
</script>

<style lang="less" scoped>
.row {
  margin-bottom: 20px;
}
</style>