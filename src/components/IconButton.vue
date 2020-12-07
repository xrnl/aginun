<template>
  <v-btn :color="themeColor" @click.stop="$emit('click')">
    <v-icon>
      {{ icon }}
    </v-icon>
    {{ text }}
  </v-btn>
</template>

<script>
import themeColorNames from "@/constants/themeColors";
import { iconValidator } from "@/utils/validators";

export default {
  name: "IconButton",
  props: {
    themeColor: {
      type: String,
      required: true,
      validator: (themeColor) => themeColorNames.includes(themeColor)
    },
    icon: {
      type: String,
      required: true,
      validator: iconValidator
    },
    text: {
      type: String,
      required: true
    }
  }
};
</script>
