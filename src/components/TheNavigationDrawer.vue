<template>
  <v-navigation-drawer
    app
    :mobile-break-point="this.$vuetify.breakpoint.thresholds.sm"
    color="relief"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>

<script>
  export default {
    name: "TheNavigationDrawer",
    props: {
      value: {
        required: true,
        validator: value => typeof value === "boolean" || value === null
      }
    },
    data: () => ({

    }),
    methods: {
      test: function (event) {
        console.log(event)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
