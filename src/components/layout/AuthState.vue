<template>
  <v-dialog
    v-model="dialog"
    width="365px"
    height="285px"
    @click:outside="$emit('close')"
  >
    <template v-slot:activator="{}">
      <v-btn v-if="!loggedIn" @click="open">{{ $t("Log in") }}</v-btn>
      <v-btn v-else text @click="logout">
        {{ $t("Logout") }}
      </v-btn>
    </template>
    <v-card id="login-modal">
      <div class="container">
        <button id="close-button" @click.prevent="cancel"></button>
        <h2>{{ $t("Member login") }}</h2>
        <p>
          {{
            $t(
              "Log in to post new vacancies or edit existing ones. Don't have an account yet?"
            )
          }}
        </p>
        <a href="`mailto:${contactEmail}`">{{ $t("Contact us") }}</a>
      </div>
      <form @submit.prevent="login">
        <div class="container">
          <v-text-field
            v-model="username"
            :placeholder="$t('Username')"
            autofocus
            class="mt-3"
          />
          <v-text-field
            v-model="password"
            :placeholder="$t('Password')"
            type="password"
            class="mt-3"
          />
          <div class="error-message" v-if="errorMessage">
            <span>{{ errorMessage }}</span>
          </div>
          <v-btn
            depressed
            color="primary"
            id="submit-button"
            type="submit"
            :disabled="buttonDisabled"
            class="mr-1 v-btn v-btn--depressed theme--light v-size--default primary"
          >
            {{ $t("Log in") }}
          </v-btn>
        </div>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AuthState",
  data() {
    return {
      dialog: false,
      username: "",
      password: "",
      errorMessage: "",
      serverLoading: false
    };
  },
  computed: {
    buttonDisabled: function() {
      return (
        this.username.trim().length == 0 ||
        this.password.trim().length == 0 ||
        this.serverLoading
      );
    },
    ...mapGetters({
      loggedIn: "user/loggedIn"
    })
  },
  methods: {
    open() {
      this.dialog = true;
      this.username = ""; //kaj-dev
      this.password = ""; //test
      this.serverLoading = false;
      this.errorMessage = "";
    },
    close() {
      this.dialog = false;
    },
    ...mapActions("user", ["logout"]),
    async login() {
      const { username, password } = this;
      this.serverLoading = true;
      const message = await this.$store.dispatch("user/login", {
        username,
        password
      });
      this.serverLoading = false;
      if (message === "") {
        this.close();
        return;
      }
      this.errorMessage = message;
    }
  }
};
</script>
