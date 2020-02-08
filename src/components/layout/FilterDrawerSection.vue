<template>
  <div>
    <v-list-group>
      <template v-slot:activator>
        <v-list-item-title class="font-weight-bold">
          <slot name="title" />
        </v-list-item-title>
      </template>
      <v-list-item>
        <slot />
      </v-list-item>
    </v-list-group>
    <v-divider />
  </div>
</template>

<script>
export default {
  name: "TheFilterDrawerSection",
  data: () => ({})
};
</script>

<style lang="scss" scoped></style>
