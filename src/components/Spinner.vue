<template>
  <div class="d-flex flex-column align-center">
    <p v-if="text">
      {{ text }}
    </p>
    <scale-loader :loading="true" color="#14aa37" :radius="1" />
  </div>
</template>

<script>
import { ScaleLoader } from "@saeris/vue-spinners";

export default {
  name: "Spinner",
  components: {
    ScaleLoader
  },
  props: {
    themeColor: {
      type: String,
      default: "shade"
    },
    text: {
      type: String,
      required: false,
      default: undefined
    }
  }
};
</script>
