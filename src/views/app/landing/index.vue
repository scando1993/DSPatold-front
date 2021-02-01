<template>
	<div class="main-content">
		<!--<div class="row">
			<h1 class="page-header">Landing Pages</h1>
		</div>


		<div id="flashes" class="row"></div>-->
		<breadcumb :page="'Landing Pages'" :folder="''"/>
		<!--<div class="row">
			<b-button variant="primary" @click="$bvModal.show('modalLanding_1')"
			>+ New Page</b-button
			>
		</div>-->
		&nbsp;<div class="ul-todo-list-content">
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
					<b-button variant="primary mb-30" @click="$bvModal.show('modalLanding_1')">+ New Page</b-button>

					<b-list-group>
						<b-list-group-item class="border-0" href="#">
							<a href>
								<i class="icon-regular i-Find-User mr-2"></i>
								My Landing Pages
							</a>
						</b-list-group-item>
						<b-list-group-item class="border-0" href="#">
							<a href>
								<i class="icon-regular i-Favorite-Window mr-2"></i>
								System Landing Pages
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

									@click="editLanding(props.row)"
									v-b-modal.contact-list-table-modal-2>
                      <i class="nav-icon i-Pen-2 text-success font-weight-bold mr-2"></i>Edit
                  </b-dropdown-item>

                  <b-dropdown-item>
                    <a class="dropdown-item" @click="deleteLanding(props.index)">
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

		<!--<div id="emptyMessage" class="row" >
			<div class="alert alert-info">No templates yet. Let's create one!</div>
		</div>-->

		<div class="row">

			<div class="col-sm-6">
				<div class="dataTables_length" >

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
					<b-table :fields="fields" :items="dataTemplate"
					responsive="sm"
					id="table"
					sticky-header="true"
					:current-page="currentPage"
					:per-page="perPage">
						<template #cell(nameage)="data">
							{{ data.dataTemplate.name }}
						</template>
						<template #cell(imputDate)="data">
							{{ data.dataTemplate.modified_day }}
						</template>
					</b-table>
				</div>
			</div>
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
			fields: ['name',
			'modified_day',
			],
			perPage: 5,
			currentPage: 1,
			selected: null,
			options: [5, 10, 20, 50],
			modalForm:{
				f_name:'',
				status1:'accepted',
				f_url:'',
				now: moment((new Date()).toISOString()).format('YYYY-MM-DD')

			},
			columns: [
				{
					label: "Title",
					field: "title"
				},
				{
					label: "Updated",
					field: 'lastUpdated'
				},
				{
					field: "action"
				}
			],
			rows: [
				{
					id: 1,
					title: "Office 365 - New Sign-in Experience Custom",
					description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
					lastUpdated: "2019-10-18"
				}
			]
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
