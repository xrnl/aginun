<template>
  <div class="d-flex flex-column align-center">
    <p v-if="text">
      {{ text }}
    </p>
    <div id="spinner" ref="spinnerContainer"></div>
  </div>
</template>

<style scoped>
#spinner {
  width: 50px;
  height: 50px;
}
</style>

<script>
import { getThemeColor } from "@/utils/utilities.js";
import lottie from "lottie-web";
import animationData from "../assets/animations/data.json";

export default {
  name: "Spinner",
  mounted() {
    lottie.loadAnimation({
      container: this.$refs.spinnerContainer,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });
  },
  props: {
    themeColor: {
      type: String,
      default: "shade",
    },
    text: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  computed: {
    color() {
      return getThemeColor(this.$vuetify.theme, this.themeColor);
    },
  },
};
</script>
