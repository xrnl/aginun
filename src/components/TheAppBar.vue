<template>
  <v-app-bar
    app
  >
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.smAndDown"
      @click.stop="$emit('toggleDrawer')"
    />
    <v-toolbar-title class="text-capitalize">
      {{ title }}
    </v-toolbar-title>
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
    computed: {
      title: function() {
        switch(this.$route.name) {
          case 'profile':
            // TODO: add once user functionality is enabled
            // If the user visiting is the current user show 'Home'
            // If it is a different user show username
            return ''
          case 'settings':
            return 'settings'
          case 'groups':
            return 'groups'
          case 'explore':
            return 'explore'
          case 'roles':
          case 'tasks':
            // conole.log(this.$store.)
            return this.$store.getters['groups/selected'].working
          default:
            return ''

        }
      }
    },
    methods: {
      toggleDarkMode: function () {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
