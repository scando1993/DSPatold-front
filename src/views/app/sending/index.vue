<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
		<div class="row">
			<h1 class="page-header">
				Sending Profiles
			</h1>
		</div>

		<div id="flashes" class="row"></div>
		<div class="row">
			<b-button variant="primary" @click="$bvModal.show('modalprofile_1')">+ New Profile</b-button>

		</div>
		&nbsp;

		<div id="emptyMessage" class="row" >
			<div class="alert alert-info">
				No profiles yet. Let's create one!
			</div>
		</div>

		<div>
			<b-modal id="modalprofile_1" hide-footer title="New Sending Profile" size="lg">
				<b-container fluid>
					<form id="form-1" ref="form" >
						<b-form-group id="input-group-1" label="Name:" label-for="input-1" :state="nameState" invalid-feedback="Name is required">
							<b-form-input
								id="input-1"
								required
								:state="nameState"
								v-model="modalForm.f_name"
								placeholder="Profile name"
							></b-form-input>
						</b-form-group>

						<b-form-group id="input-group-2" label="Interface Type:" :state="interfaceState">
							<b-form-input
								id="input-2"
								:readonly="true"
								:state="interfaceState"
								v-model="modalForm.f_interface"

							></b-form-input>
						</b-form-group>

						<b-form-group id="input-group-3" label="From:" label-for="input-3" :state="fromState" invalid-feedback="Name is required">
							<b-form-input
								id="input-3"
								required
								:state="fromState"
								v-model="modalForm.f_from"
								placeholder="First Last <test@example.com>"
							></b-form-input>
						</b-form-group>

						<b-form-group id="input-group-4" label="From:" label-for="input-4" :state="hostState" invalid-feedback="Name is required">
							<b-form-input
								id="input-4"
								required
								:state="hostState"
								v-model="modalForm.f_host"
								placeholder="smtp.example.com:25"
							></b-form-input>
						</b-form-group>

						<b-form-group id="input-group-5" label="Username:" label-for="input-5" :state="userNameState" invalid-feedback="Name is required">
							<b-form-input
								id="input-5"
								required
								:state="userNameState"
								v-model="modalForm.f_userName"
								placeholder="Username"
							></b-form-input>
						</b-form-group>


						<b-form-group id="input-group-6" label="Password:" label-for="input-6" :state="passwordState" invalid-feedback="Name is required">
							<b-form-input
								id="input-6"
								required
								:state="passwordState"
								v-model="modalForm.f_password"
								placeholder="Password"
							></b-form-input>
						</b-form-group>

						<div>
							<b-form-checkbox
								id="checkbox1"
								v-model="modalForm.status_checkbox1"
								name="checkbox1"
								value="accepted"
								unchecked-value="not_accepted"
								>
								Ignore Certificate Errors
							</b-form-checkbox>
						</div>

						<b-container class="bv-example-row" >

							<form ref="additem">
								<b-row>
									<b-col>
										<b-form-group id="input-group-7a"  label-for="input-7a" :state="customHeaderState" invalid-feedback="Name is reaaaaaquired">
											<b-form-input
												id="input-7a"
												required
												:state="customHeaderState"
												v-model="modalForm.f_customHeader"
												placeholder="X-Custom-Header"
											></b-form-input>
										</b-form-group>
									</b-col>

									<b-col>
										<b-form-group id="input-group-7b" label-for="input-7b" :state="urlGoState" invalid-feedback="Name is rebbbbbquired">
											<b-form-input
												id="input-7b"
												required
												:state="urlGoState"
												v-model="modalForm.f_urlGo"
												placeholder="Url}}-gophisp"
											></b-form-input>
										</b-form-group>
									</b-col>


									<b-col>
										<b-button variant="danger" @click.stop.prevent="handleSubmit2">+ Add Custom Header</b-button>

									</b-col>
								</b-row>



							</form>


							<div class="row">

								<div class="col-sm-6">
									<label>Show<b-form-select v-model="perPage" :options="options"></b-form-select>
										entries
									</label>
								</div>

								<div class="col-sm-6">
									<label>Search:
										<input type="search" class="form-control input-sm" placeholder="">
									</label>
								</div>
							</div>

							<div>
								<b-table small :fields="fields" :items="this.modalForm.f_items"
								responsive="sm"
								id="table"
								sticky-header="true"
								:current-page="currentPage"
								:per-page="perPage">
									<template #cell()="data">
										<i>{{ data.value }}</i>
									</template>




								</b-table>
							</div>

							<div class="row">
								<b-pagination
									v-model="currentPage"
									:total-rows="modalForm.f_items.length"
									:per-page="perPage"
									prev-text="Prev"
									next-text="Next"
									aria-controls="table"

								></b-pagination>
							</div>


							<div>
								<b-button variant="success" @click="$bvModal.show('modalprofile_2')">Send Test Email </b-button>

							</div>



							<div class="modal-footer">
								<button type="button" data-dismiss="modal" class="btn btn-default" @click="closeModal('modalprofile_1')">Cancel</button>

								<button type="button" class="btn btn-primary" id="modalSubmitt" @click.stop.prevent="handleSubmit('modalprofile_1')" >Save Profile</button>
							</div>



						</b-container>


					</form>
				</b-container>
			</b-modal>
		</div>

		<div>
			<b-modal id="modalprofile_2" hide-footer title="New Sending Profile">
				<b-container fluid>
					<form id="form_3" ref="sendTestEmail">
						<b-row>
							<b-col>
								<b-form-group id="input-group-8"  label-for="input-8" :state="testFirstNameState" invalid-feedback="Name is reaaaaaquired">
									<b-form-input
										id="input-8"
										required
										:state="testFirstNameState"
										v-model="modalForm.f_testFirstName"
										placeholder="Fisrt Name"
									></b-form-input>
								</b-form-group>
							</b-col>

							<b-col>
								<b-form-group id="input-group-9" label-for="input-9" :state="testLastNameState" invalid-feedback="Name is rebbbbbquired">
									<b-form-input
										id="input-9"
										required
										:state="testLastNameState"
										v-model="modalForm.f_testLastName"
										placeholder="Last Name"
									></b-form-input>
								</b-form-group>
							</b-col>


							<b-col>
								<b-form-group id="input-group-10" label-for="input-10" :state="testEmailState" invalid-feedback="Name is rebbbbbquired">
									<b-form-input
										id="input-10"
										required
										:state="testEmailState"
										v-model="modalForm.f_testEmail"
										placeholder="Email"
									></b-form-input>
								</b-form-group>
							</b-col>

							<b-col>
								<b-form-group id="input-group-11" label-for="input-11" :state="testPositionState" invalid-feedback="Name is rebbbbbquired">
									<b-form-input
										id="input-11"
										required
										:state="testPositionState"
										v-model="modalForm.f_testPosition"
										placeholder="Position"
									></b-form-input>
								</b-form-group>
							</b-col>
						</b-row>

						<div class="modal-footer">
								<button type="button" data-dismiss="modal" class="btn btn-default" @click="closeModal('modalTemplate_1')">Cancel</button>

								<button type="button" class="btn btn-primary" id="modalSubmitt" @click.stop.prevent="handleSubmit3('modalprofile_2')" >Save</button>
						</div>



					</form>

				</b-container>
			</b-modal>
		</div>

		<div>
			<b-table small :fields="fieldsp" :items="dataProfile"
			responsive="sm"
			id="tablep"
			sticky-header="true"
			:current-page="currentPagep"
			:per-page="perPagep">
				<template #cell(nameage)="data">
					{{ data.dataProfile.name }}
				</template>
				<template #cell(imputInterface)="data">
					{{ data.dataProfile.interface }}
				</template>
				<template #cell(imputDate)="data">
					{{ data.dataProfile.modified_day }}
				</template>




			</b-table>
		</div>

	</div>

