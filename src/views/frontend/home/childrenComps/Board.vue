<template>
  <div class="board">
    <div class="board-box">
      <div class="top-title">
        <div class="tilte">
          <span><i :class="title.icon"></i>{{ title.title }}</span>
        </div>
        <div class="more">
          <span>{{ title.more }}<i class="el-icon-d-arrow-right"></i></span>
        </div>
      </div>
      <div class="board-scroll" :style="{ height: height * lineNum + 'px' }">
        <ul
          class="board-content"
          :style="{ transform: transform }"
          :class="{ rollScreen: num === 0 }"
        >
          <li
            class="new-item"
            v-for="(item, index) in newinfos"
            :key="index + 'news'"
            :style="{ height: height + 'px', 'line-height': height + 'px' }"
          >
            <div class="newtitle">{{ item.newtitle }}</div>
            <div class="newvicetitle">{{ item.newvicetitle }}</div>
            <div class="time">{{ item.releasetime }}</div>
          </li>
          <li
            class="new-item"
            v-for="(item, index) in newinfos"
            :key="index + newinfos.length"
            :style="{ height: height + 'px', 'line-height': height + 'px' }"
          >
            <div class="newtitle">{{ item.newtitle }}</div>
            <div class="newvicetitle">{{ item.newvicetitle }}</div>
            <div class="time">{{ item.releasetime }}</div>
          </li>
          <li
            class="new-item"
            v-for="(item, index) in newinfos"
            :key="index + newinfos.length+'l'"
            :style="{ height: height + 'px', 'line-height': height + 'px' }"
          >
            <div class="newtitle">{{ item.newtitle }}</div>
            <div class="newvicetitle">{{ item.newvicetitle }}</div>
            <div class="time">{{ item.releasetime }}</div>
          </li>
           <li
            class="new-item"
            v-for="(item, index) in newinfos"
            :key="index + newinfos.length+'t'"
            :style="{ height: height + 'px', 'line-height': height + 'px' }"
          >
            <div class="newtitle">{{ item.newtitle }}</div>
            <div class="newvicetitle">{{ item.newvicetitle }}</div>
            <div class="time">{{ item.releasetime }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Board",
  data() {
    return {
      timer: null,
      time: 2000,
      num: 0,
    };
  },
  created() {},
  mounted() {
    this.getScroll();
  },
  props: {
    title: { type: Object },
    newinfos: { type: Array },
    height: { type: Number, default: 48 },
    lineNum: { type: Number, default: 4 },
  },
  methods: {
    // 无缝滚动
    getScroll() {
      this.timer = setInterval(() => {
        if (this.num !== this.newinfos.length) {
          this.num++;
        } else {
          this.num = 0;
        }
      }, 3000);
    },
  },
  computed: {
    // 计算每次滚动高度
    transform() {
      return "translateY(-" + this.num * this.height + "px)";
    },
  },
};
</script>

<style lang="less" scoped>
.board-box {
  width: 100%;
  height: 250px;
  box-shadow: 1px 1px 5px rgba(100, 100, 100, 0.5);
}
.top-title {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  .tilte {
    border-bottom: 3px solid rgb(241, 16, 18);
    color: rgb(241, 16, 18);
    font-weight: 600;
    i {
      margin-right: 5px;
    }
    span {
      margin-left: 10px;
    }
  }
  .more {
    margin-right: 15px;
    font-size: 14px;
    color: #ccc;
    cursor: pointer;
  }
  .more:hover {
    color: rgb(241, 16, 18);
  }
}
.board-scroll {
  // height: 210px;
  overflow: hidden;
  .board-content {
    transition: 0.5s linear;
    .new-item {
      display: flex;
      justify-content: space-between;
      width: 568px;
      border-bottom: 1px solid #ccc;
      padding: 0 15px;
      cursor: pointer;
      .newtitle,
      .newvicetitle {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .newtitle {
        width: 120px;
      }
      .newvicetitle {
        flex: 1;
      }

      .time {
        width: 120px;
      }
    }
    .new-item:hover {
      background: rgba(#ccc, 0.5);
    }
  }
}
.rollScreen {
  transition: none;
}
</style>