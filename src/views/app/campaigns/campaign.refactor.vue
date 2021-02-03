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
		isEmpty(arr) {
			return !Array.isArray(arr) || !arr.length;
		}
	}
}
</script>

<style>
</style>
