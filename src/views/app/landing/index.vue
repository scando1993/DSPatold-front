<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
		<div class="row">
			<h1 class="page-header">Landing Pages</h1>
		</div>
		

		<div id="flashes" class="row"></div>
		<div class="row">
			<b-button variant="primary" @click="$bvModal.show('modalLanding_1')"
			>+ New Page</b-button
			>
		</div>
		&nbsp;

		<div id="emptyMessage" class="row" >
			<div class="alert alert-info">No templates yet. Let's create one!</div>
		</div>

		<div>
			<b-modal id="modalLanding_1" hide-footer title="New Landing Page">
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
							<b-button variant="primary" @click="$bvModal.show('modalLanding_2')"
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
								v-model="modalForm.status1"
								name="checkbox-2"
								value="accepted"
								unchecked-value="not_accepted"
								>
								Capture Submitted Data 
							</b-form-checkbox>
						</div>
								
						
						<div class="modal-footer">
							<button type="button" data-dismiss="modal" class="btn btn-default" @click="closeModal('modalLanding_1')">Cancel</button>
							<button type="button" class="btn btn-primary" id="modalSubmit" @click.stop.prevent="handleSubmit('modalLanding_1')">Import</button>
						</div>



				
					</form>
				</b-container>
			</b-modal>
		</div>

		<div>
			<b-modal id="modalLanding_2" hide-footer title="Import Site">
				<b-container fluid>
					<form id="form-2" ref="form2" >
						<b-form-group id="input-group-2" label="URL:" label-for="input-2" :state="urlState" invalid-feedback="Name is required">
							<b-form-input
								id="input-2"
								required
								:state="urlState"
								v-model="url"
								placeholder="//google.com"
							></b-form-input>
						</b-form-group>

						<div class="modal-footer">
							<button type="button" data-dismiss="modal" class="btn btn-default" @click="closeModal('modalLanding_2')">Cancel</button>
							<button type="button" class="btn btn-primary" @click.stop.prevent="handleSubmit2('modalLanding_2')">Import</button>
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
			nameState: null,
			urlState:null,
			dataTemplate:[],
			url:'',
			


			modalForm:{
				f_name:'',
				status1:'accepted',
				f_url:'',
				now: moment((new Date()).toISOString()).format('YYYY-MM-DD')
			
			}
			
			
		}
	},
	methods:{
		
		closeModal(id){
			this.$bvModal.hide(id)
		},
		importSite(id){
			this.content=this.url;
			this.closeModal(id);

			
		},
		acep(id){

			this.dataTemplate.push({
				name: this.modalForm.f_name,
				modified_day: this.modalForm.now,
				content:this.content,
				status1:this.modalForm.status1,
				
			});
			
			
			console.log(this.dataTemplate);
			console.log(this.modalForm);
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
				this.importSite(id);
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
