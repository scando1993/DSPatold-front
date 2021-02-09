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
								<button class="btn btn-danger" @click="$bvModal.show('importSite')">Import Site</button>
							</div>

							<b-form-group>
								<div class="mt-3">
									<b-tabs>
										<b-tab title="HTML">
											<div class="example">
												<quill-editor
													class="editor"
													ref="myQuillEditor"
													v-model="form.html"
													:options="editorOption"
													@blur="onEditorBlur($event)"
													@focus="onEditorFocus($event)"
													@ready="onEditorReady($event)"
												/>
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
									:value="capture"
									:unchecked-value="not_capture"
									>
									Capture Submitted Data
								</b-form-checkbox>
							</b-form-group>

						</b-form>
					</b-container>
				</b-card>
			</b-col>
		</b-row>
	
		<div>
			<b-modal id="modal_import" hide-footer title="New Import" size="lg">
				<!-- Add modal form -->
			</b-modal>
		</div>
	</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import api from '../../../api/api';

export default {
	name: "landing-new",
	components: {
		quillEditor
	},
	data() {
		return {
			form: {
				name:'',
				html:'',
				capture_credentials: false,
				capture_passwords: false,
				redirect_url: ''
			},
			editorOption: {
				modules: {
					toolbar: [
						['bold', 'italic', 'underline', 'strike'],
						['blockquote', 'code-block'],
						[{ 'header': 1 }, { 'header': 2 }],
						[{ 'list': 'ordered' }, { 'list': 'bullet' }],
						[{ 'script': 'sub' }, { 'script': 'super' }],
						[{ 'indent': '-1' }, { 'indent': '+1' }],
						[{ 'direction': 'rtl' }],
						[{ 'size': ['small', false, 'large', 'huge'] }],
						[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
						[{ 'font': [] }],
						[{ 'color': [] }, { 'background': [] }],
						[{ 'align': [] }],
						['clean'],
						['link', 'image', 'video']
					],
					syntax: {
						highlight: text => hljs.highlightAuto(text).value
					}
				}
			},
			capture: true,
			not_capture: false
		};
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
			console.log(_this.form);
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
						_this.$swal.fire(
							'Page added successfully!',
							'This page has been added successfully!',
							'success');
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
		importSite(id) {
			this.content = this.url;
			this.closeModal(id);
		},
		acep(id) {
			this.dataTemplate.push({
				name: this.form.name,
				modified_date: this.form.now,
				content:this.content,
				status1:this.form.status1,
			});

			this.closeModal(id);
		},
		checkFormValidity() {
			const valid = this.$refs.form.checkValidity()

			this.nameState = valid

			return valid
		},
		checkFormValidity2() {
			const valid = this.$refs.form2.checkValidity()

			this.urlStat = valid

			return valid
		},
		handleSubmit(id) {
			// Exit when the form isn't valid
			if (!this.checkFormValidity()) return;
			
			this.acep(id);
		},
		handleSubmit2(id) {
			// Exit when the form isn't valid
			if (!this.checkFormValidity2()) return;
			
			this.importSite(id);
		},
		onEditorReady(quill) {},
		onEditorFocus() {},
		onEditorChange({ quill, html, text }) {
			this.content = html
		},
		onEditorBlur() {}
	}
}
</script>

<style>
.editor {
	height: 20rem;
	overflow: hidden;
}
</style>