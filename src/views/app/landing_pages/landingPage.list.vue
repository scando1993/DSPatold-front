<template>
	<!--	Body start content-->
	<div class="main-content">
		<breadcumb :page="'Landing Pages'" :folder="''"/>
		<b-button variant="primary" @click="$router.push('landing_pages/new')">New Landing Page</b-button>
		<div class="my-4"></div>
		
		<b-row>
			<b-col sm="12">
				<b-card>
					<div>
						<b-alert variant="success" :show="isEmpty(pages)">
							No pages created yet. Let's create one!
						</b-alert>
					</div>
					<vue-good-table
							v-if="!isEmpty(pages)"
							:columns="columns"
							:rows="pages"
							:search-options="{ enabled: true }"
							styleClass="tableOne vgt-table"
							:pagination-options="{
								enabled: true
							}"
					>
						<template slot="table-row" slot-scope="props">
							<span v-if="props.column.field === 'name'">
								<router-link :to="{ name: 'landingShow', params: { id: props.row.id }}">{{ props.row.name }}</router-link>
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

									<b-dropdown-item class="dropdown-item" @click="duplicatePage(props.row)">
										<i class="nav-icon i-File-Copy text-info font-weight-bold mr-2"></i>Duplicate
									</b-dropdown-item>
									<b-dropdown-item class="dropdown-item" @click="editPage(props.row)">
										<i class="nav-icon i-Pen-2 text-success font-weight-bold mr-2"></i>Edit
									</b-dropdown-item>
									<b-dropdown-item>
										<a class="dropdown-item" @click="deletePage(props.row)">
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
	name: "landing-page",
	data() {
		return {
			options: [5, 10, 20, 50],
			form:{
				name:'',
				html:'',
				capture_credentials: true,
				capture_passwords: true,
				redirect_url: '',
				modified_date: ''
			},
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
			pages: []
		}
	},
	mounted() {
		api.pages.get()
			.then(response => {
				this.pages = response.data;
			}).catch(err => {
				console.log(err);
			});
	},
	methods: {
		isEmpty(arr) {
			return !Array.isArray(arr) || !arr.length;
		},
		duplicatePage(page) {
			api.pageId.get(page.id)
				.then(response => {
					let {id, ...data} = response.data;
					localStorage.setItem('tmpPage', JSON.stringify(data));
					this.$router.push('landing_pages/new');
				});
		},
		editPage(page) {
			this.$router.push(`landing_pages/show/${page.id}`);
		},
		deletePage(page) {
			const _this = this;

			this.$swal.fire({
				title: "Are you sure?",
				text: "This will delete the page. This can't be undone!",
				icon: "warning",
				showClass: {
					popup: '',
					backdrop: ''
				},
				showCancelButton: true,
				confirmButtonText: "Delete " + page.name,
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						// Submit the campaign
						api.pageId.delete(page.id)
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
							title: 'Page deleted!',
							text: 'This page has been deleted!',
							icon: 'success'
						})
						.then(function (result) {
							_this.$router.go();
						});
					}
				});
		}
	}
}
</script>

<style>
</style>