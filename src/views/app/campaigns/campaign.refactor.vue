<template>
	<!--	Body start content-->
	<div class="main-content">
		<breadcumb :page="'Campaigns'" :folder="''"/>
		<b-button variant="primary" @click="$router.push('campaigns/new')">New Campaign</b-button>
		<div class="my-4"></div>

		<b-row>
			<b-col sm="12">
				<b-card>
					<b-tabs>
						<b-tab title="Active Campaigns" active>
							<div>
								<b-alert variant="success" :show="isEmpty(activeCampaigns)">
									No campaigns created yet. Let's create one!
								</b-alert>
							</div>
							<vue-good-table
									v-if="!isEmpty(activeCampaigns)"
									:columns="columns2"
									:rows="activeCampaigns"
									:search-options="{ enabled: true }"
									styleClass="tableOne vgt-table"
							>
								<template slot="table-row" slot-scope="props">
									<span v-if="props.column.field === 'name'">
										<router-link :to="{ name: 'campaignShow', params: { id: props.row.id }}">{{ props.row.name }}</router-link>
									</span>
									<span v-if="props.column.field === 'created_date'">
										{{ props.row.created_date | formatDate }}
										<!-- <span class="badge badge-pill badge-outline-primary p-2 ">{{ props.row.status }}</span> -->
									</span>
									<span v-if="props.column.field === 'status'">
										<span class="badge badge-pill badge-outline-primary p-2 ">{{ props.row.status }}</span>
									</span>
									<span v-if="props.column.field === 'actions'">
										<b-dropdown
												id="dropdown-left"
												variant="link"
												text="Left align"
												toggle-class="text-decoration-none"
												size="md"
												dropleft
												no-caret
										>
											<template v-slot:button-content class="_r_btn border-0">
												<span class="_dot _r_block-dot bg-dark"></span>
												<span class="_dot _r_block-dot bg-dark"></span>
												<span class="_dot _r_block-dot bg-dark"></span>
											</template>

											<b-dropdown-item class="dropdown-item" @click="duplicateCampaign(props.row)">
												<i class="nav-icon i-File-Copy text-info font-weight-bold mr-2"></i>Duplicate
											</b-dropdown-item>
											<b-dropdown-item class="dropdown-item" @click="editCampaign(props.row)">
												<i class="nav-icon i-Pen-2 text-success font-weight-bold mr-2"></i>Edit
											</b-dropdown-item>
											<b-dropdown-item>
												<a class="dropdown-item" @click="deleteCampaign(props.row)">
													<i class="nav-icon i-Close-Window text-danger font-weight-bold mr-2"></i>Delete
												</a>
											</b-dropdown-item>
										</b-dropdown>
									</span>
									<!-- <span v-else>{{ props.formattedRow[props.column.field] }}</span> -->
								</template>
							</vue-good-table>
						</b-tab>
						<b-tab title="Archived Campaigns">
							<div>
								<b-alert variant="success" :show="true">
									No campaigns archived yet
								</b-alert>
							</div>
						</b-tab>
					</b-tabs>
				</b-card>
			</b-col>
		</b-row>

		<!--Modal create / show-->
		<!-- <b-modal id="campaign-1" title="New Campaign" size="lg" v-model="show">
			<b-container fluid>
				<b-form id="form-1" @submit="onSubmit" @reset="onReset">
					<b-form-group id="input-group-1" label="Name:" label-for="input-1">
						<b-form-input
								id="input-1"
								v-model="form.name"
								required
								placeholder="Campaign name"
						></b-form-input>
					</b-form-group>

					<b-form-group
							id="input-group-2"
							label="Email address:"
							label-for="input-2"
							description="We'll never share your email with anyone else."
					>
						<v-select
								id="input-2"
								v-model="form.emailTemplate"
								:options="emails"
								class="style-chooser-1"
								placeholder="Select a Template"
						/>
					</b-form-group>

					<b-form-group id="input-group-3" label="Landing Page:" label-for="input-3">
						<v-select
								id="input-3"
								v-model="form.landingPage"
								:options="landings"
								placeholder="Select a Landing Page"
						/>
					</b-form-group>

					<b-form-group id="input-group-4" label="URL:" label-for="input-4">
						<b-form-input
								id="input-4"
								v-model="form.url"
								required
								placeholder="http://192.168.1.1"
						></b-form-input>
					</b-form-group>

					<b-form-row>
						<b-col>
							<b-form-group id="input-group-5" label="Launch Date" label-for="input-5">
								<b-form-datepicker
										id="input-5"
										v-model="form.launchDate"
										required
										today-button
										reset-button
										close-button
										locale="es"
										size="sm"
								></b-form-datepicker>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group id="input-group-6" label="Send Emails by (Optional)" label-for="input-6">
								<b-form-datepicker
										id="input-6"
										v-model="form.sendEmails"
										required
										today-button
										reset-button
										close-button
										locale="es"
										size="sm"
								></b-form-datepicker>
							</b-form-group>
						</b-col>
					</b-form-row>


					<b-form-group id="input-group-7" label="Sending Profile:" label-for="input-7">
						<b-row no-gutters align-h="center">
							<b-col cols="9">
								<v-select
										id="input-7"
										v-model="form.sendingProfiles"
										required
										placeholder="Select a Sending Profile"
										:options="profiles"
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


					<b-form-group id="input-group-8" label="Groups:" label-for="input-8">
						<v-select
								id="input-8"
								v-model="form.groups"
								required
								:multiple=true
								placeholder="Select Groups"
								:options="groups"
						></v-select>
					</b-form-group>

				</b-form>
			</b-container>
			<div slot="modal-footer" class="ml-auto">
				<b-button form="form-1" type="reset" variant="danger">Reset</b-button>
				<span class="mx-2"></span>
				<b-button form="form-1" type="submit" variant="primary">Submit</b-button>
			</div>
		</b-modal> -->
		<!-- <b-modal id="campaign-2" title="Send Test Email" size="lg">
			<b-form>
				<b-form-group id="input-group-11" label="Send Test Email to:" label-for="input-11">
					<b-container fluid>
						<b-row cols="4">
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
						</b-row>
					</b-container>
				</b-form-group>
			</b-form>
		</b-modal> -->
	</div>

