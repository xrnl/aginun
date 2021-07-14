<template>
  <div>
    <button
      v-if="!loggedIn"
      type="button"
      class="btn btn-outline-primary login-button"
      @click="showDialog = true"
    >
      {{ $t("Login") }}
    </button>
    <button
      v-else
      type="button"
      class="btn btn-outline-primary login-button"
      @click="logout"
    >
      {{ $t("Logout") }}
    </button>
    <dialog v-if="showDialog" max-width="380px">
      <div class="card">
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
                <div class="form-floating mb-3">
                  <label>
                    <input
                      v-model="username"
                      class="form-control"
                      :placeholder="$t('Username')"
                    />{{ $t("Username") }}</label
                  >
                </div>
                <div
                  class="invalid-feedback"
                  :class="{ 'd-block': errors.length }"
                >
                  {{ errors[0] }}
                </div>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="password"
                rules="required"
              >
                <div class="form-floating mb-3">
                  <label>
                    <input
                      v-model="username"
                      type="password"
                      class="form-control"
                      :placeholder="$t('Password')"
                    />{{ $t("Password") }}</label
                  >
                </div>
                <div
                  class="invalid-feedback"
                  :class="{ 'd-block': errors.length }"
                >
                  {{ errors[0] }}
                </div>
              </validation-provider>
              <div class="d-flex justify-end">
                <button
                  class="btn btn-outline-primary login-button"
                  type="button"
                  :disabled="serverLoading"
                  @click="showDialog = false"
                >
                  {{ $t("Cancel") }}
                </button>
                <button
                  class="btn btn-primary ml-2"
                  type="submit"
                  :disabled="invalid || serverLoading"
                >
                  <pulse-loader
                    v-if="serverLoading"
                    :size="10"
                    :loading="true"
                  ></pulse-loader>
                  <template v-else>{{ $t("Log in") }}</template>
                </button>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { PulseLoader } from "@saeris/vue-spinners";
import { contactEmail } from "@/constants/contacts";
import { isProduction } from "@/utils/isProduction";

export default Vue.extend({
  name: "AuthState",
  data() {
    return {
      contactEmail,
      showDialog: false,
      username: !isProduction() ? "kaj-dev" : "",
      password: !isProduction() ? "test" : "",
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
    ...mapActions("alerts", ["displayError"]),
    resetForm() {
      this.username = !isProduction() ? "kaj-dev" : "";
      this.password = !isProduction() ? "test" : "";
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

      if (this.serverError) {
        this.displayError(this.serverError);
        return;
      }

      this.resetForm();
      this.showDialog = false;
    }
  }
});
</script>
