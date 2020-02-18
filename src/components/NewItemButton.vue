<template>
  <v-btn color="primary" @click.stop="$emit('click')">
    <v-icon>
      mdi-plus
    </v-icon>
    New role
  </v-btn>
</template>

<script>
export default {
  name: "NewItemButton",
};
</script>
