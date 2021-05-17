<template>
  <div class="grid-list">
    <slot />
  </div>
</template>
<script>
export default {
  props: {}
};
</script>
<style lang="scss" scoped>
.grid-list {
  display: grid;
  align-items: start;
  justify-content: center;
  margin: 2rem;
  grid-template-columns: repeat(auto-fill, 100%);
  grid-gap: 1rem;
  @media only screen and (min-width: 600px) {
    margin: 3rem;
    grid-template-columns: repeat(auto-fill, 260px);
    grid-auto-rows: minmax(180px, max-content);
  }
}
</style>
