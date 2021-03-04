<template>
	<div class="main-content">
		<breadcumb :page="'Webhook'" :folder="''"/>
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
							<b-form-group id="input-group-1" label="Name:" label-for="input-1">
								<b-form-input
									id="input-1"
									v-model="form.name"
									required
									placeholder="Webhook name"
								></b-form-input>
							</b-form-group>

							<b-form-group id="input-group-2" label="Url:" label-for="input-2">
								<b-form-input
									id="input-2"
									v-model="form.url"
									required
									placeholder="https://example.com/webhook1"
								></b-form-input>
							</b-form-group>

							<b-form-group id="input-group-3" label="Secret:" label-for="input-3">
								<b-form-input
									id="input-3"
									v-model="form.secret"
									placeholder="Secret"
								></b-form-input>
							</b-form-group>

							<b-form-group>
								<b-form-checkbox
									id="checkbox-1"
									v-model="form.is_active"
									name="checkbox-1"
									:value="true"
									:unchecked-value="false"
									>
									Is active <b-icon icon="question-circle-fill" v-b-tooltip.hover title="Data is sent only to the active webhooks"></b-icon>
								</b-form-checkbox>
							</b-form-group>
						</b-form>
					</b-container>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import api from '../../../api/api';

export default {
	name: "webhook-show",
	data() {
		return {
			form: {
				name: '',
				url: '',
				secret: '',
				is_active: false
			}
		};
	},
	mounted() {
		const webhookId = this.$route.params.id;

		api.webhookId.get(webhookId)
			.then(response => {
				this.form = response.data;
			})
			.catch(error => {
				console.log(error);
			})
	},
	methods: {
		onSubmit(evt) {
			evt.preventDefault();

			let _this = this;
			
			this.$swal.fire({
				title: "Are you sure?",
				text: "This will update this webhook.",
				icon: "question",
				showClass: {
					popup: '',
					backdrop: ''
				},
				showCancelButton: true,
				confirmButtonText: "Update webhook",
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						api.webhookId.put(_this.form)
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
							'Webhook edited successfully!',
							'This Webhook has been edited successfully!',
							'success');
					}
				});
		}
	}
}
</script>

<style scoped>
</style>