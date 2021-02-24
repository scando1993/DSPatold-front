<template>
	<div class="main-content">
		<breadcumb :page="'New Group'" :folder="''"/>
		<div class="d-flex flex-row">
			<b-button class="mx-3" variant="light" @click="$router.back()">Go back</b-button>
			<b-button class="mx-3" form="form-1" type="reset" variant="danger">Reset</b-button>
			<b-button class="mx-3" form="form-1" type="submit" variant="primary">Submit</b-button>
		</div>
		<div class="my-4"></div>

		<b-row>
			<b-col sm="12">
				<b-card>
					<b-container fluid>
						<b-form id="form-1" @submit="onSubmit" @reset="onReset">
							<b-form-group label="Name:" label-for="input-1">
								<b-form-input
									id="input-1"
									v-model="form.name"
									required
									placeholder="Group name"
								/>
							</b-form-group>
							<b-form-group>
								<b-form-row>
									<b-col cols="6">
										<!-- <b-button variant="danger" @click="importUsers"><b-icon icon="plus"></b-icon> Bulk Import Users</b-button> -->
										<b-form-file v-model="file" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here... " browse-text="Bulk Import Users" @change="importUsers"></b-form-file>
									</b-col>
									<b-col cols="6" class="text-modal">
										<span @click.stop.prevent="downloadTemplate" class="download-btn pointer"><b-icon icon="file-earmark-excel"></b-icon> Download CSV Template</span>
									</b-col>
								</b-form-row>
							</b-form-group>
						</b-form>
						<form @submit="addTarget">
							<b-form-row >
								<b-col>
									<b-form-input
										v-model="userForm.first_name"
										placeholder="First Name"
									/>
								</b-col>
								<b-col>
									<b-form-input
										v-model="userForm.last_name"
										placeholder="Last Name"
									/>
								</b-col>
								<b-col>
									<b-form-input
										v-model="userForm.email"
										placeholder="Email"
										required
									/>
								</b-col>
								<b-col>
									<b-form-input
										v-model="userForm.position"
										placeholder="Position"
									/>
								</b-col>
								<b-col>
									<b-button type="submit" variant="danger"><b-icon icon="plus"></b-icon> Add User</b-button>
								</b-col>
							</b-form-row>
						</form>
						<div class="pt-4">
							<vue-good-table
								:columns="columns"
								:rows="form.targets"
								:search-options="{ enabled: true }"
								styleClass="tableOne vgt-table"
							>
								<template slot="table-row" slot-scope="props">
									<span v-if="props.column.field === 'actions'">
										<span @click="removeTarget(props.row)" title="Delete" class="pointer">
											<b-icon icon="trash"></b-icon>
										</span>
									</span>
									<span v-else>{{ props.formattedRow[props.column.field] }}</span>
								</template>
							</vue-good-table>
						</div>
					</b-container>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import api from '../../../api/api';

export default {
	name: "users-new",
	data() {
		return {
			columns: [
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
					label: "Actions",
					field: "actions",
					thClass: "text-center",
					tdClass: "text-center"
				}
			],
			form: null,
			userForm: null,
			file: null
		};
	},
	beforeMount() {
		this.initForm();
		this.initUserForm();
	},
	methods: {
		initForm() {
			this.form = {
				name: "",
				targets: []
			};
		},
		initUserForm() {
			this.userForm = {
				first_name: "",
				last_name: "",
				email: "",
				position: ""
			};
		},
		onSubmit(evt) {
			evt.preventDefault();

			let _this = this;
			
			this.$swal.fire({
				title: "Are you sure?",
				text: "This will add a new group.",
				icon: "question",
				showClass: {
					popup: '',
					backdrop: ''
				},
				showCancelButton: true,
				confirmButtonText: "Add group",
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						api.groups.post(_this.form)
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
							title: 'Group added successfully!',
							text: 'This group has been added successfully!',
							icon: 'success',
							preConfirm: function() {
								_this.$router.push('/app/groups');
							}
						});
					}
				});
		},
		onReset(evt) {
			evt.preventDefault();
			this.initForm();
			this.initUserForm();
		},
		forceFileDownload(response, title) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', title);
      document.body.appendChild(link);
      link.click();
    },
		downloadTemplate() {
			axios({
        method: 'get',
        url: '/files/group_template.csv',
        responseType: 'arraybuffer',
      })
        .then((response) => {
          this.forceFileDownload(response, "group_template.csv");
        })
        .catch(() => console.log('error occured'))
		},
		addTarget(evt) {
			evt.preventDefault();
			this.form.targets.push(this.userForm);
			this.initUserForm();
		},
		removeTarget(user) {
			this.form.targets = this.form.targets.filter(x => x.email != user.email);
		},
		validateFile(filename) {
			const acceptFileTypes = /(csv|txt)$/i;
			if (!!filename && !acceptFileTypes.test(filename.split(".").pop())) {
				return false;
			}

			return true;
		},
		async importUsers(e) {
			const file = e.target.files[0];
			
			if (!this.validateFile(file.name)) {
				let _this = this;
				
				this.$swal.fire({
					title: "Invalid file extension",
					text: "File extension not suportted (use .csv or .txt)",
					icon: "error",
					showClass: {
						popup: '',
						backdrop: ''
					},
					confirmButtonText: "Ok",
					confirmButtonColor: "#428bca",
					reverseButtons: true,
					allowOutsideClick: false,
					showLoaderOnConfirm: true,
					preConfirm: function () {
						return new Promise(function (resolve, reject) {
							_this.file = null;
							resolve();
						});
					}
				})
			}
			
			const formData = new FormData();
			formData.append("file", file);

			api.import_group(formData)
				.then(response => {
					this.form.targets.push(...response.data);
				})
				.catch(error => {
					console.log(error);
				})
		}
	}
}
</script>

<style scoped>
.text-modal{
	align-self: center;
}
.download-btn {
	color: gray;
}
.pointer {
	cursor: pointer;
}
</style>
