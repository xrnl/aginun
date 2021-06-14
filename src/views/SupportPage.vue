<template>
  <div>
    <v-container class="mt-6">
      <v-row align="center" justify="center">
        <v-col class="col-6 col-lg-4">
          <img src="@/assets/images/xr-logo-flora.svg" alt="XR logo flora" />
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col class="col-11 col-md-6 text-center">
          <h3>{{ $t("Support") }}</h3>
          <i18n
            path="If you have any questions or need support, send a message to {mattermostContact} on Mattermost"
            tag="p"
          >
            <template v-slot:mattermostContact>
              <a
                href="https://organise.earth/xr-netherlands/messages/@vacancies_support_xrnl"
                target="_blank"
                >{{ mattermostId }}</a
              >
            </template>
          </i18n>
          <h4 class="mt-6">{{ $t("Contact") }}</h4>
          <i18n
            path="For any more general questions, you can always contact us at {contactEmail}"
            tag="p"
            style="margin-bottom: 180px"
          >
            <template v-slot:contactEmail>
              <a :href="`mailto:${contactEmail}`" target="_blank"
                >welcome@extinctionrebellion.com</a
              >
            </template>
          </i18n>
        </v-col>
      </v-row>
    </v-container>
    <v-footer padless fixed class="py-3">
      <v-row align="center" justify="center" class="text-white bg-primary">
        <v-col class="col-auto">
          <v-icon class="text-white" size="35">mdi-github-circle</v-icon>
        </v-col>
        <v-col class="col-8 col-sm-auto pl-0">
          <i18n
            path="Want to contribute to our tech project? Check out our {githubPage}."
          >
            <template v-slot:githubPage>
              <a
                class="text-white d-none d-md-inline"
                href="https://github.com/xrnl/aginun"
                target="_blank"
                >{{ $t("Github Page") }}</a
              >
              <span class="text-white d-md-none">{{ $t("Github Page") }}</span>
            </template>
          </i18n>
        </v-col>
        <v-col class="col-12 pt-0 text-center d-md-none">
          <a
            class="v-btn v-btn--outlined rounded text-white"
            href="https://github.com/xrnl/aginun"
            target="_blank"
            >{{ $t("Go to Github") }}</a
          >
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import { contactEmail, mattermostId } from "@/constants/contacts";

export default {
  name: "SupportPage",
  data: () => ({
    contactEmail,
    mattermostId
  })
};
</script>
