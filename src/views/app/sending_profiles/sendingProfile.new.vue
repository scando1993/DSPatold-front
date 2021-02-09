<template>
	<div class="main-content">
		<breadcumb :page="'New Sending Profile'" :folder="''"/>
		<div class="d-flex flex-row">
			<b-button class="mx-3" variant="light" @click="$router.back()">Go back</b-button>
			<b-button class="mx-3" form="form-1" type="reset" variant="danger">Reset</b-button>
			<b-button class="mx-3" form="form-1" type="submit" variant="primary">Submit</b-button>
		</div>
		<div class="my-4"></div>

		<b-row>
			<b-col sm="12">
				<b-card>
					<b-container fluid>
						<b-form id="form-1" @submit="onSubmit" @reset="onReset">
							<b-form-group id="input-group-1" label="Name:" label-for="input-1" invalid-feedback="Name is required">
								<b-form-input
									id="input-1"
									v-model="form.name"
									required
									placeholder="Profile name"
								></b-form-input>
							</b-form-group>

							<b-form-group id="input-group-2" label="Interface Type:">
								<b-form-input
									id="input-2"
									disabled
									required
									v-model="form.interface_type"
								></b-form-input>
							</b-form-group>

							<b-form-group id="input-group-3" label="From:" label-for="input-3" invalid-feedback="From address is required">
								<b-form-input
									id="input-3"
									v-model="form.from_address"
									required
									placeholder="First Last <test@example.com>"
								></b-form-input>
							</b-form-group>

							<b-form-group id="input-group-4" label="From:" label-for="input-4" invalid-feedback="Host is required">
								<b-form-input
									id="input-4"
									v-model="form.host"
									required
									placeholder="smtp.example.com:25"
								></b-form-input>
							</b-form-group>

							<b-form-group id="input-group-5" label="Username:" label-for="input-5">
								<b-form-input
									id="input-5"
									v-model="form.username"
									placeholder="Username"
								></b-form-input>
							</b-form-group>

							<b-form-group id="input-group-6" label="Password:" label-for="input-6">
								<b-form-input
									id="input-6"
									v-model="form.password"
									placeholder="Password"
								></b-form-input>
							</b-form-group>

							<div>
								<b-form-checkbox
									id="checkbox1"
									v-model="form.ignore_cert_errors"
									name="checkbox1"
									>
									Ignore Certificate Errors
								</b-form-checkbox>
							</div>

							<b-container class="bv-example-row" >
								<!-- <form ref="additem">
									<b-row>
										<b-col>
											<b-form-group id="input-group-7a"  label-for="input-7a">
												<b-form-input
													id="input-7a"
													v-model="form.headers"
													placeholder="X-Custom-Header"
												></b-form-input>
											</b-form-group>
										</b-col>

										<b-col>
											<b-form-group id="input-group-7b" label-for="input-7b" :state="urlGoState" invalid-feedback="Name is rebbbbbquired">
												<b-form-input
													id="input-7b"
													required
													:state="urlGoState"
													v-model="modalForm.f_urlGo"
													placeholder="Url}}-gophisp"
												></b-form-input>
											</b-form-group>
										</b-col>


										<b-col>
											<b-button variant="danger" @click.stop.prevent="handleSubmit2">+ Add Custom Header</b-button>
										</b-col>
									</b-row>
								</form> -->

								<!-- <div class="row">
									<div class="col-sm-6">
										<label>Show<b-form-select v-model="perPage" :options="options"></b-form-select>
											entries
										</label>
									</div>

									<div class="col-sm-6">
										<label>Search:
											<input type="search" class="form-control input-sm" placeholder="">
										</label>
									</div>
								</div>

								<div>
									<b-table small :fields="fields" :items="this.modalForm.f_items"
									responsive="sm"
									id="table"
									sticky-header="true"
									:current-page="currentPage"
									:per-page="perPage">
										<template #cell()="data">
											<i>{{ data.value }}</i>
										</template>
									</b-table>
								</div>

								<div class="row">
									<b-pagination
										v-model="currentPage"
										:total-rows="modalForm.f_items.length"
										:per-page="perPage"
										prev-text="Prev"
										next-text="Next"
										aria-controls="table"

									></b-pagination>
								</div> -->

								<!-- <div>
									<b-button variant="success" @click="$bvModal.show('modalprofile_2')">Send Test Email </b-button>
								</div>

								<div class="modal-footer">
									<button type="button" data-dismiss="modal" class="btn btn-default" @click="closeModal('modalprofile_1')">Cancel</button>

									<button type="button" class="btn btn-primary" id="modalSubmitt" @click.stop.prevent="handleSubmit('modalprofile_1')" >Save Profile</button>
								</div> -->
							</b-container>
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
	name: "sending_profile-new",
	data() {
		return {
			form: {
				name: '',
				interface_type: 'SMTP',
				from_address: '',
				host: '',
				username: '',
				password: '',
				ignore_cert_errors: true,
				headers: []
			}
		}
	},
	methods: {
		onSubmit(evt) {
			evt.preventDefault()

			let _this = this;
			
			this.$swal.fire({
				title: "Are you sure?",
				text: "This will add a new sending profile.",
				icon: "question",
				showClass: {
					popup: '',
					backdrop: ''
				},
				showCancelButton: true,
				confirmButtonText: "Add profile",
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						// Submit the campaign
						api.SMTP.post(_this.form)
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
							'Profile added successfully!',
							'This profile has been added successfully!',
							'success');
					}
				});
		},
		onReset(evt) {
			evt.preventDefault();

			this.form = {
				name: '',
				interface_type: 'SMTP',
				from_address: '',
				host: '',
				username: '',
				password: '',
				ignore_cert_errors: true,
				headers: []
			}
		}
	}
}
</script>

<style>
</style>