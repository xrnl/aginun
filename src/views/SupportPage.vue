<template>
  <v-container class="mt-6">
    <v-row align="center" justify="center">
      <v-col class="col-md-4">
        <img src="@/assets/images/tree.svg" alt="Tree" />
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col class="col-md-4">
        <h2>{{ $t("For help and feedback contact us via:") }}</h2>
        <icon-link
          :href="`mailto:${contactEmail}`"
          :link-text="contactEmail"
          :label="$t('Email')"
          icon="mdi-email"
        />
        <icon-link
          href="https://organise.earth/xr-netherlands/messages/@vacancies_support_xrnl"
          :link-text="mattermostId"
          :label="$t('Mattermost')"
          icon="mdi-message"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import IconLink from "@/components/IconLink";
import { contactEmail, mattermostId } from "@/constants/contacts";

export default {
  name: "SupportPage",
  components: {
    IconLink
  },
  data: () => ({
    contactEmail,
    mattermostId
  })
};
</script>
