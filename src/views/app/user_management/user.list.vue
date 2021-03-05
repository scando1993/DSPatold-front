<template>
	<div class="main-content">
		<breadcumb :page="'User Management'" :folder="''"/>
		<b-button variant="primary" @click="$router.push('users/new')">New User</b-button>
		<div class="my-4"></div>

		<b-row>
			<b-col sm="12">
				<b-card>
					<div class="text-center" v-if="loading">
						<!-- <b-spinner></b-spinner> -->
						<b-icon icon="circle-fill" animation="throb"></b-icon>
						Loading...
					</div>
					<div>
						<b-alert variant="success" :show="isEmpty(users) && !loading">
							No users created yet. Let's create one!
						</b-alert>
					</div>
					<vue-good-table
							v-if="!isEmpty(users)"
							:columns="columns"
							:rows="users"
							:search-options="{ enabled: true }"
							styleClass="tableOne vgt-table"
					>
						<template slot="table-row" slot-scope="props">
							<span v-if="props.column.field === 'username'">
								<router-link :to="{ name: 'userShow', params: { id: props.row.id }}">{{ props.row.username }}</router-link>
							</span>
							<span v-if="props.column.field === 'role'">
								{{ props.row.role.name }}
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

									<!-- <b-dropdown-item class="dropdown-item" @click="swapUser(props.row)">
										<b-icon icon="arrow-left-right" variant="warning" class="nav-icon font-weight-bold pr-1"></b-icon> Swith User
									</b-dropdown-item> -->
									<b-dropdown-item class="dropdown-item" @click="editUser(props.row)">
										<i class="nav-icon i-Pen-2 text-success font-weight-bold mr-2"></i>Edit
									</b-dropdown-item>
									<b-dropdown-item>
										<a class="dropdown-item" @click="deleteUser(props.row)">
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
import { isEmpty as _isEmpty } from '@/helpers';
import api from '../../../api/api'

export default {
	name: "user-list",
	data() {
		return {
			loading: true,
			users: [],
			columns: [
				{
					label: "Username",
					field: "username",
					thClass: "text-left",
					tdClass: "text-left"
				},
				{
					label: "Role",
					field: "role",
					width: "150px",
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
	mounted() {
		this.getUsers();
	},
	methods: {
		getUsers() {
			api.users.get()
				.then(response => {
					this.users = response.data;
					this.loading = false;
				})
				.catch(error => {
					console.log(error);
				})
		},
		isEmpty(arr){
			return _isEmpty(arr);
		},
		editUser(user) {
			this.$router.push(`users/show/${user.id}`);
		},
		deleteUser(user) {
			const _this = this;

			this.$swal.fire({
				title: "Are you sure?",
				text: "This will delete the user. This can't be undone!",
				icon: "warning",
				showClass: {
					popup: '',
					backdrop: ''
				},
				showCancelButton: true,
				confirmButtonText: "Delete " + user.name,
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						api.userId.delete(user.id)
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
							title: 'User deleted!',
							text: 'This user has been deleted!',
							icon: 'success'
						})
						.then(function (result) {
							_this.getUsers();
						});
					}
				});
		}
	}
}
</script>

<style scoped>
</style>