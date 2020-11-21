<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
		<div class="row">
			<h1 class="page-header">Email Templates</h1>
		</div>

		<div id="flashes" class="row"></div>
		<div class="row">
			<b-button variant="primary" @click="$bvModal.show('modalTemplate-1')"
			>+ New Template</b-button
			>
		</div>
		&nbsp;

		<div id="emptyMessage" class="row" style="display: none">
			<div class="alert alert-info">No templates yet. Let's create one!</div>
		</div>
						--modal--	
		<div>
			<b-modal id="modalTemplate-1" hide-footer title="New Template">
				<b-container fluid>
					<b-form id="form-1" >
						<b-form-group id="input-group-1" label="Name:" label-for="input-1">
							<b-form-input
								id="input-1"
								required
								v-model="modalForm.f_name"
								placeholder="Template name"
							></b-form-input>
						</b-form-group>

						<div>              
							<button class="btn btn-danger mt-3" @click="$bvModal.show('importEmailModal')">Import Email</button>
						</div>

						<b-form-group id="input-group-2" label="Subject:" label-for="input-1">

							<b-form-input
								id="input-2"
								required
								v-model="modalForm.f_email_subjet"
								placeholder="Email Subject"
							></b-form-input>
						</b-form-group>

						<div>
							<b-tabs content-class="mt-3">
								<b-tab title="Text" active>
									<div>
										<b-form-textarea	
										id="textarea"
										v-model="modalForm.f_textArea1"
										placeholder="Enter something..."
										rows="8"
										
										></b-form-textarea>
									</div>
									
								</b-tab>
								<b-tab title="HTML">
									<div>
										<b-form-textarea	
										id="html_editor"
										rows="8"
										
										></b-form-textarea>
									</div>
								</b-tab>
								
							</b-tabs>
						</div>

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
							<b-button size="sm" variant="danger" @click="cancel()">
							Cancel
							</b-button>

							<button type="button" class="btn btn-primary" id="modalSubmit">Save Template</button>
						</div>
					</b-form>
				</b-container>
			</b-modal>

	//modal template-1 


			<b-modal id="importEmailModal" hide-footer title="Import Email">
				<b-container fluid>
					<div class="modal-body">
						<div class="row" id="modal.flashes"></div>
						<label class="control-label" for="email">Email Content:</label>
						<div class="form-group">
							<textarea rows="10" id="email_content" class="gophish-editor form-control" placeholder="Raw Email Source"></textarea>
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
						
					</div>
					<div class="modal-footer">
						<button type="button" data-dismiss="modal" class="btn btn-default">Cancel</button>
						<button type="button" class="btn btn-primary" id="modalSubmit" onclick="importEmail()">Import</button>
					</div>
				
				</b-container>
			</b-modal>
		</div>
	</div>
</template>

<script>
import moment from 'moment';

export default {
	name: "template",
	data() {
		return {
			
			file: null,
			fields: ['name',
			'type',
			],
			perPage: 5,
			currentPage: 1,
			selected: null,
			options: [5, 10, 20, 50],

			modalForm:{
				f_name:'',
				f_email_subjet:'',
				f_textArea1:'',
				status:'accepted',
				status2:'accepted',
				items:[]
				


			}
			
			
		}
	},
	methods:{
		addItemTable(file){
			this.modalForm.items.push({name: file.name, type: file.type});
			console.log(this.modalForm)
			
			
        }
	}
}
</script>