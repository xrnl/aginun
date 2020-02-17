<template>
  <div class="d-block">
    <h4>{{ title }}</h4>
    <span class="caption">
      {{ subtitle }}
    </span>
  </div>
</template>

<script>
  export default {
    name: "TitleSubtitle",
    props: {
      title: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style lang="scss" scoped></style>
