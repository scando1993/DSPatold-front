<template>
	<div class="main-content">
		<breadcumb :page="'Dashboard'" :folder="''" />
		<div class="my-4"></div>

		<b-row class="flex">
			<b-col>
				<b-card class="card-icon card-icon-bg-primary o-hidden mb-30 text-center">
					<div class="content">
						<i class="i-Email text-email"></i>
						<p class="text-muted mt-2 mb-0">Email sent</p>
						<p class="text-primary text-24 line-height-1 mb-2">{{ stats.sent }}</p>
					</div>
				</b-card>
			</b-col>
			<b-col>
				<b-card class="card-icon card-icon-bg-primary o-hidden mb-30 text-center">
					<div class="content">
						<i class="i-Mail-Open text-email-opened"></i>
						<p class="text-muted mt-2 mb-0">Email opened</p>
						<p class="text-primary text-24 line-height-1 mb-2">{{ stats.opened }}</p>
					</div>
				</b-card>
			</b-col>
			<b-col>
				<b-card class="card-icon card-icon-bg-primary o-hidden mb-30 text-center">
					<div class="content">
						<i class="i-Cursor-Click-2 text-clicked"></i>
						<p class="text-muted mt-2 mb-0">Clicked link</p>
						<p class="text-primary text-24 line-height-1 mb-2">{{ stats.clicked }}</p>
					</div>
				</b-card>
			</b-col>
			<b-col>
				<b-card class="card-icon card-icon-bg-primary o-hidden mb-30 text-center">
					<div class="content">
						<i class="i-Information text-submitted"></i>
						<p class="text-muted mt-2 mb-0">Submitted data</p>
						<p class="text-primary text-24 line-height-1 mb-2">{{ stats.submitted_data }}</p>
					</div>
				</b-card>
			</b-col>
			<b-col>
				<b-card class="card-icon card-icon-bg-primary o-hidden mb-30 text-center">
					<div class="content">
						<i class="i-Megaphone text-reported"></i>
						<p class="text-muted mt-2 mb-0">Email reported</p>
						<p class="text-primary text-24 line-height-1 mb-2">{{ stats.email_reported }}</p>
					</div>
				</b-card>
			</b-col>
		</b-row>
		<b-row>
			<b-col sm="12">
				<b-card>
					<b-row class="p-3">
						<b-col cols="10">
							<h2 class="pb-2">Recent Campaigns</h2>
						</b-col>
						<b-col cols="2">
							<b-button class="mt-1" variant="primary" @click="viewAll">View All</b-button>
						</b-col>
					</b-row>
					<div class="text-center" v-if="loading">
						<b-icon icon="circle-fill" animation="throb"></b-icon>
						Loading...
					</div>
					<div>
						<b-alert variant="success" :show="isEmpty(campaigns) && !loading">
							No campaigns created yet
						</b-alert>
					</div>
					<vue-good-table
						v-if="!isEmpty(campaigns)"
						:columns="columns"
						:rows="campaigns"
						:search-options="{ enabled: true }"
						styleClass="tableOne vgt-table"
						:pagination-options="{ enabled: true	}"
					>
						<template slot="table-column" slot-scope="props">
							<span v-if="props.column.field === 'name'">
								{{ props.column.label }}
							</span>
							<span v-if="props.column.label === 'Created Date'">
								Created Date
							</span>
							<span v-if="props.column.label === 'Sent'">
								<i class="i-Email text-email"></i>
							</span>
							<span v-if="props.column.label === 'Opened'">
								<i class="i-Mail-Open text-email-opened"></i>
							</span>
							<span v-if="props.column.label === 'Clicked'">
								<i class="i-Cursor-Click-2 text-clicked"></i>
							</span>
							<span v-if="props.column.label === 'Submitted'">
								<i class="i-Information text-submitted"></i>
							</span>
							<span v-if="props.column.label === 'Reported'">
								<i class="i-Megaphone text-reported"></i>
							</span>
							<span v-if="props.column.field === 'status'">
								{{ props.column.label }}
							</span>
							<span v-if="props.column.field === 'actions'">
								{{ props.column.label }}
							</span>
						</template>
						<template slot="table-row" slot-scope="props">
							<span v-if="props.column.field === 'name'">
								<router-link :to="{ name: 'campaignShow', params: { id: props.row.id }}">{{ props.row.name }}</router-link>
							</span>
							<span v-if="props.column.field === 'created_date'">
								{{ props.row.created_date | formatDate }}
							</span>
							<span v-if="props.column.label === 'Sent'">
								{{ props.row.stats.sent }}
							</span>
							<span v-if="props.column.label === 'Opened'">
								{{ props.row.stats.opened }}
							</span>
							<span v-if="props.column.label === 'Clicked'">
								{{ props.row.stats.clicked }}
							</span>
							<span v-if="props.column.label === 'Submitted'">
								{{ props.row.stats.submitted_data }}
							</span>
							<span v-if="props.column.label === 'Reported'">
								{{ props.row.stats.email_reported }}
							</span>
							<span v-if="props.column.field === 'status'">
								<span class="badge badge-pill badge-outline-primary p-2">{{ props.row.status }}</span>
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

									<b-dropdown-item class="dropdown-item" @click="viewResults(props.row)">
										<i class="nav-icon i-Statistic text-success font-weight-bold mr-2"></i>View Results
									</b-dropdown-item>
									<b-dropdown-item>
										<a class="dropdown-item" @click="deleteCampaign(props.row)">
											<i class="nav-icon i-Close-Window text-danger font-weight-bold mr-2"></i>Delete
										</a>
									</b-dropdown-item>
								</b-dropdown>
							</span>
						</template>
					</vue-good-table>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import api from '../../../api/api';