</template>



<script>


import moment from 'moment'



export default {
	name: "sending",
	components: {
  	},
	data() {
		return {

			fields: ['header',
			'value',
			],
			fieldsp: ['name',
			'interface',
			'modified_day'
			],
			txtA2:'',
			perPage: 5,
			currentPage: 1,
			perPagep: 5,
			currentPagep: 1,
			selected: null,
			options: [5, 10, 20, 50],
			nameState: null,
			userNameState:null,
			passwordState:null,
			interfaceState:null,
			fromState:null,
			hostState:null,
			customHeaderState:null,
			urlGoState:null,
			dataProfile:[],
			testFirstNameState:null,
			testLastNameState:null,
			testPositionState:null,
			testEmailState:null,
			modalForm:{
				f_name:'',
				f_userName:'',
				f_password:'',
				f_interface:'SMTP',
				f_from:'',
				f_host:'',
				f_items:[],
				f_urlGo:'',
				f_customHeader:'',
				status_checkbox1:'accepted',
				now: moment((new Date()).toISOString()).format('YYYY-MM-DD'),
				f_testPosition:'',
				f_testFirstName:'',
				f_testEmail:'',
				f_testLastName:''







			}


		}
	},
	methods:{
		closeModal(id){
			this.$bvModal.hide(id)
		},
		acep(id){

			this.dataProfile.push({
				name:this.modalForm.f_name,
				userName:this.modalForm.f_userName,
				password:this.modalForm.f_password,
				interface:this.modalForm.f_interface,
				from:this.modalForm.f_from,
				host:this.modalForm.f_host,
				items:this.modalForm.f_items,
				urlGo:this.modalForm.f_urlGo,
				customHeader:this.modalForm.f_customHeader,
				status_checkbox1:this.modalForm.status_checkbox1,
				testPosition:this.modalForm.f_testPosition,
				testFirstName:this.modalForm.f_testFirstName,
				testEmail:this.modalForm.f_testEmail,
				testLastName:this.modalForm.f_testLastName,
				modified_day:this.modalForm.now


			});


			console.log(this.dataProfile);
			this.closeModal(id);
		},
		checkFormValidity() {

			const valid = this.$refs.form.checkValidity()

			this.nameState = this.modalForm.f_name!==''
			this.userNameState= this.modalForm.f_userName!==''
			this.passwordState= this.modalForm.f_password!==''
			this.interfaceState= this.modalForm.f_interface!==''
			this.fromState= this.modalForm.f_from!==''
			this.hostState= this.modalForm.f_host!==''


			return valid
		},
		checkFormValidity2() {

			const valid = this.$refs.additem.checkValidity()

			this.customHeaderState = this.modalForm.f_customHeader !==''
			this.urlGoState = this.modalForm.f_urlGo !==''



			return valid
		},

		checkFormValidity3() {

			const valid = this.$refs.sendTestEmail.checkValidity()

			this.testFirstNameState = this.modalForm.f_testFirstName !==''
			this.testLastNameState = this.modalForm.f_testLastName !==''
			this.testPositionState = this.modalForm.f_testPosition !==''
			this.testEmailState = this.modalForm.f_testEmail !==''


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

		handleSubmit2() {

			// Exit when the form isn't valid
			if (!this.checkFormValidity2()) {

			return
			}
			else{

				this.btn_addHeader();
			}

		},

		handleSubmit3(id) {

			// Exit when the form isn't valid
			if (!this.checkFormValidity3()) {

			return
			}
			else{

				this.btn_sendEmail();
				this.closeModal(id)
			}

		},
		btn_addHeader(){
			this.modalForm.f_items.push({header:this.modalForm.f_customHeader , value: this.modalForm.f_urlGo});

		},

		btn_sendEmail(){

			console.log("envia email de prueba")


		}

			}
}
</script>
