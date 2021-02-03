<template>
	<div class="main-content">
		<breadcumb :page="'New Campaign'" :folder="'Campaigns'"/>
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
							<b-form-group id="input-group-1" label="Campaign Name:" label-for="input-1">
								<b-form-input
										id="input-1"
										v-model="form.name"
										required
										placeholder="Campaign name"
								></b-form-input>
							</b-form-group>

							<b-form-group id="input-select-group" label="Groups:">
								<div class="btn-group" role="group" aria-label="Basic example">
									<b-button variant="primary ripple m-1" v-on:click="sendToAllUsers">All users</b-button>
									<b-button variant="secondary ripple m-1" v-on:click="sendToAllGroups = false">Specific Groups</b-button>
								</div>
							</b-form-group>

							<span v-if="!sendToAllGroups">
								<b-form-group id="input-group-8" label-for="input-8">
									<v-select
											id="input-8"
											v-model="form.groups"
											:options="groups"
											:reduce="group => group.name"
											label="name"
											required
											multiple
											placeholder="Select Groups"
									></v-select>
								</b-form-group>
							</span>

							<b-form-group
									id="input-group-emailTemplate"
									label="Email Template:"
									label-for="input-2"
							>
								<v-select
										id="input-emailTemplate"
										v-model="form.template.name"
										:options="templates"
										:reduce="template => template.name"
										label="name"
										required
										class="style-chooser-1"
										placeholder="Select email template"
								/>
							</b-form-group>

							<b-form-group id="input-group-3" label="Landing Page:" label-for="input-3">
								<v-select
										id="input-3"
										v-model="form.page.name"
										:options="pages"
										:reduce="page => page.name"
										label="name"
										required
										placeholder="Select a Landing Page"
								/>
							</b-form-group>

							<b-form-group id="input-group-4" label="URL:" label-for="input-4">
								<b-form-input
										id="input-4"
										v-model="form.url"
										placeholder="http://192.168.1.1"
								></b-form-input>
							</b-form-group>

							<b-form-group>

							</b-form-group>

							<b-form-row>
								<b-col cols="6">
									<b-form-group id="input-group-5" label="Launch Date" label-for="input-5">

										<b-form-datepicker
												id="input-5"
												v-model="form.launch_date"
												required
												locale="es"
										></b-form-datepicker>

										<b-form-timepicker v-model="launch_hour" required></b-form-timepicker>

									</b-form-group>


								</b-col>
								<b-col cols="6">
									<b-form-group id="input-group-6" label="Send Emails by (Optional)" label-for="input-6">
										<b-form-datepicker
												id="input-6"
												v-model="form.send_by_date"
												locale="es"
										></b-form-datepicker>
										<b-form-timepicker v-model="send_by_hour"></b-form-timepicker>
									</b-form-group>
								</b-col>
							</b-form-row>


							<b-form-group id="input-group-7" label="Sending Profile:" label-for="input-7">
								<b-row>
									<b-col cols="9">
										<v-select
												id="input-7"
												v-model="form.smtp.name"
												:options="sendProfiles"
												:reduce="profile => profile.name"
												label="name"
												required
												placeholder="Select a Sending Profile"
										/>
									</b-col>
									<b-col cols="3">
										<b-button size="sm" type="secundary" v-b-modal:campaign-2 class="input-group-btn">
											<i class="i-Envelope" v-if="!sending">Send Test Email</i>
											<i class="spinner-icon" v-else>Sending...</i>
										</b-button>
									</b-col>
								</b-row>
							</b-form-group>


						</b-form>
					</b-container>
				</b-card>
			</b-col>
		</b-row>
		<b-modal id="campaign-2" title="Send Test Email" size="lg">
			<b-form>
				<b-container fluid>
						<b-row>
							<b-col>
								<b-row>
									<b-col>
									<b-form-group id="input-test-email-name" label="First Name:" label-for="input-test-email-name">
										<b-form-input
												id="input-test-email-name"
												v-model="testForm.first_name"
												required
										></b-form-input>
									</b-form-group>
										<b-form-group id="input-test-email-lastname" label="Last Name:" label-for="input-test-email-lastname">
											<b-form-input
													id="input-test-email-lastname"
													v-model="testForm.last_name"
													required
											></b-form-input>
										</b-form-group>
									</b-col>
									<b-col>
										<b-form-group id="input-test-email-position" label="Position:" label-for="input-test-email-position">
											<b-form-input
													id="input-test-email-position"
													v-model="testForm.position"
													required
											></b-form-input>
										</b-form-group>
										<b-form-group id="input-test-email-email" label="Email:" label-for="input-test-email-email">
											<b-form-input
													id="input-test-email-email"
													v-model="testForm.email"
													required
											></b-form-input>
										</b-form-group>
									</b-col>
								</b-row>
							</b-col>
						</b-row>
						<!--<b-row cols="4">
							<b-col>
								<b-form-input
										id="input-11"
										v-model="testForm.first_name"
										required
										placeholder="First name"
								></b-form-input>
							</b-col>
							<b-col>
								<b-form-input
										id="input-12"
										v-model="testForm.last_name"
										required
										placeholder="Last Name"
								></b-form-input>
							</b-col>
							<b-col>
								<b-form-input
										id="input-13"
										v-model="testForm.position"
										required
										placeholder="Position"
								></b-form-input>
							</b-col>
							<b-col>
								<b-form-input
										id="input-14"
										v-model="testForm.email"
										required
										placeholder="Email"
								></b-form-input>
							</b-col>
						</b-row>-->
					</b-container>
			</b-form>
		</b-modal>
	</div>
