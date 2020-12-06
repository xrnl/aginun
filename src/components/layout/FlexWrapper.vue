<template>
  <div
    :class="
      `d-flex flex-${
        direction === 'column' ? 'column' : 'row'
      } justify-${justifyContent} ${classes}`
    "
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: "FlexWrapper",
  props: {
    direction: {
      validator: (value) => ["column", "row"].includes(value),
      default: "row"
    },
    justifyContent: { type: String, default: "flex-start" },
    classes: {
      type: String,
      default: ""
    }
  }
};
</script>
