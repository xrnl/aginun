<template>
  <dl class="detail">
    <dt class="detail term">
      {{ title }}
    </dt>
    <dd class="detail description">
      <ul v-if="Array.isArray(description)" class="mb-2">
        <li v-for="(item, i) of description" :key="i">
          {{ item }}
        </li>
      </ul>
      <p v-else>
        {{ description }}
      </p>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: [String, Array],
      required: true
    }
  },
  data() {
    return {};
  }
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
}
</style>
