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
								placeholder="Email Subject"
							></b-form-input>
						</b-form-group>

						<div>
							<b-tabs content-class="mt-3">
								<b-tab title="Text" active>
									<div>
										<b-form-textarea	
										id="textarea"
										
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
								v-model="status"
								name="checkbox-1"
								value="accepted"
								unchecked-value="not_accepted"
								>
								Add Tracking Image
							</b-form-checkbox>
							 <div>State: <strong>{{ status }}</strong></div>
						</div>

						<div>
							<b-button class="btn btn-file btn-danger  mt-3">Add files
								<input id="attachmentUpload" type="file" onchange="attach(this.files)" multiple="">
							</b-button>
					
						</div>

						<div id="attachmentsTable_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
							
							<div class="row">
							
								<div class="col-sm-6">
									<div class="dataTables_length" id="attachmentsTable_length">

										<label>Show 
											<select name="attachmentsTable_length" aria-controls="attachmentsTable" class="form-control input-sm">
												<option value="10">10</option>
												<option value="25">25</option>
												<option value="50">50</option>
												<option value="100">100</option>
											</select> entries
										</label>
									</div>
								</div>

								<div class="col-sm-6">
									<div id="attachmentsTable_filter" class="dataTables_filter">
										<label>Search:
											<input type="search" class="form-control input-sm" placeholder="" aria-controls="attachmentsTable">
										</label>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-sm-12">
									<table id="attachmentsTable" class="table no-footer dataTable" role="grid" aria-describedby="attachmentsTable_info" style="width: 0px;">
										<thead>
											<tr role="row">
												<th class="col-md-1 no-sort sorting_disabled" rowspan="1" colspan="1" aria-label="" style="width: 0px;"></th>
												<th class="col-md-10 sorting_asc" tabindex="0" aria-controls="attachmentsTable" rowspan="1" colspan="1" aria-label="Name: activate to sort column descending" style="width: 0px;" aria-sort="ascending">Name</th>
												<th class="col-md-1 no-sort sorting_disabled" rowspan="1" colspan="1" aria-label="" style="width: 0px;"></th>
												<th class="datatable_hidden no-sort sorting_disabled" rowspan="1" colspan="1" aria-label="Content" style="width: 0px;">Content</th>
												<th class="datatable_hidden no-sort sorting_disabled" rowspan="1" colspan="1" aria-label="Type" style="width: 0px;">Type</th>
											</tr>
										</thead>
										<tbody>
											<tr class="odd">
												<td valign="top" colspan="3" class="dataTables_empty">No data available in table</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>


							<div class="row">
								<div class="col-sm-5">
									<div class="dataTables_info" id="attachmentsTable_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div>
								</div>
								<div class="col-sm-7">
									<div class="dataTables_paginate paging_simple_numbers" id="attachmentsTable_paginate">
										<ul class="pagination">
											<li class="paginate_button previous disabled" id="attachmentsTable_previous">
												<a href="#" aria-controls="attachmentsTable" data-dt-idx="0" tabindex="0">Previous</a>
											</li>
											<li class="paginate_button next disabled" id="attachmentsTable_next">
												<a href="#" aria-controls="attachmentsTable" data-dt-idx="1" tabindex="0">Next</a>
											</li>
										</ul>
									</div>
								</div>
							</div>

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
								v-model="status"
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
	metaInfo: {
		title: "Templates"
	},
	name: "template",
	data() {
		return {
			status:'accepted',
		}
	}
}
</script>