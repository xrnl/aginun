<template>
  <v-app-bar
    app
    :height="$store.state.styles.navbarHeight"
    flat
    class="bottom-border"
  >
    <v-spacer />
    <v-alert :value="alert" type="success" transition="slide-y-transition">
      {{ alert_message }}
    </v-alert>
    <v-btn text @click.stop="contactSupportDialog = true">
      Support <v-icon> mdi-help-circle-outline </v-icon>
    </v-btn>
    <v-btn icon @click="toggleDarkMode">
      <v-icon>mdi-invert-colors</v-icon>
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
              text="integration@extinctionrebellion.nl"
              label="Email"
              icon="mdi-email"
            />
            <icon-link
              href="https://organise.earth/xr-netherlands/messages/@vacancies_support_xrnl"
              text="@vacancies_support_xrnl"
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
import { mapState, mapActions } from "vuex";

export default {
  name: "TheAppBar",
  components: {
    IconLink,
  },
  data: () => ({
    contactSupportDialog: false,
  }),
  computed: {
    ...mapState("alerts", ["alert", "alert_message"]),
  },
  mounted: function() {
    if (alert) {
      this.hide_alert();
    }
  },
  methods: {
    ...mapActions("alerts", ["setAlert"]),
    toggleDarkMode: function() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    hide_alert: function() {
      window.setInterval(() => {
        this.setAlert(false);
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
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
