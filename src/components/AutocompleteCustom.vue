<template>
  <v-autocomplete
    :items="items"
    :value="selectedItemsIds"
    item-value="id"
    item-text="title"
    chips
    small-chips
    deletable-chips
    multiple
    class="mt-3"
    :label="label"
    @change="$emit('change', $event)"
  />
</template>

<script>
import { makeObjectValidator, isArrayValid } from "@/utils/validators";

export default {
  name: "AutocompleteCustom",
  props: {
    items: {
      type: Array,
      required: true,
      validator: (items) => {
        const objectValidator = makeObjectValidator({
          id: "number",
          title: "string"
        });
        return isArrayValid(items, objectValidator);
      }
    },
    selectedItemsIds: {
      type: Array,
      required: true,
      validator: (items) => isArrayValid(items, Number.isInteger)
    },
    label: {
      type: String,
      required: true
    }
  }
};
</script>
