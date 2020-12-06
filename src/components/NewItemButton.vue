<template>
  <icon-button
    theme-color="primary"
    icon="mdi-plus"
    :text="text"
    @click="$emit('click')"
  />
</template>

<script>
import IconButton from "@/components/IconButton.vue";

export default {
  name: "NewItemButton",
  components: {
    IconButton
  },
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>
