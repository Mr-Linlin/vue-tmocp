<template>
  <el-card>
    <!--      搜索与添加区域-->
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <el-input
          @keyup.enter.native="query"
          @clear="clear"
          placeholder="请输入支付流水号"
          v-model="queryInfo.payserialnumber"
          clearable
        >
          <el-button slot="append" icon="el-icon-search" @click="query"
            >搜索</el-button
          >
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="orderwater"
      border
      stripe
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
      style="width: 100%;margin-bottom:20px"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="majorordernum" label="订单编号"> </el-table-column>
      <el-table-column prop="payserialnumber" label="支付流水号">
      </el-table-column>
      <el-table-column prop="transactiontype" label="交易类型">
      </el-table-column>

      <el-table-column prop="paytype" label="支付方式"> </el-table-column>
      <el-table-column prop="parametermsg" label="通知参数"> </el-table-column>

      <!-- 状态 -->
      <el-table-column prop="transactionstate" label="交易状态" width="140">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.transactionstate === '1'">交易成功</el-tag>
          <el-tag type="warning" v-else>交易关闭</el-tag>
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
  name: "OrderWater",
  inject: ["reload"],
  data() {
    return {
      orderwater: [],
      total: 0,
      queryInfo: {
        table: "tm_ocp_paytran",
        payserialnumber: "",
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
  methods: {
    // 获取所有课程数据
    async getOrderList(table) {
      let { data } = await getOrderList(table);
      console.log(data);
      this.orderwater = data;
    },
    // 查询
    async query() {
      console.log(111);
      this.queryInfo.inmap = JSON.stringify({
        payserialnumber: this.queryInfo.payserialnumber,
      });
      let { data,count } = await getOrderList(this.queryInfo);
      console.log(data);
      this.orderwater = data;
      this.total = count
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
  },
};
</script>


<style lang="less" scoped>
.row {
  margin-bottom: 20px;
}
</style>