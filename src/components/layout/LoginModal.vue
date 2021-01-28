<template>
  <div class="text-center" v-model="dialog">
    <v-dialog
      v-model="dialog"
      width="365px"
      height="285px"
      @close-dialog.prevent="cancel"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">login</v-btn>
      </template>
      <v-card id="login-modal">
        <div class="container">
          <button id="close-button" @click.prevent="cancel"></button>
          <h2>Member login</h2>
          <span
            >Log in to post new vacancies or edit existing ones. Don't have an
            account yet?</span
          >
          <a href="/">Contact us</a>
        </div>
        <form v-on:submit.prevent="login">
          <div class="container">
            <input
              id="usernameInput"
              v-model="username"
              placeholder="username"
              type="text"
            />
            <input
              class=""
              v-model="password"
              placeholder="password"
              type="password"
            />
            <button
              id="submit-button"
              type="submit"
              class="mr-1 v-btn v-btn--depressed theme--light v-size--default primary"
              @click.prevent="login"
              value="Log in"
            >
              Log in
            </button>
            <span class="error-message">{{ errorMessage }}</span>
          </div>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "login-modal",
      dialog: false,
      username: "",
      password: "",
      errorMessage: "",
      waitingForServer: false
    };
  },
  computed: {
    readyToLogIn: function() {
      return (
        this.username.trim().length > 0 &&
        this.password.length > 0 &&
        !this.waitingForServer
      );
    }
  },
  methods: {
    cancel() {
      this.dialog = false;
    },
    login() {
      const { username, password } = this;
      if (!this.readyToLogIn) return;
      this.waitingForServer = true;
      this.$store
        .dispatch("user/login", { username, password, self })
        .then((result) => {
          if (!result[0]) {
            //no succes
            this.errorMessage = result[1];
          }
          this.waitingForServer = false;
        });
    }
  },
  watch: {
    dialog(d) {
      if (d) {
        this.username = "";
        this.password = "";
        this.errorMessage = "";
      }
    }
  }
};
</script>
