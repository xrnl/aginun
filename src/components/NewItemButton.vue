<template>
  <icon-button
    color="primary"
    icon="mdi-plus"
    text="New role"
    @click="$emit('click')"
  />
</template>

<script>
import IconButton from "@/components/IconButton.vue";

export default {
  name: "NewItemButton",
  components: {
    IconButton,
  },
};
</script>
