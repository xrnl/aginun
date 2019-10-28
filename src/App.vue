<template>
  <v-app>
    <the-navigation-drawer
      v-model="drawer"
    />
    <v-app-bar
      app
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click.stop="toggleDrawer"
      />
      <v-toolbar-title>Set title here</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click="toggleDarkMode"
      >
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import TheNavigationDrawer from '@/components/TheNavigationDrawer.vue'

export default {
  name: "App",
  components: {
    TheNavigationDrawer
  },
  data: () => ({
    drawer: null, // vuetify determines initial state based on screen size
  }),
  methods: {
    toggleDrawer: function () {
      this.drawer = !this.drawer
    },
    toggleDarkMode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
};
</script>
