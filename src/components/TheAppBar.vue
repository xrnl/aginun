<template>
  <v-app-bar app :height="navbarHeight" flat class="bottom-border">
    <v-spacer />
    <v-btn icon @click="toggleDarkMode">
      <v-icon>mdi-invert-colors</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { NavbarHeight } from "@/apollo/gql/other.gql";

export default {
  apollo: {
    navbarHeight: {
      query: NavbarHeight,
      update: data => data.navbarHeight,
    },
  },
  name: "TheAppBar",
  methods: {
    toggleDarkMode: function() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-border {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  &.theme--light {
    border-color: rgba(0, 0, 0, 0.12);
  }
  &.theme--dark {
    border-color: rgba(255, 255, 255, 0.12);
  }
}
</style>
