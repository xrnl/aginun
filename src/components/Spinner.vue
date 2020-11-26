<template>
  <div class="d-flex flex-column align-center">
    <p v-if="text">
      {{ text }}
    </p>
    <scale-loader :loading="true" :color="color" :radius="1" />
  </div>
</template>

<script>
import { ScaleLoader } from "@saeris/vue-spinners";
import getThemeColor from "@/utils/getThemeColor";

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
  },
  computed: {
    color() {
      return getThemeColor(this.$vuetify.theme, this.themeColor);
    }
  }
};
</script>
