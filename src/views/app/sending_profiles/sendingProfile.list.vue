<template>
	<!--	Body start content-->
	<div class="main-content">
		<breadcumb :page="'Sending Profiles'" :folder="''"/>
		<b-button variant="primary" @click="$router.push('sending_profiles/new')">New Sending Profile</b-button>
		<div class="my-4"></div>
		
		<b-row>
			<b-col sm="12">
				<b-card>
					<div>
						<b-alert variant="success" :show="isEmpty(profiles)">
							No profiles created yet. Let's create one!
						</b-alert>
					</div>
					<vue-good-table
							v-if="!isEmpty(profiles)"
							:columns="columns"
							:rows="profiles"
							:search-options="{ enabled: true }"
							styleClass="tableOne vgt-table"
					>
						<template slot="table-row" slot-scope="props">
							<span v-if="props.column.field === 'name'">
								<router-link :to="{ name: 'sendingProfileShow', params: { id: props.row.id }}">{{ props.row.name }}</router-link>
							</span>
							<span v-if="props.column.field === 'modified_date'">
								{{ props.row.modified_date | formatDate }}
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

									<b-dropdown-item class="dropdown-item" @click="duplicateProfile(props.row)">
										<i class="nav-icon i-File-Copy text-info font-weight-bold mr-2"></i>Duplicate
									</b-dropdown-item>
									<b-dropdown-item class="dropdown-item" @click="editProfile(props.row)">
										<i class="nav-icon i-Pen-2 text-success font-weight-bold mr-2"></i>Edit
									</b-dropdown-item>
									<b-dropdown-item>
										<a class="dropdown-item" @click="deleteProfile(props.row)">
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
	name: "sending-profile",
	data() {
		return {
			options: [5, 10, 20, 50],
			columns: [
				{
					label: "Name",
					field: "name"
				},
				{
					label: "Modified Date",
					field: 'modified_date'
				},
				{
					label: "Actions",
					field: "actions",
					thClass: "text-right",
					tdClass: "text-right"
				}
			],
			profiles: []
		}
	},
	mounted() {
		api.SMTP.get()
			.then(response => {
				this.profiles = response.data;
			}).catch(err => {
				console.log(err);
			});
	},
	methods: {
		duplicateProfile(profile) {
			api.SMTPId.get(profile.id)
				.then(response => {
					let {id, ...data} = response.data;
					localStorage.setItem('tmpProfile', JSON.stringify(data));
					this.$router.push('sending_profiles/new');
				});
		},
		editProfile(profile) {
			this.$router.push(`sending_profiles/show/${profile.id}`);
		},
		deleteProfile(profile) {
			const _this = this;

			this.$swal.fire({
				title: "Are you sure?",
				text: "This will delete the profile. This can't be undone!",
				icon: "warning",
				showClass: {
					popup: '',
					backdrop: ''
				},
				showCancelButton: true,
				confirmButtonText: "Delete " + profile.name,
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						// Submit the campaign
						api.SMTPId.delete(profile.id)
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
							title: 'Profile deleted!',
							text: 'This profile has been deleted!',
							icon: 'success'
						})
						.then(function (result) {
							_this.$router.go();
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