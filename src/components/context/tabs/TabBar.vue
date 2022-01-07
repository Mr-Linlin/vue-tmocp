<template>
  <div class="tarbar">
    <ul class="tab-ul">
      <li
        v-for="(item, index) in titleTab"
        :key="index"
        :class="{ 'active': index == currentIndex }"
        @click="CutIndex(index, item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TarBar",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    titleTab: { type: Array },
  },
  methods: {
    CutIndex(index, name) {
      this.currentIndex = index;
      this.$emit("classifyNameClick", { index, name });
    },
  },
};
</script>

<style scoped>
.tab-ul {
  display: flex;
  list-style: none;
}
.tab-ul li {
  position: relative;
  padding: 0 14px;
  cursor: pointer;
  color: #ccc;
}
.active {
  color: #000 !important;
  /* background: red; */
}
</style>