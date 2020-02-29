<template>
  <v-btn :color="color" @click.stop="$emit('click')">
    <v-icon>
      {{ icon }}
    </v-icon>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: "IconButton",
  props: {
    color: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
