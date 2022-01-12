<template>
  <div class="study-video">
    <div class="course-content">
      <div class="video-file">
        <div class="player" ref="player"></div>
      </div>
      <!-- 目录 -->
      <div class="list-box">
        <lzt-tree :trees="sections" @routeTree="routeTree"/>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserList } from "@/api/user";
import { directoryTree } from "@/utils/treeChildren";
import LztTree from "@/components/common/tree/LztTree.vue";
export default {
  name: "StudyVideo",
  components: {
    LztTree,
  },
  data() {
    return {
      player: null,
      queryinfo: {
        table: "tm_ocp_chapter",
        inmap: "",
      },
      sections: [],
    };
  },
  created() {
    this.getSectionList(this.$route.query.id);
  },
  mounted() {
    this.initPlayer();
  },
  methods: {
    initPlayer() {
      this.player = new this.$Player({
        el: this.$refs.player,
        url: "http://r45kz1ucm.hn-bkt.clouddn.com/3-6%20Vue.use%E7%94%A8%E6%B3%95%E3%80%90%E6%9B%B4%E5%A4%9A%E8%B5%84%E6%BA%90%EF%BC%9A666java.com%E3%80%91.mp4",
        fluid: true,
        fitVideoSize: "fixWidth",
        cssFullscreen: true,
        keyShortcut: "off",
        ignores: ["progress"],
      });
    },
    // 拿到章节信息
    async getSectionList(id) {
      this.queryinfo.inmap = JSON.stringify({ chaptercourseid: id });
      let { code, data } = await getUserList(this.queryinfo);
      if (code !== 200) return this.$message.error("获取失败");
      this.sections = directoryTree(data, 0);
    },
    // 点击切换视频
    routeTree(item){
      this.player.src=item.url
      this.player.play()
    }
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