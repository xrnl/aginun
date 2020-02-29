<template>
  <v-autocomplete
    :value="value"
    :items="items"
    chips
    small-chips
    multiple
    class="mt-3"
    :label="label"
    @change="$emit('change', $event)"
  >
    <!-- <template v-slot:selection="data">
      <v-chip
        close
        color="primary"

      >
        {{ data }}
      </v-chip>
    </template>-->
  </v-autocomplete>
</template>

<script>
export default {
  name: "AutocompleteCustom",
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
    label: {
      type: String,
      required: true,
    },
  },
  data: () => ({}),
};
</script>

<style lang="scss" scoped></style>
