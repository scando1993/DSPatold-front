<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
		<div class="row">
			<h1 class="page-header">Landing Pages</h1>
		</div>
		

		<div id="flashes" class="row"></div>
		<div class="row">
			<b-button variant="primary" @click="$bvModal.show('modalTemplate_1')"
			>+ New Page</b-button
			>
		</div>
		&nbsp;

		<div id="emptyMessage" class="row" >
			<div class="alert alert-info">No templates yet. Let's create one!</div>
		</div>

		<div>
			<b-modal id="modalTemplate_1" hide-footer title="New Landing Page">
				<b-container fluid>
					<form id="form-1" ref="form" >
						<b-form-group id="input-group-1" label="Name:" label-for="input-1" :state="nameState" invalid-feedback="Name is required">
							<b-form-input
								id="input-1"
								required
								:state="nameState"
								v-model="modalForm.f_name"
								placeholder="Page name"
							></b-form-input>
						</b-form-group>

						<div class="row">
							<b-button variant="primary" @click="$bvModal.show('modalTemplate_1')"
							>Import Page</b-button
							>
						</div>

						<quill-editor
							ref="myQuillEditor"
							v-model="content"
							:options="editorOption"
							@blur="onEditorBlur($event)"
							@focus="onEditorFocus($event)"
							@ready="onEditorReady($event)"
						/>

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



				
					</form>
				</b-container>
			</b-modal>
		</div>

	</div>

	

	
</template>

<script>

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

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
