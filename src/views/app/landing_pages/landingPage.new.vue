<template>
	<div class="main-content">
		<breadcumb :page="'New Landing Page'" :folder="''"/>
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
							<b-form-group id="input-group-1" label="Page Name:" label-for="input-1">
								<b-form-input
									id="input-1"
									v-model="form.name"
									required
									placeholder="Page name"
								></b-form-input>
							</b-form-group>

							<div class="mb-2">
								<b-button variant="danger" @click="$bvModal.show('importSite')">Import Site</b-button>
							</div>

							<b-form-group>
								<div class="mt-3">
									<b-tabs>
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
									v-model="form.capture_credentials"
									name="checkbox-1"
									:value="true"
									:unchecked-value="false"
									v-on:click="form.capture_credentials = !form.capture_credentials"
									>
									Capture Submitted Data
								</b-form-checkbox>
							</b-form-group>
							<div v-if="form.capture_credentials">
								<b-form-group>
									<b-form-checkbox
										id="checkbox-2"
										v-model="form.capture_passwords"
										name="checkbox-2"
										:value="true"
										:unchecked-value="false"
										>
										Capture Passwords
									</b-form-checkbox>
								</b-form-group>
								<b-container>
									<b-alert show variant="warning">
									<i class="fa fa-exclamation-circle"></i>
									Warning: Credentials are currently not encrypted. 
									This means that captured passwords are stored in the database as cleartext. 
									Be careful with this!
								</b-alert>
								</b-container>
								<b-form-group id="input-group-2" label="Redirect to:" label-for="input-2">
									<b-form-input
										id="input-2"
										v-model="form.redirect_url"
										placeholder="http://example.com"
									></b-form-input>
								</b-form-group>
							</div>
						</b-form>
					</b-container>
				</b-card>
			</b-col>
		</b-row>
	
		<div>
			<b-modal id="importSite" hide-footer title="Import Site" size="lg">
				<b-form id="form-import-site">
					<b-form-group id="input-group-import-1" label="URL:" label-for="import-input">
						<b-form-input
							id="import-input"
							v-model="import_url"
							required
							placeholder="http://google.com"
						></b-form-input>
					</b-form-group>

					<div class="d-flex float-right">
						<b-button class="mx-3" variant="default" @click="closeModal('importSite')">Cancel</b-button>
						<b-button class="mx-3" variant="success" @click="importSite('importSite')">Import</b-button>
					</div>
				</b-form>
			</b-modal>
		</div>
	</div>
</template>

<script>
import api from '../../../api/api';

export default {
	name: "landing-new",
	props:['pageId'],
	data() {
		return {
			form: {
				name:'',
				html:'',
				capture_credentials: false,
				capture_passwords: false,
				redirect_url: ''
			},
			editorConfig: {
				fullPage: true,
				extraPlugins: 'docprops',
				allowedContent: true
			},
			import_url: ""
		};
	},
	mounted() {
		const page = JSON.parse(localStorage.getItem('tmpPage'));

		if (!!page) {
			this.form = page;
			this.form.name = `Copy of ${this.form.name}`;
		}
	},
	destroyed() {
		localStorage.removeItem('tmpPage');
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
				text: "This will add a new landing page.",
				icon: "question",
				showClass: {
					popup: '',
					backdrop: ''
				},
				showCancelButton: true,
				confirmButtonText: "Add page",
				confirmButtonColor: "#428bca",
				reverseButtons: true,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				preConfirm: function () {
					return new Promise(function (resolve, reject) {
						// Submit the campaign
						api.pages.post(_this.form)
							.then(response => {
								localStorage.removeItem('tmpPage');
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
							title: 'Page added successfully!',
							text: 'This page has been added successfully!',
							icon: 'success',
							preConfirm: function() {
								_this.$router.push('/app/landing_pages');
							}
						});
					}
				});
		},
		onReset() {
			this.form = {
				name: '',
				html: '',
				capture_credentials: false,
				capture_passwords: false,
				redirect_url: ''
			}
		},
		closeModal(id) {
			this.$bvModal.hide(id);
		},
		importSite(modalId) {
			api.clone_site({url: this.import_url, include_resources: false})
				.then(response => {
					this.form.html = response.data.html;
					this.closeModal(modalId);
				} );
		}
	}
}
</script>

<style>
.ck-content {
	height: 20rem;
	overflow: hidden;
}
</style>