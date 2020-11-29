<template>
  <div class="pa-6 text-center">
    <h1 class="text-sm-large">
      DON'T PANIC.
    </h1>
    <p v-if="!isDevMode">
      Something went wrong 😧
      <br />
      Please email
      <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
      for help.
    </p>
    <p v-else>
      Failed to connect to the server. Please make sure you have
      <a href="https://github.com/xrnl/aginun#install">
        <!-- eslint-disable-next-line vue/html-closing-bracket-newline -->
        set the server API key</a
      >
      .
      <br />
      If the problem persists please contact
      <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
    </p>
  </div>
</template>

<script>
import { contactEmail } from "@/constants/contacts";

export default {
  name: "ErrorPage",
  data: () => ({
    contactEmail,
    isDevMode: process.env.NODE_ENV !== "production",
  }),
};
</script>
<style lang="scss">
@import "~vuetify/src/styles/settings/_variables";

.text-sm-large {
  @media #{map-get($display-breakpoints, "sm-and-up")} {
    font-size: 60px;
  }
}
</style>
