<template>
  <div class="exam-info">
    <div class="exam-main">
      <!-- 试卷内容 -->
      <div class="exam-content">
        <div class="exam-title">
          {{ examInfo.papername }}
        </div>
        <div class="exam-notes">
          <div class="not-div">
            {{ `试卷总分：${examInfo.papertotalscore}分` }}
          </div>
          <div class="not-div">
            {{ `考试时长：${examInfo.papertime}分钟` }}
          </div>
          <div class="not-div">
            {{ `试卷类型：${examInfo.papertype}` }}
          </div>
        </div>
        <div class="container-exam">
          <!-- 单选题 -->
          <div class="title-topic">
            <span
              >单项选择题,(每题{{ choice.score }}分，共{{
                choice.total
              }}题)</span
            >
          </div>
          <div
            class="exam-slide"
            v-for="(item, index) in single_choice"
            :key="item.id"
          >
            <div class="title-subject">
              <span class="num">{{ index + 1 }}</span>
              {{ item.problemmsg }}
            </div>
            <!-- 选项 -->
            <div class="exam-options">
              <div class="radio">
                <el-radio :label="item.optiona">{{
                  `A.${item.optiona}`
                }}</el-radio>
              </div>
              <div class="radio">
                <el-radio :label="item.optionb">{{
                  `B.${item.optionb}`
                }}</el-radio>
              </div>
              <div class="radio">
                <el-radio :label="item.optionc">{{
                  `C.${item.optionc}`
                }}</el-radio>
              </div>
              <div class="radio">
                <el-radio :label="item.optiond">{{
                  `D.${item.optiond}`
                }}</el-radio>
              </div>
            </div>
          </div>
          <!-- 判断题 -->
          <div class="title-topic">
            <span>判断题,(每题{{ judge.score }}分，共{{ judge.total }}题)</span>
          </div>
          <div
            class="exam-slide"
            v-for="(item, index) in questions"
            :key="item.id + 'pd'"
          >
            <div class="title-subject">
              <span class="num">{{ index + 1 }}</span>
              {{ item.problemmsg }}
            </div>
            <!-- 选项 -->
            <div class="exam-options">
              <div class="radio">
                <el-radio :label="item.judgea">{{ item.judgea }}</el-radio>
              </div>
              <div class="radio">
                <el-radio :label="item.judgeb">{{ item.judgeb }}</el-radio>
              </div>
            </div>
          </div>
          <!-- 案例题 -->
          <div class="title-topic">
            <span
              >案例题,(每题{{ problem.score }}分，共{{ problem.total }}题)</span
            >
          </div>
          <div
            class="exam-slide"
            v-for="(item, index) in case_problem"
            :key="item.id + 'al'"
          >
            <div class="title-subject">
              <span class="num">{{ index + 1 }}</span>
              {{ item.problemmsg }}
            </div>
            <!-- 选项 -->
            <div class="text">
              <el-input type="textarea" :rows="3" placeholder="请输入内容">
              </el-input>
            </div>
          </div>
          <div style="height: 20px"></div>
        </div>
      </div>
      <!-- 答题卡 -->
      <div
        class="exam_indexes"
        :class="{ 'indexes-fixed': show }"
        ref="indexes"
      >
        <!-- 倒计时 -->
        <div class="refer-time">
          <i class="el-icon-time"></i> {{ `${minues}:${seconds}` }}
        </div>
        <!-- 答题卡 -->
        <!-- 题目状态 -->
      </div>
    </div>
  </div>
</template>

