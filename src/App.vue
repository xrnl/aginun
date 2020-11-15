<template>
  <v-app>
    <feedback-alert />
    <the-app-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheAppBar from "@/components/TheAppBar.vue";
import FeedbackAlert from "@/components/FeedbackAlert.vue";

export default {
  name: "App",
  components: {
    TheAppBar,
    FeedbackAlert,
  },
  data: () => ({
    drawer: null, // vuetify determines initial state based on screen size
  }),
};
</script>

<style lang="scss" scoped></style>
