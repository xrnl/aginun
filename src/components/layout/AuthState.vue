<template>
  <v-dialog v-model="dialog" width="365px" height="285px">
    <template v-slot:activator="{}">
      <v-btn v-if="!loggedIn" @click="dialog = true">{{ $t("Login") }}</v-btn>
      <v-btn v-else text @click="logout">
        {{ $t("Logout") }}
      </v-btn>
    </template>
    <v-card id="login-modal">
      <div class="container">
        <button id="close-button" @click.prevent="dialog = false"></button>
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
      <validation-observer v-slot="{ invalid }">
        <form @submit.prevent="login">
          <div class="container">
            <validation-provider
              name="Username"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="username"
                :placeholder="$t('Username')"
                label="Username"
                :error-messages="errors"
                autofocus
                class="mt-3"
              />
            </validation-provider>
            <validation-provider
              name="Password"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="password"
                :placeholder="$t('Password')"
                :error-messages="errors"
                type="password"
                label="Password"
                class="mt-3"
              />
            </validation-provider>
            <div class="error-message" v-if="errorMessage">
              <span>{{ errorMessage }}</span>
            </div>
            <v-btn
              depressed
              color="primary"
              id="submit-button"
              type="submit"
              :disabled="invalid || serverLoading"
              class="mr-1 v-btn v-btn--depressed theme--light v-size--default primary"
            >
              {{ $t("Log in") }}
            </v-btn>
          </div>
        </form>
      </validation-observer>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";

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
  components: {
    ValidationProvider,
    ValidationObserver
  },
  computed: {
    ...mapGetters({
      loggedIn: "user/loggedIn"
    })
  },
  methods: {
    resetForm() {
      this.username = ""; //kaj-dev
      this.password = ""; //test
      this.serverLoading = false;
      this.errorMessage = "";
    },
    ...mapActions("user", ["logout"]),
    async login() {
      const { username, password } = this;
      this.serverLoading = true;
      this.errorMessage = await this.$store.dispatch("user/login", {
        username,
        password
      });
      this.serverLoading = false;
      if (!this.errorMessage) {
        this.dialog = false;
        return;
      }
    }
  }
};
</script>
