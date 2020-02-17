<template>
  <v-autocomplete
    :items="items"
    chips
    multiple
    small-chips
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
      label: {
        type: String,
        required: true,
      },
    },
    data: () => ({}),
    // methods: {
    //   itemSelected(item) {
    //     console.log("Selected item!", item.id);
    //   },
    //   itemClicked(item) {
    //     console.log("Clicked item!", item);
    //   }
    // }
  };
</script>

<style lang="scss" scoped></style>
