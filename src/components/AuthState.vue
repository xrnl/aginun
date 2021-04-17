<template>
  <div>
    <v-btn v-if="!loggedIn" @click="dialog = true">{{ $t("Login") }}</v-btn>
    <v-btn v-else @click="logout">
      {{ $t("Logout") }}
    </v-btn>
    <v-dialog v-model="dialog" :persistent="serverLoading" max-width="380px">
      <v-card class="pa-3">
        <div class="text-center">
          <h2>{{ $t("Member login") }}</h2>
          <p>
            {{
              $t(
                "Log in to post new vacancies or edit existing ones. Don't have an account yet?"
              )
            }}
            <a :href="`mailto:${contactEmail}`">{{ $t("Contact us") }}</a>
          </p>
          <validation-observer v-slot="{ invalid }" ref="login_form">
            <form @submit.prevent="handleSubmit">
              <validation-provider
                v-slot="{ errors }"
                name="username"
                rules="required"
              >
                <v-text-field
                  outlined
                  dense
                  class="rounded-lg"
                  v-model="username"
                  :label="$t('Username')"
                  :error-messages="errors"
                  autofocus
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="password"
                rules="required"
              >
                <v-text-field
                  outlined
                  dense
                  class="rounded-lg"
                  type="password"
                  v-model="password"
                  :label="$t('Password')"
                  :error-messages="errors.length ? errors : serverError"
                />
              </validation-provider>
              <div class="d-flex justify-end">
                <v-btn text :disabled="serverLoading" @click="dialog = false">
                  {{ $t("Cancel") }}
                </v-btn>
                <v-btn
                  color="primary"
                  type="submit"
                  :disabled="invalid || serverLoading"
                  class="ml-2"
                >
                  <pulse-loader
                    v-if="serverLoading"
                    :size="10"
                    :loading="true"
                  ></pulse-loader>
                  <template v-else>{{ $t("Log in") }}</template>
                </v-btn>
              </div>
            </form>
          </validation-observer>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { PulseLoader } from "@saeris/vue-spinners";
import { contactEmail } from "@/constants/contacts";

export default Vue.extend({
  name: "AuthState",
  data() {
    return {
      contactEmail,
      dialog: false,
      username: "kaj-dev",
      password: "test",
      serverError: "",
      serverLoading: false
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    PulseLoader
  },
  computed: {
    ...mapGetters({
      loggedIn: "user/loggedIn"
    })
  },
  methods: {
    ...mapActions("user", ["login", "logout"]),
    resetForm() {
      this.username = "";
      this.password = "";
      this.serverLoading = false;
      this.serverError = "";
      (this.$refs.login_form as InstanceType<
        typeof ValidationProvider
      >).reset();
    },
    async handleSubmit() {
      const { username, password } = this;
      this.serverLoading = true;
      this.serverError = await this.login({
        username,
        password
      });
      this.serverLoading = false;

      if (!this.serverError) {
        this.resetForm();
        this.dialog = false;
      }
    }
  }
});
</script>
