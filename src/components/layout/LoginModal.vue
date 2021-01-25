<template>
  <div class="text-center" v-model="dialog">
    <v-dialog v-model="dialog" width="500" @close-dialog="cancel">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">login</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Log in</v-card-title>
        <v-divider></v-divider>
        <form v-on:submit="login">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <input v-model="username" placeholder="username" type="text">
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <input v-model="password" placeholder="password" type="password">
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <button type="button" class="mr-1 v-btn v-btn--depressed theme--light v-size--default" @click="cancel" value="Cancel">Cancel</button>
              </div>
              <div class="col-6">
                <button type="submit" class="mr-1 v-btn v-btn--depressed theme--light v-size--default primary" @click="login" value="Log in">Log in</button>
              </div>
            </div>
            <div class="row" v-if="errorMessage!=''">
              <div class="col-12">
                <span>{{errorMessage}}</span>
              </div>
            </div>
          </div>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: "login-modal",
        dialog: false,
        username: "kaj-dev",
        password: "test",
        errorMessage: "",
        waitingForServer: false,
      }
    },
    computed: {
      readyToLogIn: function () {
        return (this.username.trim().length > 0 && this.password.length > 0) && !this.waitingForServer;
      }
    },
    methods: {
      cancel(e) {
        this.dialog=false;
        e.preventDefault();//prevents sending login request
      },
      login(e) {
        var self = this;
        e.preventDefault();
        const { username, password } = this;
        if(!this.readyToLogIn)
          return;
        this.waitingForServer = true;
        this.$store.dispatch("user/login", {username, password, self}).then(result => {
          if(!result[0]) {//no succes
            this.errorMessage = result[1];
          }
          self.waitingForServer = false;
        });
      }
    },
    watch: {
      dialog(d) {
        if(d) {
          this.username = "";
          this.password = "";
          this.errorMessage = "";
        }
      }
    }
  }
</script>
