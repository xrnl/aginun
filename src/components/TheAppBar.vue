<template>
  <v-app-bar app :height="navbarHeight" flat class="bottom-border">
    <router-link class="logo-link" to="/about">
      <img
        src="@/assets/images/xr.svg"
        class="logo-link__icon img-fluid"
        :alt="$t('Logo')"
        width="48"
        height="48"
      />
    </router-link>
    <v-toolbar-title>
      <h2>{{ $t("Vacancies") }}</h2>
    </v-toolbar-title>
    <v-spacer />
    <v-btn v-if="!loggedIn" text @click.stop="login">
      {{ $t("Login") }}
    </v-btn>
    <v-btn v-else text @click.stop="logout">
      {{ $t("Logout") }}
    </v-btn>
    <v-btn text @click.stop="contactSupportDialog = true" class="mr-3">
      {{ $t("Support") }} <v-icon> mdi-help-circle-outline </v-icon>
    </v-btn>
    <language-select />
    <v-dialog v-model="contactSupportDialog" max-width="450">
      <v-card>
        <v-card-title class="headline">
          {{ $t("Need help?") }}
        </v-card-title>
        <v-card-text>
          {{ $t("For help and feedback contact us via:") }}
          <flex-wrapper direction="column">
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
          </flex-wrapper>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import IconLink from "@/components/IconLink";
import FlexWrapper from "@/components/layout/FlexWrapper";
import { mapGetters, mapActions } from "vuex";
import { contactEmail } from "@/constants/contacts";
import styles from "@/constants/styles";
import LanguageSelect from "@/components/LanguageSelect.vue";

export default {
  name: "TheAppBar",
  components: {
    IconLink,
    FlexWrapper,
    LanguageSelect
  },
  data: () => ({
    contactSupportDialog: false,
    contactEmail,
    navbarHeight: styles.navbarHeight
  }),
  computed: {
    ...mapGetters({
      loggedIn: "user/loggedIn"
    })
  },
  methods: {
    ...mapActions("user", ["logout"]),
    login() {
      //TODO: open login modal/page here

      const username = "kaj-dev";
      const password = "test";

      this.$store.dispatch("user/login", { username, password });
    }
  }
};
</script>

<style lang="scss" scoped>
.logo-link {
  display: flex;
  justify-self: center;
  align-items: center;
  &__icon {
    margin-right: 1rem;
  }
}
.bottom-border {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  &.theme--light {
    border-color: rgba(0, 0, 0, 0.12);
  }
  &.theme--dark {
    border-color: rgba(255, 255, 255, 0.12);
  }
}
</style>
