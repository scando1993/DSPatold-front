<template>
	<!--	Body start content-->
	<div class="main-content">
		<breadcumb :page="'Email Templates'" :folder="''"/>
		<b-button variant="primary" @click="$router.push('templates/new')">New Template</b-button>
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
						<b-alert variant="success" :show="isEmpty(templates) && !loading">
							No templates created yet. Let's create one!
						</b-alert>
					</div>
					<vue-good-table
							v-if="!isEmpty(templates)"
							:columns="columns"
							:rows="templates"
							:search-options="{ enabled: true }"
							styleClass="tableOne vgt-table"
					>
						<template slot="table-row" slot-scope="props">
							<span v-if="props.column.field === 'name'">
								<router-link :to="{ name: 'templateShow', params: { id: props.row.id }}">{{ props.row.name }}</router-link>
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

									<b-dropdown-item class="dropdown-item" @click="duplicateTemplate(props.row)">
										<i class="nav-icon i-File-Copy text-info font-weight-bold mr-2"></i>Duplicate
									</b-dropdown-item>
									<b-dropdown-item class="dropdown-item" @click="editTemplate(props.row)">
										<i class="nav-icon i-Pen-2 text-success font-weight-bold mr-2"></i>Edit
									</b-dropdown-item>
									<b-dropdown-item>
										<a class="dropdown-item" @click="deleteTemplate(props.row)">
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
	name: "template",
	data() {
		return {
			loading: true,
			file: null,
			txtA2:'',
			currentPage: 1,
			columns: [
				{
					label: "Template Name",
					field: "name",
					thClass: "text-left",
					tdClass: "text-left"
				},
				{
					label: "Updated",
					field: "modified_date",
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
			],
			templates: []
		}
	},
	mounted() {
		this.getTemplates();
	},
	methods: {
		getTemplates() {
			api.templates.get()
				.then(response => {
					this.templates = response.data;
					this.loading = false;
				}).catch(err => {
					console.log(err);
				});
		},
		isEmpty(arr) {
			return !Array.isArray(arr) || !arr.length;
		},
		addItemTable(file) {
			this.modalForm.items.push({name: file.name, type: file.type});
		},
		importEmail(id) {
			this.modalForm.f_textArea2=this.txtA2;
			this.closeModal(id);
		},
		closeModal(id) {
			this.$bvModal.hide(id)
		},
		duplicateTemplate(template) {
			api.templateId.get(template.id)
				.then(response => {
					let {id, ...data} = response.data;
					localStorage.setItem('tmpTemplate', JSON.stringify(data));
					this.$router.push('templates/new');
				});
		},
		editTemplate(template) {
			this.$router.push(`templates/show/${template.id}`);
		},
		deleteTemplate(template) {
			const _this = this;

			this.$swal.fire({
				title: "Are you sure?",
				text: "This will delete the template. This can't be undone!",
				icon: "warning",
				showClass: {
					popup: '',
					backdrop: ''
				},
				showCancelButton: true,
				confirmButtonText: "Delete " + template.name,
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						// Submit the campaign
						api.templateId.delete(template.id)
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
							title: 'Template deleted!',
							text: 'This template has been deleted!',
							icon: 'success'
						})
						.then(function (result) {
							_this.getTemplates();
						});
					}
				});
		}
	}
}
</script>

<style>
.spinner-border {
	display: inline-block;
	width: 2rem;
	height: 2rem;
	vertical-align: text-bottom;
	border: .25em solid;
	border-right: .25em solid transparent;
	border-radius: 50%;
	-webkit-animation: spinner-border .75s linear infinite;
	animation: spinner-border .75s linear infinite;
}
</style>