<template>
  <v-container class="mt-6">
    <v-row align="center" justify="center">
      <v-col class="col-md-4 bee">
        <img src="@/assets/images/bee.svg" alt="Bee" />
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col class="col-md-4">
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
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "AboutPage",
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
<style lang="scss" scoped>
.bee {
  img {
    width: 100%;
  }
}
</style>
