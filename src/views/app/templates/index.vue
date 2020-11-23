<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
		<div class="row">
			<h1 class="page-header">Email Templates</h1>
		</div>
		

		<div id="flashes" class="row"></div>
		<div class="row">
			<b-button variant="primary" @click="$bvModal.show('modalTemplate_1')"
			>+ New Template</b-button
			>
		</div>
		&nbsp;

		<div id="emptyMessage" class="row" style="display: none">
			<div class="alert alert-info">No templates yet. Let's create one!</div>
		</div>
							
		<div>
			<b-modal id="modalTemplate_1" hide-footer title="New Template">
				<b-container fluid>
					<form id="form-1" ref="form" >
						<b-form-group id="input-group-1" label="Name:" label-for="input-1" :state="nameState" invalid-feedback="Name is required">
							<b-form-input
								id="input-1"
								required
								:state="nameState"
								v-model="modalForm.f_name"
								placeholder="Template name"
							></b-form-input>
						</b-form-group>

						<div>              
							<button class="btn btn-danger mt-3" @click="$bvModal.show('importEmailModal')">Import Email</button>
						</div>

						<b-form-group id="input-group-2" label="Subject:" label-for="textarea" :state="textArea1State" invalid-feedback="Need to specify at least plaintext or HTML content">

							<b-form-input
								id="input-2"
								v-model="modalForm.f_email_subjet"
								placeholder="Email Subject"
							></b-form-input>
						

							<div>
								<b-tabs content-class="mt-3">
									<b-tab title="Text" active >
										<div>
											<b-form-textarea	
											id="textarea"
											required
											:state="textArea1State"
											v-model="modalForm.f_textArea1"
											placeholder="Enter something..."
											rows="8"
											
											></b-form-textarea>
										</div>
										
									</b-tab>
									<b-tab title="HTML">
										<div>
											<quill-editor
												ref="myQuillEditor"
												v-model="modalForm.f_contentEditor"
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

						<div>
							<b-form-checkbox
								id="checkbox-1"
								v-model="modalForm.status1"
								name="checkbox-1"
								value="accepted"
								unchecked-value="not_accepted"
								>
								Add Tracking Image
							</b-form-checkbox>
							
						</div>


						<div>
							<b-form-file v-model="file" class="mt-3" browse-text="'Add File'" plain @input="addItemTable(file)" ></b-form-file>
						</div>

						
						<div class="row">
						
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
						</div>


						<div class="row">
							<b-pagination
								v-model="currentPage"
								:total-rows="modalForm.items.length"
								:per-page="perPage"
								prev-text="Prev"
								next-text="Next"
								aria-controls="table1"
								
							></b-pagination>
						</div>

						

						<div class="modal-footer">
							<button type="button" data-dismiss="modal" class="btn btn-default" @click="closeModal('modalTemplate_1')">Cancel</button>

							<button type="button" class="btn btn-primary" id="modalSubmitt" @click.stop.prevent="handleSubmit('modalTemplate_1')" >Save Template</button>
						</div>
					</form>
				</b-container>
			</b-modal>

	      


			<b-modal id="importEmailModal" hide-footer title="Import Email">
				<b-container fluid>
					<form id="form-2" ref="form2" >
						<b-form-group id="input-group-2" label="Email Content:" label-for="email_content" :state="textArea2State" invalid-feedback="Email Content is required">
							<div>
								<textarea rows="10" id="email_content" required
									:state="textArea2State" v-model="txtA2" class="form-control" placeholder="Raw Email Source"></textarea>
							</div>
							<div>
								<b-form-checkbox 
									id="checkbox-2"
									v-model="modalForm.status2"
									name="checkbox-2"
									value="accepted"
									unchecked-value="not_accepted"
									>
									Change Links to Point to Landing Page
								</b-form-checkbox>
							</div>
								
							
							<div class="modal-footer">
								<button type="button" data-dismiss="modal" class="btn btn-default" @click="closeModal('importEmailModal')">Cancel</button>
								<button type="button" class="btn btn-primary" id="modalSubmit" @click.stop.prevent="handleSubmit2('importEmailModal')">Import</button>
							</div>
						</b-form-group>
					</form>
				
				</b-container>
			</b-modal>

		


		</div>


		<div>
			<b-table small :fields="fieldsp" :items="dataTemplate" 
			responsive="sm" 
			id="tablep"  
			sticky-header="true"
			:current-page="currentPagep"
			:per-page="perPagep">
				<template #cell(nameage)="data">
					{{ data.dataTemplate.name }} 
				</template>
				<template #cell(imputDate)="data">
					{{ data.dataTemplate.modified_day }} 
				</template>

				

				
			</b-table>
		</div>


	</div>
