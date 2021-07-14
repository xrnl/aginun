<template>
  <main>
    <feedback-alert />
    <the-app-bar />
    <router-view />
  </main>
</template>

<script>
import TheAppBar from "@/components/TheAppBar.vue";
import FeedbackAlert from "@/components/FeedbackAlert.vue";

export default {
  name: "App",
  components: {
    TheAppBar,
    FeedbackAlert
  },
  data: () => ({
    drawer: null
  })
};
</script>

<style lang="scss" scoped></style>
