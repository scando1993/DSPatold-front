<template>
	<!--	Body start content-->
	<div class="main-content">
		<breadcumb :page="'Email Templates'" :folder="''"/>
		<b-button variant="primary" @click="$router.push('templates/new')">New Template</b-button>
		<div class="my-4"></div>
		
		<b-row>
			<b-col sm="12">
				<b-card>
					<div>
						<b-alert variant="success" :show="isEmpty(templates)">
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
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill'
import moment from 'moment'
import api from '../../../api/api';

export default {
	name: "template",
	components: {
   	quillEditor
  },
	data() {
		return {
			content: '',
			isBadge: true,
			isOpenMobileMenu: false,
			file: null,
			fields: ['name',
			'type',
			],
			txtA2:'',
			currentPage: 1,
			selected: null,
			itemsp:[],
			currentPagep: 1,
			fieldsp: 
			[
			'name',
			'modified_day',
			],
			nameState: null,
			textArea2State:null,
			dataTemplate:[],
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
			templates: [
				{
					id : 1,
					name : "Password Reset Template",
					subject : "{{.FirstName}}, please reset your password.",
					text : "Please reset your password here: {{.URL}}",
					html : "<html><head></head><body>Please reset your password <a href\"{{.URL}}\">here</a></body></html>",
					modified_date : "2016-11-21T18:30:11.1477736-06:00",
					attachments : []
				}
			]
		}
	},
	mounted() {
		api.templates.get()
			.then(response => {
				this.templates = response.data;
			}).catch(err => {
				console.log(err);
			});
	},
	methods:{
		isEmpty(arr) {
			return !Array.isArray(arr) || !arr.length;
		},
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
			this.textArea2State = valid;
			return valid;
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
			
		}
	},
	computed: {
		editor() {
			return this.$refs.myQuillEditor.quill
		}
	}
}
</script>

<style>
</style>