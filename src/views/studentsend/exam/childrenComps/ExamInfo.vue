<template>
  <div class="exam-info">
    <div class="exam-main" ref="info">
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
            :ref="'choice' + index"
          >
            <div class="title-subject">
              <span class="num">{{ index + 1 }}</span>
              {{ item.problemmsg }}
            </div>
            <!-- 选项 -->
            <div class="exam-options">
              <el-radio-group v-model="answer.radioAnswer[index]">
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
              </el-radio-group>
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
            :ref="'judge' + index"
          >
            <div class="title-subject">
              <span class="num">{{ index + 1 }}</span>
              {{ item.problemmsg }}
            </div>
            <!-- 选项 -->
            <div class="exam-options">
              <el-radio-group v-model="answer.judgeAnswer[index]">
                <div class="radio">
                  <el-radio :label="item.judgea">{{ item.judgea }}</el-radio>
                </div>
                <div class="radio">
                  <el-radio :label="item.judgeb">{{ item.judgeb }}</el-radio>
                </div>
              </el-radio-group>
            </div>
          </div>
          <!-- 多选题 -->
          <div class="title-topic">
            <span
              >多选题,(每题{{ multiple.score }}分，共{{
                multiple.total
              }}题)</span
            >
          </div>
          <div
            class="exam-slide"
            v-for="(item, index) in multiple_choice"
            :key="item.id + 'dx'"
            :ref="'multiple' + index"
          >
            <div class="title-subject">
              <span class="num">{{ index + 1 }}</span>
              {{ item.problemmsg }}
            </div>
            <!-- 选项 -->
            <div class="exam-options">
              <el-checkbox-group v-model="answer.checkedAnswer[index]">
                <div class="radio">
                  <el-checkbox :label="item.optiona"></el-checkbox>
                </div>
                <div class="radio">
                  <el-checkbox :label="item.optionb"></el-checkbox>
                </div>
                <div class="radio">
                  <el-checkbox :label="item.optionc"></el-checkbox>
                </div>
                <div class="radio">
                  <el-checkbox :label="item.optiond"></el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
            <!-- 案例题 -->
          </div>
          <div class="title-topic">
            <span
              >案例题,(每题{{ problem.score }}分，共{{ problem.total }}题)</span
            >
          </div>
          <div
            class="exam-slide"
            v-for="(item, index) in case_problem"
            :key="item.id + 'al'"
            :ref="'problem' + index"
          >
            <div class="title-subject">
              <span class="num">{{ index + 1 }}</span>
              {{ item.problemmsg }}
            </div>
            <!-- 选项 -->
            <div class="text">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="answer.problemAnswer[index]"
              >
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
        <div class="title">
          <div class="title-icon"></div>
          <div class="title-content">答题卡</div>
        </div>
        <!-- 卡片内容 -->
        <div class="card-content-list">
          <div class="card-content">
            <div class="card-title">
              <span
                >单选题,(每题{{ choice.score }}分，共{{ choice.total }}题)</span
              >
            </div>
            <div class="box-list">
              <div
                class="card-item"
                v-for="(item, index) in single_choice"
                :key="item.id + 'l'"
                @click="anchorClick('choice', index)"
                :class="{ active: item.active }"
              >
                {{ index + 1 }}
              </div>
            </div>
            <div class="card-title">
              <span
                >判断题,(每题{{ judge.score }}分，共{{ judge.total }}题)</span
              >
            </div>
            <div class="box-list">
              <div
                class="card-item"
                v-for="(item, index) in questions"
                :key="item.id + 'k'"
                @click="anchorClick('judge', index)"
                :class="{ active: item.active }"
              >
                {{ index + 1 }}
              </div>
            </div>
            <div class="card-title">
              <span
                >多选题,(每题{{ multiple.score }}分，共{{
                  multiple.total
                }}题)</span
              >
            </div>
            <div class="box-list">
              <div
                class="card-item"
                v-for="(item, index) in multiple_choice"
                :key="item.id + 'd'"
                @click="anchorClick('multiple', index)"
                :class="{ active: item.active }"
              >
                {{ index + 1 }}
              </div>
            </div>
            <div class="card-title">
              <span
                >案例题,(每题{{ problem.score }}分，共{{
                  problem.total
                }}题)</span
              >
            </div>
            <div class="box-list">
              <div
                class="card-item"
                v-for="(item, index) in case_problem"
                :key="item.id + 'a'"
                @click="anchorClick('problem', index)"
                :class="{ active: item.active }"
              >
                {{ index + 1 }}
              </div>
            </div>
            <!-- 题目状态 -->
            <div class="sheet-state">
              <div class="state-not"><span class="stateIcon"></span>未做</div>
              <div class="state-have"><span class="stateIcon"></span>已做</div>
              <div class="state-tag"><span class="stateIcon"></span>标记</div>
            </div>
            <div class="commit">
              <el-button type="success" @click="commitExam">交卷</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getExamTopic, ExamInfo, CommitExam } from "@/api/common";
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
        uid: "",
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
      multiple: {
        score: 0,
        total: 0,
      },
      show: false,
      papernum: "", //试卷编号
      minues: "00",
      seconds: "00",
      scroll: 0,
      answer: {
        radioAnswer: [], //单选题
        checkedAnswer: [], //多选题
        judgeAnswer: [], //判断题
        problemAnswer: [], //案例题
      }, //存储答案
    };
  },
  created() {
    this.queryInfo.papergroup = this.examInfo.papertype;
    this.queryInfo.subjectpaper = this.examInfo.paperquestionstype;
    this.getRandomInfo(this.queryInfo);
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
    async getRandomInfo(query) {
      query.uid = this.userInfo.id;
      let { data } = await getExamTopic(query);
      this.papernum = data;
      let {
        code,
        singlechoicenum,
        multiplechoicenum,
        judgesubjectnum,
        casesubjectnum,
      } = await ExamInfo({ papernum: data });
      if (code !== 200) return this.$message.error("获取试卷信息失败！");
      this.case_problem = casesubjectnum;
      this.problem.score = casesubjectnum[0].subjectscore;
      this.problem.total = casesubjectnum.length;

      this.single_choice = singlechoicenum;
      this.choice.score = singlechoicenum[0].subjectscore;
      this.choice.total = singlechoicenum.length;

      this.questions = judgesubjectnum;
      this.judge.score = judgesubjectnum[0].subjectscore;
      this.judge.total = judgesubjectnum.length;

      this.multiple_choice = multiplechoicenum;
      this.multiple.score = multiplechoicenum[0].subjectscore;
      this.multiple.total = multiplechoicenum.length;
      for (let key in this.multiple_choice) {
        //动态生成的el-checkbox-group的v-model绑定问题
        this.$set(this.answer.checkedAnswer, key, []);
      }
    },
    // 监听滚动条位置，当滚动到一定位置将答题卡变为固定定位
    handleScroll() {
      this.scroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (this.scroll > 30) {
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
    // 点击之后到达对应题目的我坐标
    anchorClick(type, index) {
      let refName = type + index;
      let top = this.$refs[refName][0].offsetTop;
      //   document.documentElement.scrollTop = top + 30;
      window.scrollTo({
        top: top + 30,
        behavior: "smooth",
      });
    },
    // 当选择答案后改变答题卡的状态
    setActive(answers, data) {
      for (const i in answers) {
        if (answers[i] !== undefined) {
          data[i].active = true;
        }
      }
    },
    // 当选择多选题答案后改变答题卡的状态
    setMultipleActive(answers, data) {
      for (let key in this.multiple_choice) {
        if (answers[key][0] !== undefined && answers[key][0] !== "") {
          data[key].active = true;
        } else {
          data[key].active = false;
        }
      }
    },
    // 点击提交试卷
    commitExam() {
      // 判断当前还有多少道题没有答完
      let results =
        this.single_choice.length -
        this.answer.radioAnswer.filter((item) => item !== undefined).length +
        this.questions.length -
        this.answer.judgeAnswer.filter((item) => item !== undefined).length +
        this.multiple_choice.length -
        this.answer.checkedAnswer.filter((item) => item !== undefined).length +
        this.case_problem.length -
        this.answer.problemAnswer.filter((item) => item !== undefined).length;
      let msg = "";
      if (results !== 0) {
        msg = `当前还有${results}道题没有答完，是否提交试卷？`;
      } else {
        msg = "是否提交试卷？";
      }
      this.$confirm(msg, "提示", {
        confirmButtonText: "提交",
        cancelButtonText: "取消",
        iconClass: "iconlzt icon-lzt-wenhao",
      })
        .then(() => {
          // 拿到所有成绩提交到后台进行打分
          let radioanswernew = [],
            judgeanswernew = [],
            multipleanswernew = [],
            problemanswernew = [];
          this.single_choice.forEach((item, index) => {
            let answer = {
              id: item.id,
              answer:
                this.answer.radioAnswer[index] != undefined
                  ? this.answer.radioAnswer[index]
                  : "",
            };
            radioanswernew.push(answer);
          });
          this.questions.forEach((item, index) => {
            let answer = {
              id: item.id,
              answer:
                this.answer.judgeAnswer[index] != undefined
                  ? this.answer.judgeAnswer[index]
                  : "",
            };
            judgeanswernew.push(answer);
          });

          this.case_problem.forEach((item, index) => {
            let answer = {
              id: item.id,
              answer:
                this.answer.problemAnswer[index] != undefined
                  ? this.answer.problemAnswer[index]
                  : "",
            };
            problemanswernew.push(answer);
          });

          this.multiple_choice.forEach((item, index) => {
            let answer = {
              id: item.id,
              answer: this.answer.checkedAnswer[index].join(","), //把多选题的答案转换成逗号分隔的字符串
            };
            multipleanswernew.push(answer);
          });
          let query = {};
          query.papernum = this.papernum;
          query.userid = this.userInfo.id;
          query.radioanswernew = JSON.stringify(radioanswernew);
          query.judgeanswernew = JSON.stringify(judgeanswernew);
          query.multipleanswernew = JSON.stringify(multipleanswernew);
          query.problemanswernew = JSON.stringify(problemanswernew);
          CommitExam(query).then((res) => {
            if(res.code!==200)return this.$message.error('提交试卷失败！')
            this.$message.success(`你的成绩为${res.totalscore}分`)
          });
        })
        .catch(() => {});
    },
  },
  computed: {
    ...mapGetters(["examInfo", "userInfo"]),
  },
  watch: {
    // "answer.radioAnswer": {
    //   handler(val) {
    //     console.log(val);
    //   },
    // },
    answer: {
      deep: true,
      handler(val) {
        // 监听题目状态
        this.setActive(val.radioAnswer, this.single_choice);
        this.setMultipleActive(val.checkedAnswer, this.multiple_choice);
        this.setActive(val.judgeAnswer, this.questions);
        this.setActive(val.problemAnswer, this.case_problem);
      },
    },
  },
};
</script>

<style lang="less" scoped>
.exam-info {
  padding-right: -17px;
}
.exam-main {
  position: relative;
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
  height: 830px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .refer-time {
    height: 59px;
    line-height: 59px;
    border-bottom: 1px solid #eef0f2;
    text-align: center;
    color: rgb(255, 0, 0);
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 15px;
  }
  .title {
    display: flex;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 800;
    color: #000;
    height: 21px;
    line-height: 21px;
  }
  .title-icon {
    width: 4px;
    background: red;
    margin-top: 1px;
    margin-right: 10px;
  }
  .card-content {
    margin-left: 10px;
    .card-title {
      font-size: 12px;
      color: #27274a;
      font-weight: 600;
      padding-bottom: 12px;
      padding-top: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .box-list {
      display: flex;
      flex-wrap: wrap;
      .card-item {
        width: 32px;
        height: 30px;
        border: 1px solid rgba(#ccc, 0.5);
        border-radius: 5px;
        line-height: 30px;
        text-align: center;
        margin-bottom: 5px;
        margin-right: 5px;
        cursor: pointer;
      }
    }
    .sheet-state {
      display: flex;
      justify-content: center;
      margin: 30px 0;
      height: 14px;
      font-size: 12px;
      .stateIcon {
        border: 1px solid #dcdfe6;
        background: #ffffff;
        width: 10px;
        height: 10px;
        display: inline-block;
        margin-right: 5px;
      }
      .state-have {
        margin-left: 5px;
        .stateIcon {
          border: 0;
          background: rgb(64, 158, 255);
        }
      }

      .state-tag {
        margin-left: 5px;
        .stateIcon {
          border: 0;
          background: rgb(244, 170, 142);
        }
      }
    }
    .commit {
      text-align: center;
      .el-button {
        width: 150px !important;
        background: rgb(33, 170, 40);
      }
    }
  }
}
.indexes-fixed {
  position: fixed;
  top: 0;
  right: 18%;
}
.active {
  background: rgb(64, 158, 255);
  color: #fff;
}
</style>