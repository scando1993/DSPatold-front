<template>
	<div class="main-content">
		<!--<div class="row">
			<h1 class="page-header">Email Templates</h1>
		</div>
		<div id="flashes" class="row"></div>-->
		<breadcumb :page="'Email Templates'"/>
		<!--<div class="row">
			<b-button variant="primary" @click="$bvModal.show('modalTemplate_1')"
			>+ New Template</b-button
			>
		</div>-->
		<!--<div id="emptyMessage" class="row" style="display: none">
			<div class="alert alert-info">No templates yet. Let's create one!</div>
		</div>-->

		<div class="ul-todo-list-content">

			<div class="ul-todo-sidebar" :class="{ 'ul-todo-mobile-menu-open ': isOpenMobileMenu }">
				<div class="ul-todo-sidebar-overlay"></div>
				<b-card body-class="p-2" class="h-100">
					<i
							class="todo-sidebar-close i-Close pb-3 float-right"
							@click="isOpenMobileMenu = !isOpenMobileMenu"
					></i>
					<!--<b-button
							v-b-modal.modal-1 block
							variant="primary mb-30"

					>Add Task</b-button>-->

						<!--<b-button variant="primary mb-30" @click="$bvModal.show('modalTemplate_1')">+ New Template</b-button>
-->
					<!--<b-button variant="primary mt-3" @click="$router.push('templates/new')">New Template</b-button>
-->
					<b-button variant="primary" @click="$router.push('templates/new')">New Template</b-button>
					<b-list-group>
						<b-list-group-item class="border-0" href="#">
							<a href>
								<i class="icon-regular i-Find-User mr-2"></i>
								My templates
							</a>
						</b-list-group-item>
						<b-list-group-item class="border-0" href="#">
							<a href>
								<i class="icon-regular i-Favorite-Window mr-2"></i>
								System Templates
							</a>
						</b-list-group-item>
						<b-list-group-item class="border-0" href="#">
							<a href>
								<i class="icon-regular i-Delete-File mr-2"></i>
								Managed Templates
							</a>
						</b-list-group-item>
					</b-list-group>
				</b-card>
			</div>

			<p class="ul-todo-content-right">
				<b-card class="wrapper">
					<i
							class="nav-icon i-Align-Justify-All text-25 ul-contact-mobile-icon mr-2"
							@click="isOpenMobileMenu = !isOpenMobileMenu"
					></i>
					<vue-good-table
							:columns="columns"
							:search-options="{
							  enabled: true,
							  placeholder: 'Search this table'
							}"
							:pagination-options="{
							  enabled: true
							}"
							styleClass="tableOne vgt-table"
							:rows="rows"
					>

						<template slot="table-row" slot-scope="props">
							<!-- <pre>
                              {{ props.row }}
                            </pre> -->
							<span v-if="props.column.field == 'name'">
                <div class="ul-todo-area d-flex">
                  <div>
                    <label class="checkbox checkbox-primary">
                      <input type="checkbox" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div>{{ props.row.name }}</div>
                </div>
              </span>
							<span v-else-if="props.column.field == profileAction">
                <!-- <p>{{props.row.profileAction[0].age}}</p> -->

                <div class="ul-todo-tags d-flex  justify-content-end align-items-center">
                  <span class="d-flex align-items-center ml-2" v-for="(badge, key) in props.row.tags" :key="key">

                    <b-badge class="badge mr-2" :class="badge.badgeColor">{{ badge.text }}</b-badge>

                  <p class="ul-widget4__img mt-2 mb-2 todo-img" >
                    <img
							:src="badge.img"
							class="rounded-circle"
					/>
                  </p>
                  </span>
                </div>
              </span>
							<span v-else-if="props.column.field == 'action'">

                <b-dropdown
						id="dropdown-left"
						variant="link"
						text="Left align"
						toggle-class="text-decoration-none"
						size="sm"
						dropleft
						no-caret
				>
                  <template v-slot:button-content class="_r_btn border-0">
                    <span class="_dot _r_block-dot bg-dark"></span>
                    <span class="_dot _r_block-dot bg-dark"></span>
                    <span class="_dot _r_block-dot bg-dark"></span>
                  </template>
                  <b-dropdown-item  class="dropdown-item"

									@click="editTemplate(props.row)"
									v-b-modal.contact-list-table-modal-2>
                      <i class="nav-icon i-Pen-2 text-success font-weight-bold mr-2"></i>Edit
                  </b-dropdown-item>

                  <b-dropdown-item>
                    <a class="dropdown-item" @click="deleteTemplate(props.index)">
                      <i class="nav-icon i-Close-Window text-danger font-weight-bold mr-2"></i>Delete
                    </a>
                  </b-dropdown-item>
                </b-dropdown>
              </span>

						</template>
					</vue-good-table>
				</b-card>
			</p>

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

						<div class="mb-2">
							<button class="btn btn-danger" @click="$bvModal.show('importEmailModal')">Import Email</button>
						</div>

						<b-form-group id="input-group-2" label="Subject:" label-for="textarea" :state="textArea1State" invalid-feedback="Need to specify at least plaintext or HTML content">

							<b-form-input
								id="input-2"
								v-model="modalForm.f_email_subjet"
								placeholder="Email Subject"
							></b-form-input>
						

							<div class="mt-3">
								<b-tabs>
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
										<div class="example">
											<quill-editor
													class="editor"
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
		<!--<div>
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
		</div>-->
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
			isBadge: true,
			isOpenMobileMenu: false,
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
			},
			columns: [
				{
					label: "Template Name",
					field: "name"
				},
				{
					label: "Updated",
					field: "lastUpdated",
					width: "150px"
				},
				{
					label: "Category",
					field: "category",
				},
				{
					field: "action"
				},

			],
			rows: [
				{
					id: 1,
					name: "Facebook: Alerta de inicio de sesión para su cuenta Usuarios",
					description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
					lastUpdated:"2019-10-18",
					category: 'CEP'
				}
			]
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

<style>
.editor {
	height: 20rem;
	overflow: hidden;
}
</style>
