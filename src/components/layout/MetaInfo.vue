<template>
  <dl class="detail">
    <dt class="detail term">
      {{ title }}
    </dt>
    <dd class="detail description">
      {{ description }}
    </dd>
  </dl>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  .detail {
    display: flex;
    flex-flow: column;
    margin: 0;
    padding: 0;
    &.term {
      font-weight: bold;
    }
    &.description {
    }
  }
</style>