<script>
import { getExamTopic } from "@/api/user";
import { mapGetters } from "vuex";
export default {
  name: "ExamInfo",
  data() {
    return {
      case_problem: [], //案例题
      single_choice: [], //单选题
      questions: [], //判断题
      multiple_choice: [], //多选题
      queryInfo: {
        papergroup: "",
        subjectpaper: "",
      },
      choice: {
        score: 0,
        total: 0,
      }, //拿到单选题每题分数和总数量
      judge: {
        score: 0,
        total: 0,
      }, //拿到判断题的分数
      problem: {
        score: 0,
        total: 0,
      },
      show: false,
      minues: "00",
      seconds: "00",
    };
  },
  created() {
    this.queryInfo.papergroup = this.examInfo.papertype;
    this.queryInfo.subjectpaper = this.examInfo.paperquestionstype;
    this.getExamTopic(this.queryInfo);
  },
  mounted() {
    //   监听滚动条的位置
    window.addEventListener("scroll", this.handleScroll, true);
    this.countdown();
  },
  methods: {
    /**
     * 处理网络请求
     */
    async getExamTopic(query) {
      let {
        code,
        tmOcpChoicesubjectSet_singlechoice,
        tmOcpChoicesubjectSet_multiplechoice,
        tmOcpJudgesubjectSet,
        tmOcpCasesubjectSet,
      } = await getExamTopic(query);
      if (code !== 200) return this.$message.error("获取试卷信息失败！");
      this.case_problem = tmOcpCasesubjectSet;
      this.problem.score = tmOcpCasesubjectSet[0].subjectscore;
      this.problem.total = tmOcpCasesubjectSet.length;

      this.single_choice = tmOcpChoicesubjectSet_singlechoice;
      this.choice.score = tmOcpChoicesubjectSet_singlechoice[0].subjectscore;
      this.choice.total = tmOcpChoicesubjectSet_singlechoice.length;

      this.questions = tmOcpJudgesubjectSet;
      this.judge.score = tmOcpJudgesubjectSet[0].subjectscore;
      this.judge.total = tmOcpJudgesubjectSet.length;

      this.multiple_choice = tmOcpChoicesubjectSet_multiplechoice;
    },
    // 监听滚动条位置，当滚动到一定位置将答题卡变为固定定位
    handleScroll() {
      let scroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scroll > 30) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    // 倒计时
    countdown() {
      let time = this.examInfo.papertime * 60;
      setInterval(() => {
        if (time > 0) {
          time--;
          this.minues = parseInt(time / 60);
          this.seconds = parseInt(time % 60);
          this.minues = this.minues < 10 ? "0" + this.minues : this.minues;
          this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
        }
      }, 1000);
    },
  },
  computed: {
    ...mapGetters(["examInfo"]),
  },
};
</script>

<style lang="less" scoped>
.exam-info {
  padding-right: -17px;
}
.exam-main {
  display: flex;
  margin: 0 auto;
  margin-top: 30px;
  width: 1200px;
  justify-content: space-between;
}
.exam-content {
  width: 970px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .exam-title {
    text-align: center;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    font-weight: 600;
  }
  .exam-notes {
    display: flex;
    margin-bottom: 25px;
    justify-content: center;
    .not-div {
      margin-right: 35px;
    }
  }
  .container-exam {
    width: 910px;
    margin: 0 auto;
    .title-topic {
      padding-top: 10px;
      margin-bottom: 20px;
    }
    .exam-slide {
      width: 908px;
      margin: 0 auto;
      margin-bottom: 20px;
      border: 1px solid #f2f6fc;
      .title-subject {
        position: relative;
        text-indent: 28px;
        line-height: 1.8;
        padding: 15px 20px;
        background: #eef0f2;
        font-size: 16px;
        color: #303133;
        word-wrap: break-word;
        .num {
          display: block;
          position: absolute;
          left: 20px;
          top: 20px;
          width: 18px;
          height: 16px;
          text-align: center;
          line-height: 16px;
          border: 1px solid #c0c4cc;
          border-radius: 2px;
          font-size: 14px;
          color: #909399;
          text-indent: 0;
        }
      }
    }
    .exam-options {
      padding-left: 15px;
      .radio {
        height: 43px;
        line-height: 43px;
      }
    }
    .text {
      margin-top: 20px;
    }
  }
}
.exam_indexes {
  position: relative;
  width: 200px;
  height: 600px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .refer-time {
    height: 59px;
    line-height: 59px;
    border-bottom: 1px solid #eef0f2;
    text-align: center;
    color: rgb(255, 0, 0);
    font-weight: 500;
    font-size: 18px;
  }
}
.indexes-fixed {
  position: fixed;
  top: 0;
  right: 18%;
}
</style>