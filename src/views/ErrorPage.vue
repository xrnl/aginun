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
import { isProduction } from "@/utils/isProduction";

export default {
  name: "ErrorPage",
  data: () => ({
    contactEmail,
    isDevMode: !isProduction()
  })
};
</script>
<style lang="scss">
.text-sm-large {
  @media #{map-get($display-breakpoints, "sm-and-up")} {
    font-size: 60px;
  }
}
</style>
