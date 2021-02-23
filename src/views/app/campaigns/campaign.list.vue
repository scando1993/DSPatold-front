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
							<div class="text-center" v-if="loading">
								<!-- <b-spinner></b-spinner> -->
								<b-icon icon="circle-fill" animation="throb"></b-icon>
								Loading...
							</div>
							<div>
								<b-alert variant="success" :show="isEmpty(activeCampaigns) && !loading">
									No campaigns created yet. Let's create one!
								</b-alert>
							</div>
							<vue-good-table
									v-if="!isEmpty(activeCampaigns)"
									:columns="columns"
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

											<b-dropdown-item class="dropdown-item" @click="editCampaign(props.row)">
												<i class="nav-icon i-Statistic text-success font-weight-bold mr-2"></i>View Results
											</b-dropdown-item>
											<b-dropdown-item class="dropdown-item" @click="duplicateCampaign(props.row)">
												<i class="nav-icon i-File-Copy text-info font-weight-bold mr-2"></i>Duplicate
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
						</b-tab>
						<b-tab title="Archived Campaigns">
							<div>
								<b-alert variant="success" :show="isEmpty(archivedCampaigns) && !loading">
									No campaigns archived yet
								</b-alert>
							</div>
							<vue-good-table
									v-if="!isEmpty(archivedCampaigns)"
									:columns="columns"
									:rows="archivedCampaigns"
									:search-options="{ enabled: true }"
									styleClass="tableOne vgt-table"
							>
								<template slot="table-row" slot-scope="props">
									<span v-if="props.column.field === 'name'">
										<router-link :to="{ name: 'campaignShow', params: { id: props.row.id }}">{{ props.row.name }}</router-link>
									</span>
									<span v-if="props.column.field === 'created_date'">
										{{ props.row.created_date | formatDate }}
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

											<b-dropdown-item class="dropdown-item" @click="viewResults(props.row)">
												<i class="nav-icon i-Statistic text-success font-weight-bold mr-2"></i>View Results
											</b-dropdown-item>
											<b-dropdown-item class="dropdown-item" @click="editCampaign(props.row)">
												<i class="nav-icon i-Pen-2 text-info font-weight-bold mr-2"></i>Edit
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
						</b-tab>
					</b-tabs>
				</b-card>
			</b-col>
		</b-row>
	</div>

</template>

<script>
import api from '../../../api/api';

export default {
	metaInfo: {
		title: "Campaigns"
	},
	name: "campaign-dashboard",
	data() {
		return {
			loading: true,
			loading_archived: false,
			show: false,
			sending: false,
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
			activeCampaigns: [],
			archivedCampaigns: []
		}
	},
	mounted() {
		this.getCampaigns();
	},
	methods: {
		getCampaigns() {
			api.campaigns.summary()
				.then(response => {
					this.activeCampaigns = response.data.campaigns.filter(x => x.status == "In progress");
					this.archivedCampaigns = response.data.campaigns.filter(x => x.status == "Completed");
					this.loading = false;
				}).catch(err => {
					console.log(err);
				});
		},
		duplicateCampaign(campaign) {
			api.campaignId.get(campaign.id)
				.then(response => {
					let {id, ...data} = response.data;
					localStorage.setItem('tmpCampaign', JSON.stringify(data));
					this.$router.push('campaigns/new');
				});
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
						// Submit the campaign
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
		isEmpty(arr) {
			return !Array.isArray(arr) || !arr.length;
		}
	}
}
</script>

<style>
</style>