</template>

<script>
import moment from "moment";
import api from '../../../api/api';

export default {
	name: "campaign-new",
	data() {
		return {
			form: {
				name: '',
				template: { name: '' },
				url: '',
				page: { name: '' },
				smtp: { name: '' },
				launch_date: null,
				send_by_date: null,
				groups: []
			},
			launch_hour: '00:00:00',
			send_by_hour: '00:00:00',
			testForm: {
				first_name: '',
				last_name: '',
				email: '',
				position: ''
			},
			groups: [],
			templates: [],
			pages: [],
			sendToAllGroups: true,
			sendProfiles: [],
			sending: false
		}
	},
	mounted() {
		api.templates.get()
			.then(response => {
				this.templates = response.data;
			}).catch(err => {
				console.log(err);
			});
		
		api.pages.get()
			.then(response => {
				this.pages = response.data;
			}).catch(err => {
				console.log(err);
			});

		api.groups.summary()
			.then(response => {
				this.groups = response.data.groups;
				this.form.groups = this.groups.map(x => x.name);
			}).catch(err => {
				console.log(err);
			});

		api.SMTP.get()
			.then(response => {
				this.sendProfiles = response.data;
			}).catch(err => {
				console.log(err);
			});
	},
	methods: {
		sendToAllUsers() {
			this.form.groups = this.groups.map(x => x.name);
			this.sendToAllGroups = true;
		},
		onSubmit(evt) {
			this.form.launch_date += `T${this.launch_hour}+00:00`;
			if (this.form.send_by_date) this.form.send_by_date += `T${this.send_by_hour}+00:00`;
			this.form.groups = this.form.groups.map(x => { return { name: x } });
			
			console.log(this.form);
			evt.preventDefault()
			// Trick to reset/clear native browser form validation state
			this.show = false
			this.$nextTick(() => {
				this.show = false
			});
			let _this = this;
			this.$swal.fire({
				title: "Are you sure?",
				text: "This will schedule the campaign to be launched.",
				type: "question",
				animation: false,
				showCancelButton: true,
				confirmButtonText: "Launch",
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						// Submit the campaign
						console.log(_this.form);
						api.campaigns.post(_this.form)
							.then(response => {
									resolve()
									campaign = response
							})
							.catch(error => {
									$("#modal\\.flashes").empty().append("<div style=\"text-align:center\" class=\"alert alert-danger\">\
			<i class=\"fa fa-exclamation-circle\"></i> " + error.responseJSON.message + "</div>")
									Swal.close()
							})
						// let groups = _this.form.groups;

						// // Validate our fields
						// let send_by_date = _this.form.sendEmails;
						// if (send_by_date !== "") {
						// 	send_by_date = moment(send_by_date, "MMMM Do YYYY, h:mm a").utc().format()
						// }
						// let campaign = {
						// 	name: _this.form.name,
						// 	template: {
						// 		name: _this.form.emailTemplate
						// 	},
						// 	url: _this.form.url,
						// 	page: {
						// 		name: _this.form.landingPage
						// 	},
						// 	smtp: {
						// 		name: _this.form.sendingProfiles
						// 	},
						// 	launch_date: moment(_this.form.launchDate, "MMMM Do YYYY, h:mm a").utc().format(),
						// 	send_by_date: send_by_date || null,
						// 	groups: groups,
						// }
						// _this.activeCampaigns.push(campaign);
					})
				}
			})
				.then(function (result) {
					if (result.value) {
						_this.$swal.fire(
							'Campaign Scheduled!',
							'This campaign has been scheduled for launch!',
							'success');
					}
				});

		},
		onReset(evt) {
			evt.preventDefault()
			// Reset our form values
			this.form = {
				name: '',
				template: { name: '' },
				url: '',
				page: { name: '' },
				smtp: { name: '' },
				launch_date: null,
				send_by_date: null,
				groups: [],
			}
			this.launch_hour = '00:00:00';
			this.send_by_hour = '00:00:00';
			// Trick to reset/clear native browser form validation state
			this.show = false
			this.$nextTick(() => {
				this.show = false
			})
		},
		isEmpty(arr) {
			console.log(!Array.isArray(arr) || !arr.length);
			return !Array.isArray(arr) || !arr.length;
		},
		sendTestEmail() {
			const test_email_request = {
				template: {
					name: this.form.emailTemplate
				},
				first_name: this.testForm.first_name,
				last_name: this.testForm.last_name,
				email: this.testForm.email,
				position: this.testForm.position,
				url: this.form.url,
				page: {
					name: this.form.landingPage
				},
				smtp: {
					name: this.form.sendingProfiles
				}
			}
			this.sending = true;

			this.send_test_email()
				.then(() => {
					this.$bvToast.toast('Email Sent!', {
						title: `Variant`,
						toaster: 'test',
						solid: true
					});
					this.sending = false;
				})
				.catch((err) => {
					this.$bvToast.toast('err', {
						title: 'test',
						toaster: 'test',
						solid: true
					});
					this.sending = true;
					throw new Error(err);
				})
			// Send the test email
			// api.send_test_email(test_email_request)
			// 	.success(function (data) {
			// 		$("#sendTestEmailModal\\.flashes").empty().append("<div style=\"text-align:center\" class=\"alert alert-success\">\
			//       <i class=\"fa fa-check-circle\"></i> Email Sent!</div>")
			// 		$("#sendTestModalSubmit").html(btnHtml)
			// 	})
			// 	.error(function (data) {
			// 		$("#sendTestEmailModal\\.flashes").empty().append("<div style=\"text-align:center\" class=\"alert alert-danger\">\
			//       <i class=\"fa fa-exclamation-circle\"></i> " + data.responseJSON.message + "</div>")
			// 		$("#sendTestModalSubmit").html(btnHtml)
			// 	})
		},
		send_test_email() {
			return new Promise((resolve, reject) => {
				if (Math.random() < 0.6) {
					resolve();
				} else {
					reject();
				}
			});
		}
	}
}
</script>

<style scoped>

</style>
