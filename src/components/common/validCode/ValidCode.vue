<template>
  <div
    class="valid-code"
    :style="`width:${width};height:${height};line-height:${height}`"
    @click="createCode"
  >
    <span v-for="(item, index) in codeList" :key="index" :style="getStyle(item)">{{item.code}}</span>
  </div>
</template>

<script>
export default {
  name: "ValidCode",
  props: {
    width: {
      type: String,
      default: "100px",
    },
    height: {
      type: String,
      default: "40px",
    },
    length: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      codeList: [],
      code:[]
    };
  },
  mounted() {
    //   生层随机验证码
    this.createCode();
  },
  methods: {
    //   生成随机验证码
    createCode() {
      let len = this.length,
        codeList = [],
        chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
        charsLen = chars.length;
      for (let i = 0; i < len; i++) {
        let rgb = [
          Math.round(Math.random() * 220),
          Math.round(Math.random() * 240),
          Math.round(Math.random() * 200),
        ];
        codeList.push({
          code: chars.charAt(Math.floor(Math.random() * charsLen)),
          color: `rgb(${rgb})`,
          fontSize: `1${[Math.floor(Math.random() * 10)]}px`,
          padding: `${[Math.floor(Math.random() * 10)]}px`,
          transform: `rotate(${
            Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)
          }deg)`,
        });
      }
      this.codeList = codeList;
      for (const item of codeList) {
          this.code.push(item.code)
      }
    },
    // 文字样式
    getStyle(data) {
      return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`;
    },
  },
};
</script>

<style lang="less" scoped>
.valid-code {
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}
</style>