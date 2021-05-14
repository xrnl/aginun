<template>
  <v-autocomplete
    :items="items"
    :value="selectedItemsIds"
    item-value="id"
    :item-text="itemText"
    outlined
    chips
    small-chips
    deletable-chips
    multiple
    :hide-details="hideDetails"
    :label="label"
    @change="$emit('change', $event)"
  />
</template>

<script>
import { isArrayValid } from "@/utils/validators";

export default {
  name: "AutocompleteCustom",
  props: {
    hideDetails: {
      type: Boolean,
      required: false
    },
    items: {
      type: Array,
      required: true
      // TODO: handle validation with typescript types
      // validator: (items) => {
      //  const objectValidator = makeObjectValidator({
      //    id: "number",
      //    title: "string"
      //  });
      //  return isArrayValid(items, objectValidator);
      // }
    },
    selectedItemsIds: {
      type: Array,
      required: true,
      validator: (items) => isArrayValid(items, Number.isInteger)
    },
    label: {
      type: String,
      required: true
    },
    itemText: {
      type: [String, Array, Function],
      required: true
    }
  }
};
</script>