</template>

<script>

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill'
import moment from 'moment'



export default {
	name: "template",
	components: {
    quillEditor
  	},
	data() {
		return {
			content: '',
        	editorOption: {
          // Some Quill options...
        	},
			
			file: null,
			fields: ['name',
			'type',
			],
			txtA2:'',
			perPage: 5,
			currentPage: 1,
			selected: null,
			options: [5, 10, 20, 50],
			itemsp:[],
			perPagep: 5,
			currentPagep: 1,
			fieldsp: 
			[
			'name',
			'modified_day',
			],
			nameState: null,
			textArea1State:null,
			textArea2State:null,
			dataTemplate:[],
			


			modalForm:{
				f_name:'',
				f_email_subjet:'',
				f_textArea1:'',
				f_textArea2:'',
				f_contentEditor:'',
				status1:'accepted',
				status2:'accepted',
				items:[],
				now: moment((new Date()).toISOString()).format('YYYY-MM-DD')
			
				
				


			}
			
			
		}
	},
	methods:{
		addItemTable(file){
			this.modalForm.items.push({name: file.name, type: file.type});
			console.log(this.modalForm)
		},
		importEmail(id){
			this.modalForm.f_textArea2=this.txtA2;
			this.closeModal(id);
			
		},
		closeModal(id){
			this.$bvModal.hide(id)
		},
		acep(id){

			this.dataTemplate.push({
				name: this.modalForm.f_name,
				modified_day: this.modalForm.now,
				f_email_subjet:this.modalForm.f_email_subjet,
				f_textArea1:this.modalForm.f_textArea1,
				f_textArea2:this.modalForm.f_textArea2,
				f_contentEditor:this.modalForm.f_contentEditor,
				status1:this.modalForm.status1,
				status2:this.modalForm.status2,
				items:this.modalForm.items
			});
			
			
			console.log(this.dataTemplate);
			console.log(this.modalForm);
			this.closeModal(id);	
		},
		checkFormValidity() {
			
			const valid = this.$refs.form.checkValidity()
			
			this.nameState = this.modalForm.f_name!==''
			this.textArea1State = this.modalForm.f_textArea1 !==''
			
			return valid && this.textArea1State
		},
		checkFormValidity2() {
			
			const valid = this.$refs.form2.checkValidity()
			
			
			this.textArea2State = valid
			
			return valid
		},

		handleSubmit(id) {
			
			// Exit when the form isn't valid
			if (!this.checkFormValidity()) {
			return
			}
			else{
				this.acep(id);
			}
			
		},

		handleSubmit2(id) {
			
			// Exit when the form isn't valid
			if (!this.checkFormValidity2()) {
			return
			}
			else{
				this.importEmail(id);
			}
			
		},
		
		
		
		
		onEditorReady(quill) {
			console.log('editor ready!', quill)
		},
		onEditorChange({ quill, html, text }) {
			console.log('editor change!', quill, html, text)
			this.content = html
		}
	},
	computed: {
		editor() {
			return this.$refs.myQuillEditor.quill
		}
	},
	mounted() {
		console.log('this is current quill instance object', this.editor)
	}
}
</script>