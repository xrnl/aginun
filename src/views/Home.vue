<template>
  <div class="container">
    <h1 class="capstitle">
      aginun
    </h1>
    <v-btn color="primary">
      test button
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.capstitle {
  font-family: "FUCXEDCAPS";
  color: var(--v-primary-base);
}
</style>

<script>

export default {
  methods: {
    breakpoint: function () {
      console.log(this.$vuetify)
    }
  }
};
</script>
