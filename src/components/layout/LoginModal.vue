<template>
	<div class="text-center">
		<v-dialog v-model="dialog" width="500">
			<template v-slot:activator="{ on, attrs }">
				<v-btn v-bind="attrs" v-on="on">login</v-btn>
			</template>
			<v-card>
				<v-card-title class="headline">Log in</v-card-title>
				<v-divider></v-divider>
				<form @submit.prevent="login">
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
				dialog: true,//TODO: set to false
				username: "kaj-dev",
				password: "test",
			}
		},
		methods: {
			cancel(e) {
				this.username = "";
				this.password = "";
				this.dialog=false;
				e.preventDefault();//prevents sending login request
			},
			login() {
				console.log("log in :)");
				const { username, password } = this;
				this.$store.dispatch("user/login", { username, password }).then(async response => {
					const data = await response.json();
					console.log(data);
					if (!response.ok) {
						// get error message from body or default to response status
						const error = (data && data.message) || response.status;
						return Promise.reject(error);
					}
					else {
						//todo: log in successful
					}
				}).catch(error => {
					console.log(error);
				});
			}
		}
	}
</script>
