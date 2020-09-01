<template>
  <v-app-bar
    app
    :height="$store.state.styles.navbarHeight"
    flat
    class="bottom-border"
  >
  <router-link class="logo-link" to="/about">
    <img src="@/assets/images/xr.svg" class="logo-link__icon img-fluid" alt="" width="48" height="48">
  </router-link>
    <v-toolbar-title><h2>Vacatures</h2></v-toolbar-title>
    <v-spacer />
    <v-btn text @click.stop="contactSupportDialog = true">
      Support <v-icon> mdi-help-circle-outline </v-icon>
    </v-btn>
    <v-dialog v-model="contactSupportDialog" max-width="450">
      <v-card>
        <v-card-title class="headline">
          Need help?
        </v-card-title>
        <v-card-text>
          For help and feedback contact us via:
          <flex-wrapper direction="column">
            <icon-link
              href="mailto:integration@extinctionrebellion.nl"
              link-text="integration@extinctionrebellion.nl"
              label="Email"
              icon="mdi-email"
            />
            <icon-link
              href="https://organise.earth/xr-netherlands/messages/@vacancies_support_xrnl"
              link-text="@vacancies_support_xrnl"
              label="Mattermost"
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

export default {
  name: "TheAppBar",
  components: {
    IconLink,
    FlexWrapper,
  },
  data: () => ({
    contactSupportDialog: false,
  }),
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.logo-link{
  display: flex;
  justify-self: center;
  align-items: center;
  &__icon{
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
