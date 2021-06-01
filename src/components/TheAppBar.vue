<template>
  <div class="nav-bar">
    <div class="nav-bar__left">
      <router-link class="logo-link" to="/">
        <img
          src="@/assets/images/xr.svg"
          class="logo-link__icon img-fluid"
          :alt="$t('Logo')"
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
        <router-link class="nav-link" to="/roles" :exact-path="true">{{
          $t("Roles")
        }}</router-link>
        <router-link class="nav-link" to="/about">{{
          $t("About")
        }}</router-link>
        <router-link class="nav-link" to="/support">{{
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

export default {
  name: "TheAppBar",
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
