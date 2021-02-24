<template>
	<!--	Body start content-->
	<div class="main-content">
		<breadcumb :page="'Users & Groups'" :folder="''"/>
		<b-button variant="primary" @click="$router.push('groups/new')">New Group</b-button>
		<div class="my-4"></div>

		<b-row>
			<b-col sm="12">
				<b-card>
					<div class="text-center" v-if="loading">
						<!-- <b-spinner></b-spinner> -->
						<b-icon icon="circle-fill" animation="throb"></b-icon>
						Loading...
					</div>
					<b-alert variant="success" :show="isEmpty(groups)">
						No campaigns created yet. Let's create one!
					</b-alert>
					<vue-good-table
						v-if="!isEmpty(groups)"
						:columns="columns"
						:rows="groups"
						:search-options="{ enabled: true }"
						styleClass="tableOne vgt-table"
					>
						<template slot="table-row" slot-scope="props">
							<span v-if="props.column.field === 'name'">
								<router-link :to="{ name: 'groupShow', params: { id: props.row.id } }">{{ props.row.name }}</router-link>
							</span>
							<span v-if="props.column.field === 'num_targets'">
								{{ props.row.num_targets }}
							</span>
							<span v-if="props.column.field === 'modified_date'">
								{{ props.row.modified_date | formatDate }}
							</span>
							<span v-if="props.column.field == 'actions'">
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

									<b-dropdown-item class="dropdown-item" @click="editGroup(props.row)">
										<i class="nav-icon i-Pen-2 text-success font-weight-bold mr-2"></i>Edit
									</b-dropdown-item>
									<b-dropdown-item>
										<a class="dropdown-item" @click="deleteGroup(props.row)">
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
import { isEmpty as _isEmpty} from '@/helpers';
import api from '../../../api/api';

export default {
	name: "users.list",
	data() {
		return {
			loading: true,
			groups: [],
			columns: [
				{
					label: "Name",
					field: "name",
					thClass: "text-left",
					tdClass: "text-left"
				},
				{
					label: "Members",
					field: "num_targets",
					thClass: "text-left",
					tdClass: "text-left"
				},
				{
					label: "Modified Date",
					field: "modified_date",
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
	mounted () {
		this.getGroups();
	},
	methods: {
		getGroups() {
			api.groups.summary()
			.then(response => {
				this.groups = response.data.groups;
				this.loading = false;
			})
			.catch(error => {
				console.log(error);
			});
		},
		isEmpty(arr){
			return _isEmpty(arr);
		},
		editGroup(group) {
			this.$router.push(`groups/show/${group.id}`);
		},
		deleteGroup(group) {
			const _this = this;

			this.$swal.fire({
				title: "Are you sure?",
				text: "This will delete the group. This can't be undone!",
				icon: "warning",
				showClass: {
					popup: '',
					backdrop: ''
				},
				showCancelButton: true,
				confirmButtonText: "Delete " + group.name,
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						api.groupId.delete(group.id)
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
							title: 'Group deleted!',
							text: 'This group has been deleted!',
							icon: 'success'
						})
						.then(function (result) {
							_this.getGroups();
						});
					}
				});
		}
	}
}
</script>

<style scoped>

</style>
