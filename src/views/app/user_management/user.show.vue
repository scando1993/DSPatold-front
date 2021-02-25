<template>
	<div class="main-content">
		<breadcumb :page="'User'" :folder="''"/>
		<div class="d-flex flex-row">
			<b-button class="mx-3" variant="light" @click="$router.back()">Go back</b-button>
			<b-button class="mx-3" form="form-1" type="submit" variant="primary">Submit</b-button>
		</div>
		<div class="my-4"></div>

		<b-row>
			<b-col sm="12">
				<b-card>
					<b-container fluid>
						<b-form id="form-1" @submit="onSubmit">
							<b-form-group id="input-group-1" label="Username:" label-for="input-1">
								<b-form-input
									id="input-1"
									v-model="form.username"
									required
									placeholder="Username"
								></b-form-input>
							</b-form-group>

							<b-form-group id="input-group-2" label="Password:" label-for="input-2">
								<b-form-input
									id="input-2"
									type="password"
									v-model="form.password"
									placeholder="password"
								></b-form-input>
							</b-form-group>

							<b-form-group id="input-group-3" label="Confirm Password:" label-for="input-3">
								<b-form-input
									id="input-3"
									type="password"
									v-model="confirmPassword"
									placeholder="confirm"
								></b-form-input>
								<div v-show="!!error" class="mt-2">
									<b-alert show variant="danger">
        						{{ error }}
									</b-alert>
								</div>
							</b-form-group>

							<b-form-group label-for="checkbox-1">
								<b-form-checkbox
									id="checkbox-1"
									v-model="form.password_change_required"
									name="checkbox-1"
									:value="true"
									:unchecked-value="false"
									>
									Require the user to set a new password
								</b-form-checkbox>
							</b-form-group>

							<b-form-group label="Role:" label-for="input-4" >
								<v-select 
								id="input-4"
								v-model="form.role"
								:options="roles"
								:reduce="role => role.slug"
								label="name"
								required
								class="style-chooser-1"
								placeholder="Select a Role">
									<template #search="{attributes, events}">
										<input
											class="vs__search"
											:required="!form.role"
											v-bind="attributes"
											v-on="events"
										/>
									</template>
								</v-select>
							</b-form-group>
						</b-form>
					</b-container>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import api from '../../../api/api'
export default {
	name: "user-new",
	data() {
		return {
			confirmPassword: '',
			form: null,
			roles: [
				{
					name: "Admin",
					slug: "admin"
				},
				{
					name: "User",
					slug: "user"
				}
			],
			error: ''
		}
	},
	beforeMount() {
		this.initForm();
	},
	mounted() {
		const userId = this.$route.params.id;

		api.userId.get(userId)
			.then(response => {
				const {api_key, ...data} = response.data;
				this.form = data;
				this.form.role = this.form.role = data.role.slug;
			}).catch(err => {
				console.log(err);
			});
	},
	methods: {
		initForm() {
			this.form = {
				username: '',
				password: '',
				role: '',
				password_change_required: false
			}
		},
		onSubmit(evt) {
			evt.preventDefault();

			let _this = this;
			
			if (!!this.form.password && !!this.confirmPassword &&
						this.form.password != this.confirmPassword) {
				this.error = "Passwords must match";
			} else {
				this.error = "";
				
				this.$swal.fire({
					title: "Are you sure?",
					text: "This will update this user.",
					icon: "question",
					showClass: {
						popup: '',
						backdrop: ''
					},
					showCancelButton: true,
					confirmButtonText: "Update user",
					confirmButtonColor: "#428bca",
					reverseButtons: true,
					allowOutsideClick: false,
					showLoaderOnConfirm: true,
					preConfirm: function () {
						return new Promise(function (resolve, reject) {
							api.userId.put(_this.form)
								.then(response => {
									resolve();
								})
								.catch(error => {
									const errorMsg = error.response.data.message;
									_this.$swal.close();
									_this.$swal.fire('Error!', errorMsg, 'error');
								})
						});
					}
				})
					.then(function (result) {
						if (result.value) {
							_this.$swal.fire(
								'User edited successfully!',
								'This user has been edited successfully!',
								'success');
						}
					});
			}
		}
	}
}
</script>

<style scoped>
</style>