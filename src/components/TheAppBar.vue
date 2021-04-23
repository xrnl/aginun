<template>
  <div class="nav-bar">
    <div class="nav-bar__left">
      <router-link class="logo-link" to="/about">
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
      <div class="nav-bar__hamburger" @click.stop="toggleNavigation">
        <img
          src="@/assets/images/hamburger.svg"
          class="img-fluid"
          :alt="$t('Logo')"
        />
      </div>
      <div class="nav-bar__content" :class="{ active: mobileMenuVisible }">
        <div class="nav-bar__content__close" @click="closeNavigation">
          <img
            src="@/assets/images/close.svg"
            :alt="$t('Logo')"
            width="48"
            height="48"
          />
        </div>
        <v-spacer />
        <router-link class="nav-link" to="/">{{ $t("Dashboard") }}</router-link>
        <router-link class="nav-link" to="/about">{{
          $t("About")
        }}</router-link>

        <router-link class="nav-link" to="/support">{{
          $t("Support")
        }}</router-link>
        <a class="nav-link" :href="xrNLWebsiteUrl" target="_blank">
          XR NL
        </a>
        <v-btn
          class="login-button"
          v-if="!loggedIn"
          outlined
          text
          @click.stop="login"
        >
          {{ $t("Login") }}
        </v-btn>
        <v-btn class="login-button" v-else text outlined @click.stop="logout">
          {{ $t("Logout") }}
        </v-btn>
        <div>
          <language-select />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { contactEmail } from "@/constants/contacts";
import LanguageSelect from "@/components/LanguageSelect.vue";

export default {
  name: "TheAppBar",
  components: {
    LanguageSelect
  },
  data: () => ({
    mobileMenuVisible: false,
    contactEmail,
  }),
  computed: {
    ...mapGetters({
      loggedIn: "user/loggedIn"
    }),
    xrNLWebsiteUrl: function() {
      const url =
        "https://extinctionrebellion.nl" +
        (this.$i18n.locale === "en" ? "/en" : "");
      return url;
    }
  },
  watch: {
    $route() {
      this.mobileMenuVisible = false;
    }
  },
  methods: {
    ...mapActions("user", ["logout"]),
    closeNavigation() {
      this.mobileMenuVisible = false;
    },
    toggleNavigation() {
      if (this.mobileMenuVisible) {
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
