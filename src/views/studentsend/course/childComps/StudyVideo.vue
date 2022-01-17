<template>
  <div class="study-video">
    <div class="course-content">
      <div class="video-file">
        <div class="player" ref="player"></div>
      </div>
      <!-- 目录 -->
      <div class="list-box">
        <lzt-tree :trees="sections" @routeTree="routeTree" />
      </div>
    </div>
  </div>
</template>

<script>
import { getUserList, addObject, Updata } from "@/api/user";
import { directoryTree } from "@/utils/treeChildren";
import { getDuration } from "@/utils/util";
import { mapGetters } from "vuex";
import LztTree from "@/components/common/tree/LztTree.vue";
export default {
  name: "StudyVideo",
  components: {
    LztTree,
  },
  data() {
    return {
      timer: null,
      time: 0,
      timeOut: 3600,
      player: null,
      queryinfo: {
        table: "tm_ocp_chapter",
        inmap: "",
      },
      sections: [],
      addRecord: {
        table: "tm_ocp_chapterdurationrecord",
        userid: null,
        courseid: null,
        chapterid: null,
        totalduration: null,
        viewedduration: null,
        inmap: null,
      },
      url: "", //默认第一个视频
      urlList: [], //所有集数
      index: 0, //控制播放下一集的索引
    };
  },
  created() {
    this.addRecord.courseid = this.$route.query.id;
    this.getSectionList(this.$route.query.id);
    document.onmouseover = () => {
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.time = 0;
        this.init();
      }
    };
    document.onkeyup = () => {
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.time = 0;
        this.init();
      }
    };
    // 监听用户无点击暂停事件
    this.init();
  },
  methods: {
    // 当用户超过时间没有没有任何动静就暂停视频
    init() {
      let that = this;
      this.timer = setInterval(() => {
        this.time++;
        if (this.time >= this.timeOut) {
          that.player.pause();
          return clearInterval(this.timer);
        }
      }, 1000);
    },
    // 初始化视频插件
    initPlayer() {
      this.player = new this.$Player({
        el: this.$refs.player,
        url: this.url,
        fluid: true,
        fitVideoSize: "fixWidth",//限定宽度
        autoplay: true,
        // cssFullscreen: true,
        playbackRate: [0.5, 0.75, 1, 1.5, 2],//倍数选择
        defaultPlaybackRate: 1,//默认1倍数
        playNext: {
          urlList: this.urlList,
        },
        // keyShortcut: "off",
        // ignores: ["progress"],
        // disableProgress: true,//禁止拖动滚动条
      });
    },
    // 拿到章节信息
    async getSectionList(id) {
      this.queryinfo.inmap = JSON.stringify({ chaptercourseid: id });
      let { code, data } = await getUserList(this.queryinfo);
      this.addRecord.chapterid = data[1].id;
      if (code !== 200) return this.$message.error("获取失败");
      this.sections = directoryTree(data, 0);
      this.urlList = this.getUrlList(data);
      this.url = this.urlList[0];
      // 拿到章节信息后初始化插件
      this.initPlayer();
      // 监听视频播放结束后继续播放下一集
      this.player.on("ended", () => {
        // console.log(this.index);
        this.index++;
        if (this.index > this.urlList.length - 1) {
          this.index = 0;
        }
        this.player.src = this.url = this.urlList[this.index];
        this.player.play();
      });
      // 点击进入下一集
      this.player.on("playerNext", () => {
        this.index++;
        if (this.index > this.urlList.length - 1) {
          this.index = 0;
        }
        this.player.src = this.urlList[this.index];
      });
      // 监听数组的长度，当点击完所有集数后重新给urlList赋值
      this.player.on("urlListEnd", () => {
        console.log(111);
      });
    },
    // 离开时保存学习进度
    async getLearnProcess(obj) {
      // console.log(obj);
      obj.inmap = JSON.stringify({ chapterid: obj.chapterid });
      let { data } = await getUserList(obj);
      obj.viewedduration = getDuration(this.player.currentTime);
      obj.userid = this.userInfo.id;
      obj.totalduration = getDuration(this.player.duration);
      if (data.length === 0) {
        delete obj.inmap;
        return await addObject(obj);
      } else {
        obj.id = data[0].id;
        delete obj.inmap;
        // console.log(obj);
        await Updata(obj);
      }
    },
    // 点击切换视频
    routeTree(item) {
      this.index = this.urlList.findIndex((i) => i === item.url);
      console.log(this.index);
      this.player.src = this.urlList[this.index];
      this.player.play();
      this.addRecord.chapterid = item.id;
    },
    // 拿到所有url，可进行下一集自动播放
    getUrlList(data) {
      let usrList = [];
      let results = data.filter((item) => item.chapterurl !== "");
      for (const item of results) {
        usrList.push(item.chapterurl + "");
      }
      // console.log(usrList);
      return usrList;
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  beforeDestroy() {
    this.getLearnProcess(this.addRecord);
    // 离开是销毁定时器
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
.study-video {
  padding: 20px 30px;
}
.course-content {
  display: flex;
  height: 730px;
  .video-file {
    flex: 1;
    min-width: 800px;
    background: rgb(0, 0, 0);
    border-radius: 10px;
    margin-right: 20px;
  }
  .list-box {
    width: 320px;
    box-shadow: 1px 1px 10px rgba(100, 100, 100, 0.4);
    border-radius: 5px;
    padding: 15px;
  }
}
</style>