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

							<b-form-group id="input-group-4" label="Host:" label-for="input-4" invalid-feedback="Host is required">
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

							<b-form-group id="input-group-7" label-for="checkbox1">
								<b-form-checkbox
									id="checkbox1"
									v-model="form.ignore_cert_errors"
									name="checkbox1"
									>
									Ignore Certificate Errors
								</b-form-checkbox>
							</b-form-group>

							<b-form-group id="input-group-8">
								<b-container>
									<b-form-row>
											<b-col cols="4">
												<b-form-input
													id="input-8a"
													v-model="header.key"
													placeholder="X-Custom-Header"
												></b-form-input>
											</b-col>
											<b-col cols="4">
												<b-form-input
													id="input-8b"
													v-model="header.value"
													:placeholder="'{{.Url}}-gophish'"
												></b-form-input>
											</b-col>
											<b-col cols="4">
												<b-button variant="danger" @click.stop.prevent="addHeader"><b-icon icon="plus"></b-icon> Add Custom Header</b-button>
											</b-col>
									</b-form-row>
								</b-container>
							</b-form-group>

							<b-container fluid="lg">
								<vue-good-table
									:columns="fields"
									:rows="form.headers"
									:search-options="{ enabled: false }"
									styleClass="tableOne vgt-table"
									:pagination-options="{
										enabled: true
									}"
								>
									<template slot="table-row" slot-scope="props">
										<span v-if="props.column.field === 'actions'">
											<a class="dropdown-item" @click="removeHeader(props.row)">
												<i class="nav-icon i-Close-Window text-danger font-weight-bold mr-2"></i>Delete
											</a>
										</span>
									</template>
								</vue-good-table>
								
								<b-button variant="success" @click="$bvModal.show('sendTestEmail')">
									<b-icon icon="envelope"></b-icon> Send Test Email
								</b-button>
							</b-container>
						</b-form>
					</b-container>
				</b-card>
			</b-col>
		</b-row>

		<div>
			<b-modal id="sendTestEmail" hide-footer title="Send Test Email" size="lg">
				<b-form id="form-send-test-email">
					<b-form-group label="Send Test Email to:">
						<b-form-row>
							<b-col cols="6">
								<b-form-input
									v-model="testEmail.first_ame"
									class=""
									placeholder="First Name"
								></b-form-input>
							</b-col>
							<b-col cols="6">
								<b-form-input
									v-model="testEmail.last_ame"
									class=""
									placeholder="Last Name"
								></b-form-input>
							</b-col>
						</b-form-row>
					</b-form-group>
					<b-form-group>
						<b-form-row>
							<b-col cols="6">
								<b-form-input
									v-model="testEmail.email"
									class="mb-2 mr-sm-2"
									placeholder="Email"
								></b-form-input>
							</b-col>
							<b-col cols="6">
								<b-form-input
									v-model="testEmail.position"
									class="mb-2 mr-sm-2"
									placeholder="Position"
								></b-form-input>
							</b-col>
						</b-form-row>
					</b-form-group>

					<div class="d-flex float-right">
						<b-button class="mx-3" variant="default" @click="closeModal('sendTestEmail')">Cancel</b-button>
						<b-button variant="success" @click="sendTestEmail('sendTestEmail')"><b-icon icon="envelope-fill" aria-hidden="true"></b-icon> Send</b-button>
					</div>
				</b-form>
			</b-modal>
		</div>
	</div>
</template>

<script>
import api from '../../../api/api';

export default {
	name: "sending_profile-new",
	data() {
		return {
			form: null,
			header: null,
			testEmail: null,
			fields: [
				{
					label: "Header",
					field: "key",
					thClass: "text-left",
					tdClass: "text-left"
				},
				{
					label: "Value",
					field: "value",
					thClass: "text-left",
					tdClass: "text-left"
				},
				{
					label: "Actions",
					field: "actions",
					thClass: "text-right",
					tdClass: "text-right"
				}
			]
		}
	},
	beforeMount() {
		this.initialize();
	},
	mounted() {
		const profile = JSON.parse(localStorage.getItem('tmpProfile'));

		if (!!profile) {
			this.form = profile;
			this.form.name = `Copy of ${this.form.name}`;
		}
	},
	destroyed() {
		localStorage.removeItem('tmpProfile');
	},
	methods: {
		initialize() {
			this.form = {
				name: '',
				username: '',
				password: '',
				host: '',
				interface_type: 'SMTP',
				from_address: '',
				ignore_cert_errors: true,
				headers: []
			};

			this.header = {
				key: '',
				value: ''
			};

			this.testEmail = {
				template: {},
				first_name: '',
				last_name: '',
				email: '',
				position: '',
				url: '',
				smtp: {
					from_address: '',
					host: '',
					username: '',
					password: '',
					ignore_cert_errors: '',
					headers: []
        }
			}
		},
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
			this.initialize();
		},
		addHeader() {
			if (!!this.header.key && !!this.header.value) {
				this.form.headers.push(this.header);
				this.header = {
					key: '',
					value: ''
				}
			}
		},
		removeHeader(header) {
			this.form.headers = this.form.headers.filter(x => x.key != header.key);
		},
		closeModal(id) {
			this.$bvModal.hide(id);
		},
		sendTestEmail(modalId) {
			this.testEmail.smtp = this.getSMTP(this.form);
			console.log(this.testEmail.smtp);
			// api.send_test_email(this.testEmail)
			// 	.then(response => {
			// 		this.closeModal(modalId);
			// 	});
		},
		getSMTP(obj) {
			return (({from_address, headers, host, ignore_cert_errors, username, password}) => 
							({from_address, headers, host, ignore_cert_errors, username, password}))(obj);
		}
	}
}
</script>

<style>
</style>