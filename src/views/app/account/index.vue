<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
		<div class="row">
			<h1 class="page-header">Settings</h1>
		</div>
		<div>
			<b-tabs content-class="mt-3">
				<b-tab title="Account Settings" active>
					
				</b-tab>
				<b-tab title="UI Settings"><p>I'm the second tab</p></b-tab>
				<b-tab title="Reporting Settings">
					<p>Monitor an IMAP account for emails reported by users.</p>
					<div>
						<b-form-checkbox 
							id="checkbox-1"
							v-model="status1"
							name="checkbox-1"
							value="accepted"
							unchecked-value="not_accepted"
							>
							Enable Email Account Monitoring 
						</b-form-checkbox>
					</div>

					<template>
						<b-container fluid>
							<form ref="form">
								<b-row class="my-2" >
									<b-col sm="3">
										<label >IMAP Host:</label>
									</b-col>
									<b-col sm="9">
										<b-form-group id="input-group-1" label-for="input-1" :state="hostState" invalid-feedback="Host is required">
									
											<b-form-input
													id="input-1"
													required
													:state="hostState"
													v-model="host"
													placeholder="imap.example.com"
													
													
											></b-form-input>
										</b-form-group>
										
									</b-col>
								</b-row>

								<b-row class="my-2" >
									<b-col sm="3">
										<label >IMAP Port:</label>
									</b-col>
									<b-col sm="9">
										<b-form-group id="input-group-2" label-for="input-2" :state="portState" invalid-feedback="Port is required">
									
											<b-form-input
													id="input-2"
													required
													:state="portState"
													v-model="port"
													placeholder="669"
													
													
											></b-form-input>
										</b-form-group>
										
									</b-col>
								</b-row>

								<b-row class="my-2" >
									<b-col sm="3">
										<label >IMAP Username:</label>
									</b-col>
									<b-col sm="9">
										<b-form-group id="input-group-3" label-for="input-3" :state="usernameState" invalid-feedback="Username is required">
									
											<b-form-input
													id="input-3"
													required
													:state="usernameState"
													v-model="username"
													placeholder="Username"
													
													
											></b-form-input>
										</b-form-group>
										
									</b-col>
								</b-row>

								<b-row class="my-2" >
									<b-col sm="3">
										<label >IMAP Password:</label>
									</b-col>
									<b-col sm="9">
										<b-form-group id="input-group-4" label-for="input-4" :state="passState" invalid-feedback="Password is required">
									
											<b-form-input
													id="input-4"
													required
													:state="passState"
													v-model="password"
													placeholder="Password"
													
													
											></b-form-input>
										</b-form-group>
										
									</b-col>
								</b-row>

								<b-row class="my-2" >
									<b-col sm="3">
										<label >Use TLS:</label>
									</b-col>
									<b-col sm="9">
										<b-form-checkbox 
											id="checkbox-2"
											v-model="status2"
											name="checkbox-2"
											value="accepted"
											unchecked-value="not_accepted"
											>
											
										</b-form-checkbox>
										
									</b-col>
								</b-row>

								
							</form>
						</b-container>
					</template>

					<br>
					<div v-on:click="seen = !seen" >
						<u>
							<p style="cursor:s-resize" align="right" >Advanced Settings</p>
						</u>
					</div>

					<template> 
						<b-container fluid>
							<form ref="form2">
								<div v-if="seen" id="hide" >
									<b-row class="my-2" >
										<b-col sm="3">
											<label >Folder:</label>
										</b-col>
										<b-col sm="9">
											<b-form-group id="input-group-5">
												<b-form-input
													id="input-5"
													v-model="folder"
													placeholder="Leave blank for default of INBOX"
												></b-form-input>
											</b-form-group>
										</b-col>
									</b-row>

									<b-row class="my-2" >
										<b-col sm="3">
											<label >Polling frequency:</label>
										</b-col>
										<b-col sm="9">
											<b-form-input
												id="input-6"
												v-model="polling"
												placeholder="Leave blank for default of every 60 seconds"
											></b-form-input>
										</b-col>
									</b-row>

									<b-row class="my-2" >
										<b-col sm="3">
											<label >Restrict to domain:</label>
										</b-col>
										<b-col sm="9">
											<b-form-input
												id="input-7"
												v-model="restrictDomain"
												placeholder="e.g.widgets.com.Leave blank for all domains"
											></b-form-input>
										</b-col>
									</b-row>

									<b-row class="my-2" >
										<b-col sm="3">
											<label >Ignore Certificate Errors:</label>
										</b-col>
										<b-col sm="9">
											<b-form-checkbox 
											id="checkbox-3"
											v-model="status3"
											name="checkbox-3"
											value="accepted"
											unchecked-value="not_accepted"
											>
											</b-form-checkbox>
											
										</b-col>
									</b-row>

									<b-row class="my-2" >
										<b-col sm="3">
											<label >Delete campaigns emails:</label>
										</b-col>
										<b-col sm="9">
											<b-form-checkbox 
											id="checkbox-4"
											v-model="status4"
											name="checkbox-4"
											value="accepted"
											unchecked-value="not_accepted"
											>
											</b-form-checkbox>
											
										</b-col>
									</b-row>


								</div>
							</form>
						</b-container>
					</template>

					<div class="modal-footer" alig="left">
						<button type="button" data-dismiss="modal" class="btn btn-default" @click="closeModal('modalprofile_1')">Save</button>

						<button type="button" class="btn btn-primary" id="modalSubmitt" @click.stop.prevent="handleSubmit('modalprofile_1')" >Test Settings</button>
					</div>



				</b-tab>
			</b-tabs>
		</div>

		

		
	
			
		&nbsp;

		
	</div>

	
</template>

<script>

import moment from 'moment'


export default {
	name: "account",
	
	data() {
		return {
			seen: false,
			portState: null,
			hostState:null,
			passState:null,
			usernameState:null,
			username:'',
			password:'',
			host:'',
			port:'',
			status1:'accepted',
			status2:'not_accepted',

			folder:'',
			polling:'',
			restrictDomain:'',
			status3:'not_accepted',
			status4:'not_accepted',
			now: moment((new Date()).toISOString()).format('YYYY-MM-DD'),

			dataTemplate:[],
			
						


			
			
			
		}
	},
	methods:{
		
		closeModal(id){
			this.$bvModal.hide(id)
		},
		importSite(){
			console.log("omedeto")

			
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
			
			this.portState = this.port !==''
			this.hostState= this.host !==''
			this.passState= this.password !==''
			this.usernameState= this.username !==''
			
			
			return valid 
		},
		
		handleSubmit() {
			
			// Exit when the form isn't valid
			if (!this.checkFormValidity()) {
			return
			}
			else{
				this.importSite();
			}
			
		}
	}
}
</script>

