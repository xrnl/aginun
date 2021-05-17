<template>
  <div class="pa-6 text-center">
    <h1 class="text-sm-large">
      {{ $t("DON'T PANIC.") }}
    </h1>
    <p v-if="!isDevMode">
      {{ $t("Something went wrong") }} 😧
      <br />
    </p>
    <i18n
      v-else
      path="The application made a failed request to the server."
      tag="p"
      class="mb-0"
    />
    <i18n path="Please email {contactEmail} for help.">
      <template v-slot:contactEmail>
        <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
      </template>
    </i18n>
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
