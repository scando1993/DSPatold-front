<template>
	<div class="main-content">
		<breadcumb :page="'New Template'" :folder="'Templates'"/>
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
								<button class="btn btn-danger" @click="$bvModal.show('importEmailModal')">Import Email</button>
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
									v-model="form.tracking"
									name="checkbox-1"
									value="accepted"
									unchecked-value="not_accepted"
									>
									Add Tracking Image
								</b-form-checkbox>
							</b-form-group>

							<b-form-group>
								<b-form-file v-model="file" class="mt-3" browse-text="'Add File'" plain @input="addItemTable(file)" ></b-form-file>
							</b-form-group>

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
							</div> -->

							<!-- <div class="row">
								<div class="col-sm-12">
									<div>
										<b-table small :fields="fields" :items="modalForm.items" 
										responsive="sm" 
										id="table1"  
										sticky-header="true"
										:current-page="currentPage"
										:per-page="perPage">
											<template #cell()="data">
												<i>{{ data.value }}</i>
											</template>
										</b-table>
									</div>
								</div>
							</div> -->


							<!-- <div class="row">
								<b-pagination
									v-model="currentPage"
									:total-rows="modalForm.items.length"
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
	</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
	
export default {
	name: "template-new",
	components: {
   	quillEditor
  },
	data() {
		return {
			form: {
				name : '',
				subject : '',
				text : '',
				html : '',
				attachments : []
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
			textArea1State: null,
			file: null,
			options: [5, 10, 20, 50],
			perPage: 5
		}
	},
	methods: {
		onSubmit(evt) {
			console.log(this.form);
			console.log(this.checkFormValidity());
			evt.preventDefault()
			// Trick to reset/clear native browser form validation state
			this.show = false
			this.$nextTick(() => {
				this.show = false
			});

			let _this = this;
			
			// this.$swal.fire({
			// 	title: "Are you sure?",
			// 	text: "This will schedule the campaign to be launched.",
			// 	icon: "question",
			// 	showClass: {
			// 		popup: '',
			// 		backdrop: ''
			// 	},
			// 	showCancelButton: true,
			// 	confirmButtonText: "Launch",
			// 	confirmButtonColor: "#428bca",
			// 	reverseButtons: true,
			// 	allowOutsideClick: false,
			// 	showLoaderOnConfirm: true,
			// 	preConfirm: function () {
			// 		return new Promise(function (resolve, reject) {
			// 			// Submit the campaign
			// 			api.campaigns.post(_this.form)
			// 				.then(response => {
			// 					resolve();
			// 				})
			// 				.catch(error => {
			// 					const errorMsg = error.response.data.message;
			// 					_this.$swal.close();
			// 					_this.$swal.fire('Error!', errorMsg, 'error');
			// 				})
			// 		});
			// 	}
			// })
			// 	.then(function (result) {
			// 		if (result.value) {
			// 			_this.$swal.fire(
			// 				'Campaign Scheduled!',
			// 				'This campaign has been scheduled for launch!',
			// 				'success');
			// 		}
			// 	});
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
		onEditorReady(quill) {
			console.log('editor ready!', quill)
		},
		onEditorFocus() {},
		onEditorChange({ quill, html, text }) {
			console.log('editor change!', quill, html, text)
			this.content = html
		},
		onEditorBlur() {},
		checkFormValidity() {			
			return !!this.form.text || !!this.form.html;
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
