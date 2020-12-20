<template>
  <div class="pa-6 text-center">
    <h1 class="text-sm-large">
      {{ $t("DON'T PANIC.") }}
    </h1>
    <p v-if="!isDevMode">
      {{ $t("Something went wrong") }} 😧
      <br />
      <i18n path="Please email {contactEmail} for help.">
        <template v-slot:contactEmail>
          <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
        </template>
      </i18n>
    </p>
    <template v-else>
      <i18n
        path="Failed to connect to the server. Please make sure you have set the {serverApiKey}."
        tag="p"
        class="mb-0"
      >
        <template v-slot:serverApiKey>
          <a href="https://github.com/xrnl/aginun#install" target="_blank">{{
            $t("server API key")
          }}</a>
        </template>
      </i18n>
      <i18n
        path="If the problem persists please contact {contactEmail}."
        tag="p"
      >
        <template v-slot:contactEmail>
          <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
        </template>
      </i18n>
    </template>
  </div>
</template>

<script>
import { contactEmail } from "@/constants/contacts";

export default {
  name: "ErrorPage",
  data: () => ({
    contactEmail,
    isDevMode: process.env.NODE_ENV !== "production"
  })
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
