<template>
  <v-dialog v-model="dialog" width="380px" height="285px">
    <template v-slot:activator="{}">
      <v-btn v-if="!loggedIn" @click="dialog = true">{{ $t("Login") }}</v-btn>
      <v-btn v-else text @click="logout">
        {{ $t("Logout") }}
      </v-btn>
    </template>
    <v-card id="login-modal">
      <v-container>
        <v-row>
          <v-col align="center">
            <h2>{{ $t("Member login") }}</h2>
          </v-col>
          <v-col>
            <button id="close-button" @click.prevent="dialog = false">
              &#2573;
            </button>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-col class="col-md-10">
                {{
                  $t(
                    "Log in to post new vacancies or edit existing ones. Don't have an account yet?"
                  )
                }}
              </v-col>

              <v-spacer></v-spacer>
            </v-row>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-col
                ><a href="`mailto:${contactEmail}`">{{
                  $t("Contact us")
                }}</a></v-col
              >

              <v-spacer></v-spacer>
            </v-row>
          </v-col>
        </v-row>
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="login">
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-col :align-self="center" class="col-md-7">
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
                  />
                </validation-provider>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-col :align-self="center" class="col-md-7">
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
                  />
                </validation-provider>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <v-row align="center">
              <v-col align="center">
                <div class="error-message" v-if="errorMessage">
                  <span>{{ errorMessage }}</span>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-row no-gutters>
                  <v-spacer></v-spacer>
                  <v-col class="col-md-5" :align="center">
                    <v-btn
                      depressed
                      width="100%"
                      color="primary"
                      id="submit-button"
                      type="submit"
                      :disabled="invalid || serverLoading"
                      class="mr-1 v-btn v-btn--depressed theme--light v-size--default primary"
                    >
                      {{ $t("Log in") }}
                      <clip-loader :loading="serverLoading"></clip-loader>
                    </v-btn>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
              </v-col>
            </v-row>
          </form>
        </validation-observer>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { PropagateLoader, ClipLoader } from "@saeris/vue-spinners";

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
    ValidationObserver,
    ClipLoader
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
        this.resetForm();
        this.dialog = false;
        return;
      }
    }
  }
};
</script>
