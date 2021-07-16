<template>
  <v-app>
    <feedback-alert />
    <nav-bar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import FeedbackAlert from "@/components/FeedbackAlert.vue";

export default {
  name: "App",
  components: {
    NavBar,
    FeedbackAlert
  },
  data: () => ({
    drawer: null // vuetify determines initial state based on screen size
  })
};
</script>

<style lang="scss" scoped></style>
