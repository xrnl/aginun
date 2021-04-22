<template>
  <div
    app
    flat
    class="bottom-border nav-bar"
  >
    <div class="nav-bar__left">
      <router-link
        class="logo-link"
        to="/about"
      >
        <img
          src="@/assets/images/xr.svg"
          class="logo-link__icon img-fluid"
          :alt="$t('Logo')"
          width="48"
          height="48"
        />
        <h2>{{ $t("Vacancies") }}</h2>
      </router-link>

    </div>

    <div class="nav-bar__right">



      <div
        class="nav-bar__hamburger"
        @click.stop="toggleNavigation"
      >
        <img
          src="@/assets/images/hamburger.svg"
          class="img-fluid"
          :alt="$t('Logo')"
          width="48"
          height="48"
        />
      </div>
      <div
        class="nav-bar__content"
        :class="{ active: mobileMenu }"
      >
        <div class="nav-bar__content__close" @click="closeNavigation">
          <img
            src="@/assets/images/close.svg"
            :alt="$t('Logo')"
            width="48"
            height="48"
          />
        </div>

        <!-- <v-toolbar-title>
        </v-toolbar-title> -->
        <v-spacer />
        <div>
          <language-select />
        </div>
        <router-link
          class="nav-link"
          to="/about"
        >{{ $t("About") }}</router-link>
        <router-link
          class="nav-link"
          to="/support"
        >{{ $t("Support") }}</router-link>
        <v-btn
          class="login-button"
          v-if="!loggedIn"
          outlined
          text
          @click.stop="login"
        >
          {{ $t("Login") }}
        </v-btn>
        <v-btn
          class="login-button"
          v-else
          text
          outlined
          @click.stop="logout"
        >
          {{ $t("Logout") }}
        </v-btn>
      </div>
    </div>

  </div>
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
    LanguageSelect,
  },
  data: () => ({
    contactSupportDialog: false,
    mobileMenu: false,
    contactEmail,
    navbarHeight: styles.navbarHeight,
  }),
  computed: {
    ...mapGetters({
      loggedIn: "user/loggedIn",
    }),
  },
  methods: {
    ...mapActions("user", ["logout"]),
    closeNavigation() {
      this.mobileMenu = false;
    },
    toggleNavigation() {
      this.mobileMenu = true;
      if ((this.mobileMenuVisible = true)) {
        this.mobileMenuVisible = false;
      } else {
        this.mobileMenuVisible = true;
      }
    },
    login() {
      //TODO: open login modal/page here

      const username = "kaj-dev";
      const password = "test";

      this.$store.dispatch("user/login", { username, password });
    },
  },
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
