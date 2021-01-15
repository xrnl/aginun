<template>
	<div class="text-center">
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
								<input v-model="username" placeholder="username">
							</div>
						</div>
						<div class="row">
							<div class="col-12">
								<input v-model="password" placeholder="password" type="password">
							</div>
						</div>
						<div class="row">
							<div class="col-6">
								<input type="submit" class="mr-1 v-btn v-btn--depressed theme--light v-size--default" @click="cancel" value="Cancel">
							</div>
							<div class="col-6">
								<input type="submit" class="mr-1 v-btn v-btn--depressed theme--light v-size--default primary" value="Log in">
							</div>
						</div>
						<div class="row">
							<span>{{errorMessage}}</span>
						</div>
					</div>
				</form>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	import qs from "qs";

	export default {
		data () {
			return {
				name: "login-modal",
				dialog: true,//TODO: set to false
				username: "kaj-dev",
				password: "test",
				errorMessage: ""
			}
		},
		methods: {
			cancel(e) {
				this.username = "";
				this.password = "";
				this.dialog=false;
				e.preventDefault();//prevents sending login request
			},
			async login(e) {
				const { username, password } = this;
				const config = {
					headers: {"Content-Type": "application/x-www-form-urlencoded"}
				};
				const params = {
					// eslint-disable-next-line @typescript-eslint/camelcase
					grant_type: "password",
					// eslint-disable-next-line @typescript-eslint/camelcase
					client_id: "volunteerplatform",
					username,
					password
				};
				let self = this;
				this.axios.post(process.env.VUE_APP_KEYSERVER_URL || "", qs.stringify(params), config).then(function (res) {
					const token = res.data.access_token;
					self.$store.dispatch("user/login", {token});
				}).catch(function (e) {
					console.log(e.response);
					if(e.response.data)
						self.errorMessage = e.response.data.error_description;
					else
						self.errorMessage = "Inlog server unavailable";
				});
				e.preventDefault();
			}
		}
	}
</script>