</template>

<script>
import moment from 'moment';
import api from '../../../api/api';

export default {
	metaInfo: {
		title: "Campaigns"
	},
	name: "campaign-dashboard",
	data() {
		return {
			show: false,
			sending: false,
			columns2: [
				{
					label: "Name",
					field: "name",
					thClass: "text-left",
					tdClass: "text-left"
				},
				{
					label: "Created Date",
					field: "created_date",
					type: "date",
					thClass: "text-left",
					tdClass: "text-left",
					dateInputFormat: 'yyyy-MM-dd HH:mm:ss',
    			dateOutputFormat: 'DD-MM-YYYY HH:mm:ss'
				},
				{
					label: "Status",
					field: "status",
					thClass: "text-left",
					tdClass: "text-left"
				},
				{
					label: "Actions",
					field: "actions",
					thClass: "text-right",
					tdClass: "text-right"
				}
			],
			form: {
				emailTemplate: null,
				name: '',
				landingPage: null,
				url: '',
				launchDate: '',
				sendEmails: '',
				sendingProfiles: null,
				groups: [],
			},
			testForm: {
				first_name: '',
				last_name: '',
				email: '',
				position: ''
			},
			activeCampaigns: [],
		}
	},
	mounted() {
		api.campaigns.summary()
			.then(response => {
				this.activeCampaigns = response.data.campaigns;
			}).catch(err => {
				console.log(err);
			});
	},
	methods: {
		onSubmit(evt) {
			// console.log(JSON.stringify(this.form))
			evt.preventDefault()
			alert(JSON.stringify(this.form))
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
					return new Promise(function (resolve) {
						let groups = _this.form.groups;

						// Validate our fields
						let send_by_date = _this.form.sendEmails;
						if (send_by_date !== "") {
							send_by_date = moment(send_by_date, "MMMM Do YYYY, h:mm a").utc().format()
						}
						let campaign = {
							name: _this.form.name,
							template: {
								name: _this.form.emailTemplate
							},
							url: _this.form.url,
							page: {
								name: _this.form.landingPage
							},
							smtp: {
								name: _this.form.sendingProfiles
							},
							launch_date: moment(_this.form.launchDate, "MMMM Do YYYY, h:mm a").utc().format(),
							send_by_date: send_by_date || null,
							groups: groups,
						}
						_this.activeCampaigns.push(campaign);
						resolve()
						// Submit the campaign
						//     api.campaigns.post(campaign)
						//         .success(function (data) {
						//             resolve()
						//             campaign = data
						//         })
						//         .error(function (data) {
						//             $("#modal\\.flashes").empty().append("<div style=\"text-align:center\" class=\"alert alert-danger\">\
						// <i class=\"fa fa-exclamation-circle\"></i> " + data.responseJSON.message + "</div>")
						//             Swal.close()
						//         })
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
				emailTemplate: null,
				name: '',
				landingPage: null,
				url: '',
				launchDate: '',
				sendEmails: '',
				sendingProfiles: null,
				groups: [],
			}
			// Trick to reset/clear native browser form validation state
			this.show = false
			this.$nextTick(() => {
				this.show = false
			})
		},
		isEmpty(arr) {
			// console.log(!Array.isArray(arr) || !arr.length);
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

<style>
/*.input-group-btn {
      line-height: 20px !important;
          padding: 0.20rem 0.5em;
          width: 100%;
  }*/
/*.style-chooser .vs__search::placeholder {
      background: #dfe5fb;
      border: none;
      color: #394066;
      text-transform: lowercase;
      font-variant: small-caps;
  }

  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
      fill: #394066;
  }*/
</style>
