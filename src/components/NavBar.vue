<template>
  <div class="nav-bar">
    <div class="nav-bar__left">
      <router-link class="logo-link" to="/">
        <img
          src="@/assets/images/xr-logo-white.svg"
          class="logo-link__icon img-fluid"
          :alt="$t('Logo')"
        />
        <h2 class="logo-link__title">{{ $t("Vacancies") }}</h2>
      </router-link>
      <div class="nav-bar__admin-links" v-if="loggedIn">
        <router-link class="nav-link nav-link--white" to="/roles"
          >All Roles</router-link
        >
        <router-link class="nav-link nav-link--white" to="/my-roles"
          >My Roles</router-link
        >
      </div>
    </div>

    <div class="nav-bar__right">
      <div class="nav-bar__hamburger" @click.stop="toggleNavigation">
        <img
          src="@/assets/images/hamburger.svg"
          class="img-fluid"
          :alt="$t('Logo')"
        />
      </div>
      <div
        class="nav-bar__content-mobile"
        :class="{ active: mobileMenuVisible }"
      >
        <div class="nav-bar__content-mobile__close" @click="closeNavigation">
          <img
            src="@/assets/images/close.svg"
            :alt="$t('Logo')"
            width="48"
            height="48"
          />
        </div>
        <v-spacer />
        <router-link class="nav-link nav-link--white" to="/">{{
          $t("Dashboard")
        }}</router-link>
        <router-link class="nav-link nav-link--white" to="/about">{{
          $t("About")
        }}</router-link>
        <router-link class="nav-link nav-link--white" to="/support">{{
          $t("Support")
        }}</router-link>
        <auth-state></auth-state>
        <div>
          <language-select />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageSelect from "@/components/LanguageSelect.vue";
import AuthState from "@/components/AuthState.vue";
import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  components: {
    LanguageSelect,
    AuthState
  },
  data: () => ({
    mobileMenuVisible: false
  }),
  watch: {
    $route() {
      this.mobileMenuVisible = false;
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: "user/loggedIn"
    })
  },
  methods: {
    closeNavigation() {
      this.mobileMenuVisible = false;
    },
    toggleNavigation() {
      if (this.mobileMenuVisible) {
        this.mobileMenuVisible = false;
      } else {
        this.mobileMenuVisible = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-bar {
  background-color: $xr-green-light;
  display: flex;
  flex-direction: row;
  padding: $navbar-padding-vertical $distance-sm;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 99;
  color: white;

  .logo-link {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    &__title {
      color: white;
      @include font-heading();
      font-size: $font-size-lg;
      font-weight: normal;
      margin-left: 1rem;
    }
    &__icon {
      width: $logo-height;
      height: $logo-height;
    }
  }

  &__left {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &__admin-links {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 2.5rem;
    height: 100%;
  }

  &__right {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .language-select {
    margin-bottom: $distance-md;
    margin-top: $distance-sm;
    z-index: 99;
    @media (min-width: $breakpoint-sm) {
      margin-top: 0;
      margin: 0 $distance-sm;
      margin-bottom: 0;
    }
  }

  .login-button,
  .nav-link {
    margin-bottom: $distance-xs;
    @media (min-width: $breakpoint-sm) {
      margin-bottom: 0;
    }
  }

  &__content-mobile {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: $xr-green;
    display: none;
    z-index: 99;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (min-width: $breakpoint-sm) {
      position: relative;
      display: flex;
      display: flex;
      flex-direction: row;
    }
    &__close {
      position: absolute;
      right: $distance-sm;
      top: $distance-sm;
      display: flex;
      @media (min-width: $breakpoint-sm) {
        display: none;
        height: 48px;
      }
    }
    &.active {
      display: flex;
    }
    .spacer {
      display: none;
    }
  }

  &__hamburger {
    z-index: 99;
    display: flex;
    padding: $distance-xs;
    background: $xr-white;
    img {
      height: 23px;
    }
  }

  @media (min-width: $breakpoint-sm) {
    &__hamburger {
      display: none;
    }
  }
}
</style>
