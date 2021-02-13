<template>
	<div class="main-content">
		<breadcumb :page="'New Email Template'" :folder="''"/>
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
							<b-form-group id="input-group-1" label="Template Name:" label-for="input-1">
								<b-form-input
										id="input-1"
										v-model="form.name"
										required
										placeholder="Template name"
								></b-form-input>
							</b-form-group>

							<div class="mb-2">
								<b-button variant="danger" @click="$bvModal.show('importEmail')">Import Email</b-button>
							</div>

							<b-form-group id="input-group-2" label="Subject:" label-for="input-2">
								<b-form-input
										id="input-2"
										v-model="form.subject"
										placeholder="subject"
								></b-form-input>
							</b-form-group>

							<b-form-group>
								<div class="mt-3">
									<b-tabs>
										<b-tab title="Text" active >
											<div>
												<b-form-textarea	
													id="textarea"
													:state="textArea1State"
													v-model="form.text"
													placeholder="Enter something..."
													rows="8"
												></b-form-textarea>
											</div>
											
										</b-tab>
										<b-tab title="HTML">
											<div class="example">
												<ckeditor v-model="form.html" :config="editorConfig"></ckeditor>
											</div>
										</b-tab>
										
									</b-tabs>
								</div>
							</b-form-group>

							<b-form-group>
								<b-form-checkbox
									id="checkbox-1"
									v-model="form.tracking"
									name="checkbox-1"
									:value="true"
									:unchecked-value="false"
									>
									Add Tracking Image
								</b-form-checkbox>
							</b-form-group>

							<b-form-group>
								<b-form-file v-model="file" class="mt-3" browse-text="'Add File'" plain @input="addFile(file)" ></b-form-file>
							</b-form-group>

							<vue-good-table
								v-if="!isEmpty(this.form.attachments)"
								:columns="fields"
								:rows="this.form.attachments"
								:search-options="{ enabled: true }"
								styleClass="tableOne vgt-table"
								:pagination-options="{
									enabled: true
								}"
							>
								<template slot="table-row" slot-scope="props">
									<span v-if="props.column.field === 'name'"></span>
									
									<span v-if="props.column.field === 'actions'">
										<a class="dropdown-item" @click="removeFile(props.row)">
											<i class="nav-icon i-Close-Window text-danger font-weight-bold mr-2"></i>Delete
										</a>
									</span>
								</template>
							</vue-good-table>
							<!-- <div class="row">
							
								<div class="col-sm-6">
									<div class="dataTables_length" id="attachmentsTable_length">

										<label>Show 
											<b-form-select v-model="perPage" :options="options"></b-form-select>
											entries
										</label>
									</div>
								</div>

								<div class="col-sm-6">
									<div id="attachmentsTable_filter" class="dataTables_filter">
										<label>Search:
											<input type="search" class="form-control input-sm" placeholder="" aria-controls="table">
										</label>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-sm-12">
									<div>
										<b-table small :fields="fields" :items="form.attachments" 
										responsive="sm" 
										id="table1"  
										sticky-header="true"
										:current-page="currentPage"
										:per-page="perPage">
										</b-table>
									</div>
								</div>
							</div>


							<div class="row">
								<b-pagination
									v-model="currentPage"
									:total-rows="form.attachments.length"
									:per-page="perPage"
									prev-text="Prev"
									next-text="Next"
									aria-controls="table1"
								></b-pagination>
							</div> -->

						</b-form>
					</b-container>
				</b-card>
			</b-col>
		</b-row>

		<div>
			<b-modal id="importEmail" hide-footer title="Import Email" size="lg">
				<b-form id="form-import-template">
					<b-form-group id="input-group-import-1" label="Email Content:" label-for="import-input">
						<b-form-textarea	
							id="import-input"
							v-model="import_email.content"
							required
							placeholder="Raw Email Source"
							rows="8"
						></b-form-textarea>
					</b-form-group>

					<b-form-group>
						<b-form-checkbox
							id="checkbox-2"
							v-model="import_email.convert_links"
							name="checkbox-2"
							:value="true"
							:unchecked-value="false"
							>
							Change Links to Point to Landing Page
						</b-form-checkbox>
					</b-form-group>

					<div class="d-flex float-right">
						<b-button class="mx-3" variant="default" @click="closeModal('importEmail')">Cancel</b-button>
						<b-button class="mx-3" variant="success" @click="importEmail('importEmail')">Import</b-button>
					</div>
				</b-form>
			</b-modal>
		</div>
	</div>
</template>

<script>
import api from '../../../api/api';
	
export default {
	name: "template-new",
	data() {
		return {
			form: {
				name : '',
				subject : '',
				text : '',
				html : '',
				attachments : []
			},
			addTrackingImage: true,
			import_email: {
				content: '',
				convert_links: false
			},
			editorData: '<p>Content of the editor.</p>',
			editorConfig: {
				//
			},
			textArea1State: null,
			file: null,
			fields: ['name'],
			options: [5, 10, 20, 50],
			perPage: 5,
			currentPage: 1
		}
	},
	mounted() {
		const template = JSON.parse(localStorage.getItem('tmpTemplate'));

		if (!!template) {
			this.form = template;
			this.form.name = `Copy of ${this.form.name}`;
		}
	},
	methods: {
		onSubmit(evt) {
			evt.preventDefault()
			// Trick to reset/clear native browser form validation state
			this.show = false
			this.$nextTick(() => {
				this.show = false
			});

			let _this = this;
			
			this.$swal.fire({
				title: "Are you sure?",
				text: "This will add a new template.",
				icon: "question",
				showClass: {
					popup: '',
					backdrop: ''
				},
				showCancelButton: true,
				confirmButtonText: "Add template",
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						// Submit the campaign
						api.templates.post(_this.form)
							.then(response => {
								localStorage.removeItem('tmpTemplate');
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
							title: 'Template added successfully!',
							text: 'This template has been added successfully!',
							icon: 'success',
							preConfirm: function() {
								_this.$router.push('/app/templates');
							}
						});
					}
				});
		},
		onReset(evt) {
			evt.preventDefault()
			// Reset our form values
			this.form = {
				name : '',
				subject : '',
				text : '',
				html : '',
				attachments : []
			}
			
			// Trick to reset/clear native browser form validation state
			this.show = false
			this.$nextTick(() => {
				this.show = false
			})
		},
		closeModal(id) {
			this.$bvModal.hide(id);
		},
		importEmail(id) {
			api.import_email(this.import_email)
				.then(response => {
					this.form.text = response.data.text;
					this.form.html = response.data.html;
					this.form.subject = response.data.subject;
					this.closeModal(id);
				} );
		},
		addFile(file) {
			console.log(file);
			this.form.attachments.push({
				content: "",
				name: file.name,
				type: file.type
			});
		},
		removeFile() {},
		isEmpty(arr) {
			return !Array.isArray(arr) || !arr.length;
		}
	}
}
</script>

<style>
.editor {
	height: 20rem;
	overflow: hidden;
}
</style>
