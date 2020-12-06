<template>
  <div class="grid-list" :style="listStyle">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    itemWidth: {
      type: String,
      default: "260px"
    },
    itemHeight: {
      type: String,
      default: "180px"
    },
    gap: {
      type: String,
      default: "1rem"
    }
  },
  computed: {
    listStyle() {
      return {
        gridTemplateColumns: `repeat(auto-fill,${this.itemWidth})`,
        gridAutoRows: `minmax(${this.itemHeight}, max-content)`,
        gridGap: this.gap
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.grid-list {
  display: grid;
  align-items: start;
  justify-content: center;
  margin: 3rem;
}
</style>
