<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
		<div class="row">
			<h1 class="page-header">Settings</h1>
		</div>
		<div>
			<b-tabs content-class="mt-3">
				<b-tab title="Account Settings" active>

					
					
					<template>
						<b-container fluid>
							<form ref="form">
								<b-row class="my-2" >
									<b-col sm="3">
										<label >Gophish version</label>
									</b-col>
									<b-col sm="9">
										<label >LA VERSION</label>
										
									</b-col>
								</b-row>

								<b-row class="my-2" >
									<b-col sm="3">
										<label >API Key:</label>
									</b-col>
									<b-col sm="9">
										<b-form-input
												id="input-2"
												v-model="apikey"
												placeholder="123456789"
												
										></b-form-input>
											
									</b-col>
									<b-col sm="2">
										<button type="button" data-dismiss="modal" class="btn btn-default" >Reset</button>
									</b-col>
								</b-row>

								<b-row class="my-2" >
									<b-col sm="3">
										<label >Username:</label>
									</b-col>
									<b-col sm="9">
										<b-form-group id="input-group-username" label-for="input-username" :state="usernameState" invalid-feedback="Username is required">
									
											<b-form-input
													id="input-username"
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
										<label >Old Password:</label>
									</b-col>
									<b-col sm="9">
										<b-form-group id="input-group-opassword" label-for="input-opassword" :state="passState" invalid-feedback="Password is required">
									
											<b-form-input
													id="input-opassword"
													required
													:state="opassState"
													v-model="opassword"
													
													
													
											></b-form-input>
										</b-form-group>
										
									</b-col>
								</b-row>

								<b-row class="my-2" >
									<b-col sm="3">
										<label >New Password:</label>
									</b-col>
									<b-col sm="9">
										<b-form-group id="input-group-npassword" label-for="input-npassword" :state="passState" invalid-feedback="Password is required">
									
											<b-form-input
													id="input-npassword"
													required
													:state="npassState"
													v-model="npassword"
													
													
													
											></b-form-input>
										</b-form-group>
										
									</b-col>
								</b-row>

								<b-row class="my-2" >
									<b-col sm="3">
										<label >Confirm New Password:</label>
									</b-col>
									<b-col sm="9">
										<b-form-group id="input-group-cnpassword" label-for="input-cnpassword" :state="passState" invalid-feedback="Password is required">
									
											<b-form-input
													id="input-cnpassword"
													required
													:state="cnpassState"
													v-model="cnpassword"
													
													
													
											></b-form-input>
										</b-form-group>
										
									</b-col>
								</b-row>

								

								
							</form>
						</b-container>
					</template>


					<div class="modal-footer" alig="left">
						
						<button type="button" class="btn btn-primary"  >Save</button>
					</div>
					



				</b-tab>
				<b-tab title="UI Settings"><p>I'm the second tab</p></b-tab>
				<b-tab title="Reporting Settings"><p>I'm a disabled tab!</p></b-tab>
			</b-tabs>
		</div>

		
	
			
		&nbsp;

		
	</div>

	
</template>
