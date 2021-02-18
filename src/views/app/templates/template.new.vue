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
									v-model="addTrackingImage"
									name="checkbox-1"
									:value="true"
									:unchecked-value="false"
									>
									Add Tracking Image
								</b-form-checkbox>
							</b-form-group>

							<b-form-group>
								<b-form-file v-model="file" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..." @change="handleImage"></b-form-file>
							</b-form-group>

							<vue-good-table
								:columns="fields"
								:rows="form.attachments"
								:search-options="{ enabled: false }"
								styleClass="tableOne vgt-table"
								:pagination-options="{
									enabled: true
								}"
							>
								<template slot="table-row" slot-scope="props">
									<span v-if="props.column.field === 'actions'">
										<a class="dropdown-item" @click="removeFile(props.row)">
											<i class="nav-icon i-Close-Window text-danger font-weight-bold mr-2"></i>Delete
										</a>
									</span>
								</template>
							</vue-good-table>
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
			form: null,
			addTrackingImage: true,
			import_email: {
				content: '',
				convert_links: false
			},
			editorConfig: {
				fullPage: true,
				extraPlugins: 'docprops',
				allowedContent: true,
				startupMode: 'source'
			},
			textArea1State: null,
			file: null,
			fields: [
				{
					label: "Name",
					field: "name",
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
			options: [5, 10, 20, 50]
		}
	},
	beforeMount() {
		this.initialize();
	},
	mounted() {
		const template = JSON.parse(localStorage.getItem('tmpTemplate'));

		if (!!template) {
			this.form = template;
			this.form.name = `Copy of ${this.form.name}`;
			this.checkTracking();
		}
	},
	destroyed() {
		localStorage.removeItem('tmpTemplate');
	},
	methods: {
		initialize() {
			this.form = {
				name : '',
				subject : '',
				text : '',
				html : '',
				attachments : []
			}
		},
		onSubmit(evt) {
			evt.preventDefault();
			this.form.html = this.form.html.replace(/https?:\/\/{{\.URL}}/gi, "{{.URL}}");
			this.changeTags();

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
			this.initialize();
			
			// Trick to reset/clear native browser form validation state
			this.show = false
			this.$nextTick(() => {
				this.show = false
			})
		},
		checkTracking() {
			if (this.form.html.includes("{{.Tracker}}")) {
				this.addTrackingImage = true;
			}
			else {
				this.addTrackingImage = false;
			}
		},
		changeTags() {
			if (this.addTrackingImage) {
				if (!this.form.html) this.form.html = "<html>\n<head>\n\t<title></title>\n</head>\n<body></body>\n</html>\n";
				if (!this.form.html.includes("{{.Tracker}}") &&
						!this.form.html.includes("{{.TrackerUrl}}")) {
					this.form.html = this.form.html.replace("</body>", "{{.Tracker}}</body>");
				}
			} else {
				this.form.html = this.form.html.replace("{{.Tracker}}</body>", "</body>");
			}
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
		createBase64Image(fileObj) {
			const reader = new FileReader();
			const file = {
				type: fileObj.type,
				name: fileObj.name
			};
			reader.onload = (e) => {
				const image = e.target.result;
				this.form.attachments.push({
					content: image,
					...file
				});
				this.file = null;
			}

			reader.readAsDataURL(fileObj);
		},
		handleImage(e) {
			const file = e.target.files[0];
			this.createBase64Image(file);
		},
		removeFile(file) {
			this.form.attachments = this.form.attachments.filter(x => x.content != file.content);
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
