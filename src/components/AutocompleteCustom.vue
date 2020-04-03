<template>
  <v-autocomplete
    :value="value"
    :items="items"
    item-value="id"
    item-text="title"
    chips
    small-chips
    multiple
    class="mt-3"
    :label="label"
    @change="$emit('change', $event)"
  />
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
      required: true,
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
