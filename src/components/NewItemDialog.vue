<template>
  <v-dialog :value="value" width="600px" @input="$emit('input', false)">
    <v-card>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="primary" text @click="$emit('input', false)">
          Cancel
        </v-btn>

        <v-btn color="primary" @click="$emit('input', false)">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewItemDialog",
  props: {
    value: {
      required: true,
      type: Boolean,
    },
  },
  data: () => ({}),
};
</script>

<style lang="scss" scoped></style>
