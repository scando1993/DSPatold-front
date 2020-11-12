<template>
	<!--	Body start content-->
	<div class="main-content">
		<breadcumb :page="'Campaigns'" :folder="''"/>
		<b-button variant="primary" v-b-modal:campaign-1>New Campaign</b-button>
		<div class="my-4"></div>
		<b-container fluid>
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
										:rows="activeCampaigns"
										:columns="columns"
										:search-options="{
											enabled: true,
											placeholder: ''
										}"
								>
									<template slot="table-column" slot-scope="props">
										<span v-if="props.column.label !== 'Button'">
											test-{{ props.column.label }}
										</span>
										<span v-else></span>
									</template>
									<template slot="table-row" slot-scope="props">
						        <span v-if="props.column.field === 'button'">
						          <a href="">
						            <i class="i-Eraser-2 text-25 text-success mr-2"></i>
						            {{ props.row.button }}</a
						          >
						          <a href="">
						            <i class="i-Close-Window text-25 text-danger"></i>
						            {{ props.row.button }}</a
						          >
						        </span>
									</template>
								</vue-good-table>
							</b-tab>
							<b-tab title="Archived Campaigns"></b-tab>
						</b-tabs>
					</b-card>
				</b-col>
			</b-row>
		</b-container>
		<!--Modal create / show-->
		<b-modal id="campaign-1" title="New Campaign" size="lg" v-model="show">
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
								class="style-chooser"
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

					<b-form-group>

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
							<b-col cols="3" >
								<b-button size="sm" type="secundary" v-b-modal:campaign-2 class="input-group-btn">
									<i class="i-Envelope"></i> Send Test Email
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
		</b-modal>
		<b-modal id="campaign-2" title="Send Test Email" size="lg">
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
		</b-modal>
	</div>

</template>

<script>
import moment from 'moment';

export default {
	metaInfo: {
		title: "Campaigns"
	},
	name: "campaign",
	data() {
		return {
			show: false,
			columns: [
				{
					label: "Title",
					field: "span",
					html: true
				},
				{
					label: "Created Date",
					field: "createdAt",
					type: "date",
					dateInputFormat: "yyyy-mm-dd",
					dateOutputFormat: "MMM Do yy"
				},
				{
					label: "Status",
					field: "score",
					type: "percentage"
				},
				{
					label: "Button",
					field: "button",
					html: true,
					tdClass: "text-right",
					thClass: "text-right"
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
			emails: ['Example 2', 'Example 3'],
			landings: ['Landing 1', 'Landing 2'],
			profiles: ['sending 1', "sending 2", "sending 3"],
			groups: ['group 1', 'group 2', "group 3"]
		}
	},
	methods: {
		onSubmit(evt) {
			console.log(JSON.stringify(this.form))
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
					return new Promise(function (resolve, reject) {
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
			btnHtml = $("#sendTestModalSubmit").html()
			$("#sendTestModalSubmit").html('<i class="fa fa-spinner fa-spin"></i> Sending')
			// Send the test email
			api.send_test_email(test_email_request)
				.success(function (data) {
					$("#sendTestEmailModal\\.flashes").empty().append("<div style=\"text-align:center\" class=\"alert alert-success\">\
            <i class=\"fa fa-check-circle\"></i> Email Sent!</div>")
					$("#sendTestModalSubmit").html(btnHtml)
				})
				.error(function (data) {
					$("#sendTestEmailModal\\.flashes").empty().append("<div style=\"text-align:center\" class=\"alert alert-danger\">\
            <i class=\"fa fa-exclamation-circle\"></i> " + data.responseJSON.message + "</div>")
					$("#sendTestModalSubmit").html(btnHtml)
				})
		}
	}
}
</script>

<style>
.input-group-btn {
	line-height: 20px !important;
		padding: 0.20rem 0.5em;
		width: 100%;
}
.style-chooser .vs__search::placeholder {
	background: #dfe5fb;
	border: none;
	color: #394066;
	text-transform: lowercase;
	font-variant: small-caps;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
	fill: #394066;
}
</style>
