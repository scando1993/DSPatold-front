<template>
	<div class="main-content">
		<h1>Results for {{campaign.name}}</h1>
		<b-button class="mx-3" variant="light" @click="$router.back()">Go back</b-button>
		<b-button class="mx-3" variant="success" @click="exportCSV">Export CSV</b-button>
		<b-button class="mx-3" variant="primary" @click="completeCampaign" :disabled="status">Complete</b-button>
		<b-button class="mx-3" variant="danger" @click="deleteCamapaign">Delete</b-button>
		<b-button class="mx-3" variant="primary" @click="refresh">
			<b-icon icon="arrow-repeat" animation="spin" v-if="loading"></b-icon>
			<b-icon icon="arrow-repeat" v-if="!loading"></b-icon>
			Refresh
		</b-button>
		<div class="my-4"></div>

		<b-row>
			<b-col sm="12">
				<b-card>
					<b-tabs>
						<b-tab title="Overview" active>
							<div class="row">
								<b-col cols="7">
									<b-card title="Campaign Status" class="mb-30">
										<div class="ul-widget-app__browser-list">
											<div class="row">
												<div cols="6" class="pl-3 pr-3">
													<div class="ul-widget-app__browser-list-1 mb-30">
														<i class="i-Email text-18 text-danger font-weight-600 mr-3"></i>
														<span class="text-15">Email sent</span>
														<b-badge pill variant="success p-1 m-1">{{ stats.sent }}</b-badge>
													</div>

													<div class="ul-widget-app__browser-list-1 mb-30">
														<i
															class="i-Cloud-Email text-18 text-warning font-weight-600 mr-3"
														></i>
														<span class="text-15">Email Opened</span>
														<b-badge pill variant="danger p-1 m-1">{{ stats.opened }}</b-badge>
													</div>

													<div class="ul-widget-app__browser-list-1 mb-30">
														<i
															class="i-Cursor-Click-2 text-18 text-info font-weight-600 mr-3"
														></i>
														<span class="text-15">Clicked Link</span>
														<b-badge pill variant="primary p-1 m-1">{{ stats.clicked }}</b-badge>
													</div>
												</div>
												<div cols="6" class="pl-3 pr-3">
													<div class="ul-widget-app__browser-list-1 mb-30">
														<i class="i-Data-Cloud text-18 text-danger font-weight-600 mr-3"></i>
														<span class="text-15">Submitted Data</span>
														<b-badge pill variant="dark p-1 m-1">{{ stats.submitted_data }}</b-badge>
													</div>

													<div class="ul-widget-app__browser-list-1 mb-30">
														<i class="i-Voicemail text-18 text-success mr-3"></i>
														<span class="text-15">Email Reported</span>

														<b-badge pill variant="danger p-1 m-1">{{ stats.email_reported }}</b-badge>
													</div>
												</div>
											</div>
											
										</div>
									</b-card>
								</b-col>
								<b-col cols="5">
									<b-card title="Phishing Email" class="mb-30">
										<div class="ul-widget-app__browser-list">
											<div class="ul-widget-app__browser-list-1 mb-3 flex-wrap">
												<span class="text-15">From: </span>
												<span class="text-15">{{ fromAddress }}</span>
											</div>

											<div class="ul-widget-app__browser-list-1 mb-3 flex-wrap">
												<span class="text-15">To: </span>
												<span class="text-15">{{ results.length }} recipients</span>
											</div>

											<div class="ul-widget-app__browser-list-1 mb-3 flex-wrap">
												<span class="text-15 custom-widget-key">Subject: </span>
												<span class="text-15">{{ campaign.template.subject }}</span>
											</div>
										</div>
									</b-card>
								</b-col>
							</div>
							<div class="row">
								<b-col cols="12">
									<b-card title="Timeline" class="mb-30">
										<vue-horizontal-timeline 
											:items="timeline" 
											title-class="custom-timeline" 
											content-class="custom-timeline"
											min-width="200"/>
									</b-card>
								</b-col>
							</div>
						</b-tab>
						<b-tab title="Details">
							<div>
								<b-table :items="results" :fields="columns" responsive="sm">
									<template #cell(show_details)="row">
										<b-button size="sm" @click="row.toggleDetails">
											{{ row.detailsShowing ? 'Hide' : 'Show'}} Details
										</b-button>
									</template>

									<template #row-details="row">
										<b-card 
											class="bg-light-custom custom-timeline" 
											:title="'Timeline for ' + row.item.first_name + ' ' + row.item.last_name" 
											:sub-title="'Email: ' + row.item.email"
										>
											<div v-for="(item, i) in row.item.timeline" :key="i">
												<vue-timeline-update
													:date="new Date(item.time)"
													title=""
													description=""
													thumbnail=""
													:category="item.message"
													:icon="item.icon"
													:color="item.color"
												/>
											</div>
										</b-card>
									</template>
								</b-table>
							</div>
						</b-tab>
					</b-tabs>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import api from '../../../api/api';
import moment from "moment";

