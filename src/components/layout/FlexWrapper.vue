<template>
  <div
    :class="
      `d-flex flex-${direction === 'column' ? 'column' : 'row'} ${
        !!justifyContent ? justifyContent : null
      }`
    "
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "FlexWrapper",
  props: {
    direction: {
      validator: value => ["column", "row"].includes(value),
      default: "row"
    },
    justifyContent: { type: String }
  }
};
</script>
