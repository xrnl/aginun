<template>
  <div class="container container--md container--margin-top">
    <div class="row">
      <div class="row__image">
        <img src="@/assets/images/tree.svg" alt="Tree" />
      </div>
      <div class="row__content">
        <h2>{{ $t("For help and feedback contact us via:") }}</h2>
        <icon-link
          :href="`mailto:${contactEmail}`"
          :link-text="contactEmail"
          :label="$t('Email')"
          icon="mdi-email"
        />
        <icon-link
          href="https://organise.earth/xr-netherlands/messages/@vacancies_support_xrnl"
          link-text="@vacancies_support_xrnl"
          :label="$t('Mattermost')"
          icon="mdi-message"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IconLink from "@/components/IconLink";
import { contactEmail } from "@/constants/contacts";

export default {
  name: "ErrorPage",
  components: {
    IconLink
  },
  data: () => ({
    contactEmail,
    isDevMode: process.env.NODE_ENV !== "production"
  })
};
</script>
