<template>
  <div class="container container--md container--margin-top">
    <div class="row">
      <div class="row__image">
        <img src="@/assets/images/bee.svg" alt="Bee" />
      </div>
      <div class="row__content">
        <h2>{{ $t("Get to know our techteam and contribute") }}</h2>
        <p>
          {{ $t("Check out our guidelines") }}
          <a href="https://github.com/xrnl/aginun/blob/master/CONTRIBUTING.md">
            {{ $t("here") }}
          </a>
        </p>
        <p>
          {{ $t("This is a project started by") }}
          <a :href="xrNLWebsiteUrl" target="_blank">
            Extinction Rebellion NL
          </a>
          {{
            $t(
              "The goal of this project is to connect fellow rebels. We do this by creating a clear overview of available roles within different circles."
            )
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { contactEmail } from "@/constants/contacts";
export default {
  name: "AboutPage",
  data: () => ({
    contactEmail,
    isDevMode: process.env.NODE_ENV !== "production"
  }),
  computed: {
    xrNLWebsiteUrl: function() {
      const url =
        "https://extinctionrebellion.nl" +
        (this.$i18n.locale === "en" ? "/en" : "");
      return url;
    }
  }
};
</script>