export default {
	metaInfo: {
		title: "Dashboard",
	},
	data() {
		return {
			loading: true,
			campaigns: [],
			columns: [
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
					dateOutputFormat: 'yyyy-MM-dd HH:mm:ss',
					formatFn: value => {
						return value != null ? value : null
					}
				},
				{
					label: "Sent",
					field: "stats",
					thClass: "text-right",
					tdClass: "text-right"
				},
				{
					label: "Opened",
					field: "stats",
					thClass: "text-right",
					tdClass: "text-right"
				},
				{
					label: "Clicked",
					field: "stats",
					thClass: "text-right",
					tdClass: "text-right"
				},
				{
					label: "Submitted",
					field: "stats",
					thClass: "text-right",
					tdClass: "text-right"
				},
				{
					label: "Reported",
					field: "stats",
					thClass: "text-right",
					tdClass: "text-right"
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
			stats: null
		};
	},
	beforeMount() {
		this.initialize();
	},
	mounted() {
		//
	},
	methods: {
		async initialize() {
			this.stats = {
				total: 0,
				sent: 0,
				opened: 0,
				clicked: 0,
				submitted_data: 0,
				email_reported: 0,
				error: 0
			};

			await this.getCampaigns();
		},
		getCampaigns() {
			return new Promise((resolve, reject) => {
				api.campaigns.summary()
					.then(response => {
						this.campaigns = response.data.campaigns;
						this.campaigns.forEach(item => {
							this.stats.total += item.stats.total;
							this.stats.sent += item.stats.sent;
							this.stats.opened += item.stats.opened;
							this.stats.clicked += item.stats.clicked;
							this.stats.submitted_data += item.stats.submitted_data;
							this.stats.email_reported += item.stats.email_reported;
							this.stats.error += item.stats.error;
						});
						this.loading = false;
						resolve();
					})
					.catch(error => {
						const errorMsg = error.response.data.message;
						this.$swal.fire('Error!', errorMsg, 'error');
						reject();
					});
			});
		},
		viewResults(campaign) {
			this.$router.push(`/app/campaigns/show/${campaign.id}`);
		},
		deleteCampaign(campaign) {
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
				confirmButtonText: "Delete " + campaign.name,
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						api.campaignId.delete(campaign.id)
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
							_this.loading = true;
							_this.getCampaigns();
						});
					}
				});
		},
		viewAll() {
			this.$router.push('/app/campaigns/');
		},
		isEmpty(arr) {
			return !Array.isArray(arr) || !arr.length;
		},
	},
};
</script>
<style>
.text-email { color: #1abc9c !important; }
.text-email-opened { color: #f9bf3b !important; }
.text-clicked { color: #f39c12 !important; }
.text-submitted { color: red !important; }
.text-reported { color: #45d6ef !important; }
</style>
