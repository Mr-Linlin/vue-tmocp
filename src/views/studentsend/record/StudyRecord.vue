<template>
  <div class="study-record">
    <el-card>
      <el-table :data="records" border="">
        <el-table-column label="序号" type="index" width="70">
        </el-table-column>
        <el-table-column
          label="课程名称"
          prop="courseid"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="已看章节"
          prop="haveseenchapter"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="未看章节"
          prop="notseenchapter"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="学习状态"
          prop="studystate"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="item">{{
            studystate[item.row.studystate]
          }}</template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getDataList } from "@/api/common";
import { mapGetters } from "vuex";
import { getDuration } from "@/utils/util";
export default {
  name: "StudyRecord",
  data() {
    return {
      records: [],
      queryInfo: {
        table: "tm_ocp_studyrecord",
      },
      studystate: {
        1: "学习中",
        2: "学习结束",
      },
    };
  },
  created() {
    this.getStudy(this.queryInfo);
  },
  methods: {
    async getStudy(table) {
      table.inmap = JSON.stringify({ userid: this.userInfo.id });
      let { code, data } = await getDataList(table);
      if (code !== 200) return this.$message.error("获取失败");
      this.records = data;
      let cids = [];
      for (const item of data) {
        cids.push(item.courseid);
      }
      let ids = cids.join(",");
      table.table = "tm_ocp_courseinfo";
      table.inmap = JSON.stringify({ id: ids });
    //   根据课程id拿到课程名
      getDataList(table).then(({ data }) => {
        for (const key in data) {
          if (data[key].id == this.records[key].courseid) {
            this.records[key].courseid = data[key].coursename;
          }
        }
      });
      table.table = "tm_ocp_chapter";
      table.inmap = JSON.stringify({ chaptercourseid: ids });
    //   根据课程id拿到课程章节
      let res = await getDataList(table);
      let duration=this.chapterduration(res.data);
      console.log(duration);
    },
    // 计算课程总时长
    chapterduration(data) {
      let results = data.filter((item) => item.chapterurl !== "");
      let durations = null;
      for (const item of results) {
        let n = item.chapterduration.split(":");
        // 获取视频时长
        let time = n[0] * 60 + parseInt(n[1]);
        durations += time;
      }
      return getDuration(durations);
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style lang="less" scoped>
</style>