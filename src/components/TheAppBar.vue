<template>
  <v-app-bar
    app
  >
    <v-spacer />
    <v-btn
      icon
      @click="toggleDarkMode"
    >
      <v-icon>mdi-invert-colors</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    name: "TheAppBar",
    methods: {
      toggleDarkMode: function () {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
