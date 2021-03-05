<template>
	<!--	Body start content-->
	<div class="main-content">
		<breadcumb :page="'Webhooks'" :folder="''"/>
		<b-button variant="primary" @click="$router.push('webhooks/new')">New Webhook</b-button>
		<div class="my-4"></div>
		
		<b-row>
			<b-col sm="12">
				<b-card>
					<div class="text-center" v-if="loading">
						<b-icon icon="circle-fill" animation="throb"></b-icon>
						Loading...
					</div>
					<div>
						<b-alert variant="success" :show="isEmpty(webhooks) && !loading">
							No webhooks created yet. Let's create one!
						</b-alert>
					</div>
					<vue-good-table
							v-if="!isEmpty(webhooks)"
							:columns="columns"
							:rows="webhooks"
							:search-options="{ enabled: true }"
							styleClass="tableOne vgt-table"
							:pagination-options="{ enabled: true }"
					>
						<template slot="table-row" slot-scope="props">
							<span v-if="props.column.field === 'name'">
								<router-link :to="{ name: 'webhookShow', params: { id: props.row.id }}">{{ props.row.name }}</router-link>
							</span>
							<span v-if="props.column.field === 'url'">
								{{ props.row.url }}
							</span>
							<span v-if="props.column.field === 'is_active'">
								{{ props.row.is_active }}
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

									<b-dropdown-item class="dropdown-item" @click="ping(props.row)">
										<i class="nav-icon i-Internet text-primary mr-2"></i>Ping
									</b-dropdown-item>
									<b-dropdown-item class="dropdown-item" @click="editWebhook(props.row)">
										<i class="nav-icon i-Pen-2 text-success font-weight-bold mr-2"></i>Edit
									</b-dropdown-item>
									<b-dropdown-item>
										<a class="dropdown-item" @click="deleteWebhook(props.row)">
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
	name: "webhooks",
	data() {
		return {
			loading: true,
			columns: [
				{
					label: "Name",
					field: "name"
				},
				{
					label: "Url",
					field: 'url'
				},
				{
					label: "Is Active",
					field: 'is_active'
				},
				{
					label: "Actions",
					field: "actions",
					thClass: "text-right",
					tdClass: "text-right"
				}
			],
			webhooks: []
		}
	},
	mounted() {
		api.webhooks.get()
			.then(response => {
				this.webhooks = response.data;
				this.loading = false;
			}).catch(err => {
				this.loading = false;
				console.log(err);
			});
	},
	methods: {
		isEmpty(arr) {
			return !Array.isArray(arr) || !arr.length;
		},
		editWebhook(webhook) {
			this.$router.push(`webhooks/show/${webhook.id}`);
		},
		deleteWebhook(webhook) {
			const _this = this;

			this.$swal.fire({
				title: "Are you sure?",
				text: `This will delete the webhook '${webhook.name}'`,
				icon: "warning",
				showClass: {
					popup: '',
					backdrop: ''
				},
				showCancelButton: true,
				confirmButtonText: "Delete",
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						api.webhookId.delete(webhook.id)
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
							title: 'Webhook deleted!',
							text: 'This webhook has been deleted!',
							icon: 'success'
						})
						.then(function (result) {
							_this.$router.go();
						});
					}
				});
		},
		ping(webhook) {
			api.webhookId.ping(webhook.id)
				.then(response => {
					this.$swal.fire('Success!', `Ping of "${webhook.name}" webhook succeeded`, 'success');
				})
				.catch(error => {
					const errorMsg = error.response.data.message;
					this.$swal.fire(`Ping of "${webhook.name}" webhook failed`, errorMsg, 'error');
				})
		}
	}
}
</script>

<style>
</style>