<template>
  <div class="tree">
    <ul class="lzt-tree" v-for="(item, index) in newData" :key="index">
      <li>
        <div class="fold" @click="unfold(index)">
          <span class="tree-icon" v-if="item.fold">
            <i class="el-icon-arrow-down"></i>
          </span>
          <span class="tree-icon" v-else>
            <i class="el-icon-arrow-right"></i>
          </span>
          <span class="tree-content">{{ item.chaptername }}</span>
        </div>
        <div class="fold-child" v-if="item.fold">
          <ul
            class="children-tree"
            v-for="(treeItem, i) in item.children"
            :key="i"
            @click="routeTree(treeItem.chapterurl, treeItem.id)"
          >
            <li>
              <span class="child-content">
                <i
                  class="iconlzt icon-lzt-24gf-play"
                  style="margin-right: 5px"
                ></i>
                {{ treeItem.chaptername }}
              </span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LztTree",
  props: {
    trees: {
      type: Array,
    },
  },
  methods: {
    unfold(index) {
      for (const key in this.trees) {
        if (this.trees[key] == this.trees[index]) {
          this.trees[index].fold = !this.trees[index].fold;
        } else {
          this.trees[key].fold = false;
        }
      }
    },
    routeTree(url, id) {
      this.$emit("routeTree", { url: url + "", id: id });
    },
  },
  computed: {
    newData() {
      if (this.trees == undefined) return [];
      for (const item of this.trees) {
        this.$set(item, "fold", "");
      }
      return this.trees;
    },
  },
};
</script>

<style scoped>
.tree {
  overflow-x: hidden;
}
.tree-icon {
  margin-right: 10px;
}
.lzt-tree {
  margin-bottom: 15px;
}
ul {
  list-style: none;
}
.tree-content {
  font-size: 16px;
  font-weight: 600;
  color: #000;
}
.children-tree {
  height: 40px;
  line-height: 40px;
  background: rgb(243, 245, 247);
  margin-top: 10px;
}
.children-tree:hover {
  background: tan;
  color: #fff;
}
.child-content {
  display: block;
  height: 100%;
  padding-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}
.fold {
  cursor: pointer;
}
.children-tree {
  cursor: pointer;
}
</style>