export default {
	metaInfo: {
		title: "Campaigns",
	},
	name: "campaign-show",
	data() {
		return {
			loading: false,
			campaignId: null,
			campaign: null,
			status: false,
			results: [],
			stats: {},
			timeline: [],
			fromAddress: '',
			columns: ["first_name", "last_name", "email", "position", "status", "show_details"],
			cols: [
				{
					label: "First Name",
					field: "first_name",
					thClass: "text-left",
					tdClass: "text-left"
				},
				{
					label: "Last Name",
					field: "last_name",
					thClass: "text-left",
					tdClass: "text-left"
				},
				{
					label: "Email",
					field: "email",
					thClass: "text-left",
					tdClass: "text-left"
				},
				{
					label: "Position",
					field: "position",
					thClass: "text-left",
					tdClass: "text-left"
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
			rows: []
		};
	},
	beforeMount() {
		this.initialize();
	},
	mounted() {
	},
	methods: {
		async initialize() {
			this.campaign = {
				name: "",
				created_date: "",
				launch_date: "",
				send_by_date: "",
				completed_date: "",
				status: "",
				template: {}
			}
			this.campaignId = this.$route.params.id;
			await this.getResults();
			await this.getSummary();
			this.setTimeline();
			this.setUserTimeline();
		},
		setTimeline() {
			this.campaign.timeline.forEach(item => {
				const time = moment(item.time).format('DD/MM/yyyy hh:mm');
				const action = {
					title: item.message,
					content: `${item.email} (${time})`
				};

				this.timeline.push(action);
			});
		},
		setUserTimeline() {
			this.results.forEach(result => {
				result.timeline.forEach(item => {
					switch (item.message) {
						case "Email Sent":
							item.color = "green";
							item.icon = "email";
							break;

						case "Email Opened":
							item.color = "orange";
							item.icon = "drafts";
							break;

						case "Clicked Link":
							item.color = "orange";
							item.icon = "north_west";
							break;

						case "Submitted Data":
							item.color = "red";
							item.icon = "error";
							break;
						
						case "Error Sending Email":
							item.color = "black";
							item.icon = "clear";
							break;
					}
				});
			});
		},
		getSummary() {
			return new Promise((resolve, reject) => {
				api.campaignId.summary(this.campaignId)
				.then(response => {
					this.stats = response.data.stats;
					if (this.campaign.status == "Completed") {
						this.status = true;
					}
					resolve();
				}).catch(err => {
					console.log(err);
					reject();
				});
			})
		},
		getResults() {
			return new Promise((resolve, reject) => {
				api.campaignId.get(this.campaignId)
					.then(response => {
						this.loading = false;
						this.campaign = response.data;
						this.results = response.data.results;
						this.results.forEach(item => {
							item.timeline = response.data.timeline.filter(x => 
								x.email == item.email);
						});
						this.fromAddress = this.getFromAddress(this.campaign.smtp.from_address);
						resolve();
					}).catch(err => {
						console.log(err);
						reject();
					});
			});
		},
		getFromAddress(fromAddres) {
			const regex = /<(.*)>/g;
			const matches = regex.exec(fromAddres);
			let email = fromAddres;
			if (matches) {
				email = matches[1];
			}

			return email;
		},
		refresh() {
			this.loading = true;
			setTimeout(() => {
				this.getResults();
			}, 700);
		},
		exportCSV() {},
		completeCampaign() {
			const _this = this;

			this.$swal.fire({
				title: "Are you sure?",
				text: "This will stop processing events for this campaign",
				icon: "warning",
				showClass: {
					popup: '',
					backdrop: ''
				},
				showCancelButton: true,
				confirmButtonText: "Complete Campaign",
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						api.campaignId.complete(_this.campaignId)
							.then(response => {
								resolve();
							})
							.catch(error => {
								console.log(error);
							})
					});
				}
			})
				.then(function (result) {
					if (result.value) {
						_this.$swal.fire({
							title: 'Campaign Completed!',
							text: 'This campaign has been completed!',
							icon: 'success'
						})
						.then(function (result) {
							api.campaignId.get(_this.campaignId)
								.then(response => {
									_this.status = true;
									_this.getResults();
								})
								.catch(error => {
									console.log(error);
								})
						});
					}
				});
		},
		deleteCamapaign() {
			const _this = this;

			this.$swal.fire({
				title: "Are you sure?",
				text: "This will delete the campaign. This can't be undone!",
				icon: "warning",
				showClass: {
					popup: '',
					backdrop: ''
				},
				showCancelButton: true,
				confirmButtonText: "Delete " + _this.campaign.name,
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						api.campaignId.delete(_this.campaignId)
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
						_this.$swal.fire({
							title: 'Campaign deleted!',
							text: 'This campaign has been deleted!',
							icon: 'success'
						})
						.then(function (result) {
							_this.$router.push('/app/campaigns');
						});
					}
				});
		}
	}
};
</script>

<style>
.vue-horizontal-timeline {
	background-color: transparent !important;
	box-shadow: none !important;
}
.vue-horizontal-timeline .timeline {
	padding: 0 !important;
}
.vue-horizontal-timeline .custom-timeline {
	font-size: 11px !important;
}
.vue-horizontal-timeline .time {
	min-width: 150px;
}
.gb-vue-timeline-update--dark 
.gb-vue-timeline-update__right 
.gb-vue-timeline-update__description,
.gb-base-icon {
	color: #333 !important;
}
.gb-vue-timeline-update .gb-vue-timeline-update__right {
	padding-bottom: 10px !important;
}
.gb-vue-timeline-update--dark .gb-vue-timeline-update__center .gb-vue-timeline-update__bullet,
.gb-vue-timeline-update--dark .gb-vue-timeline-update__right .gb-vue-timeline-update__information 
.gb-vue-timeline-update__meta .gb-vue-timeline-update__category {
	box-shadow: none !important;
}
.bg-light-custom {
	background-color: #f3f3f3;
}
.custom-timeline .card-title {
	margin-bottom: 10px;
}
.custom-timeline .text-muted {
	color: #a2a2a2 !important;
}
.custom-widget-key {
	width: 100%;
}
</style>
