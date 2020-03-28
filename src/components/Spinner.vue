<template>
  <div class="d-flex flex-column align-center">
    <p v-if="text">
      {{ text }}
    </p>
    <scale-loader :loading="true" :color="themeColor(color)" :radius="1" />
  </div>
</template>

<script>
import { ScaleLoader } from "@saeris/vue-spinners";
import { mapGetters } from "vuex";

export default {
  name: "Spinner",
  components: {
    ScaleLoader,
  },
  props: {
    color: {
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
    ...mapGetters("styles", ["themeColor"]),
  },
};
</script>
