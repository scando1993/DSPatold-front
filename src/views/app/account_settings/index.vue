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
              <form id="form" @submit="submitSettings">
                <b-row class="my-2">
                  <b-col sm="3">
                    <label>Gophish version</label>
                  </b-col>
                  <b-col sm="9">
                    <label>0.11.0</label>
                  </b-col>
                </b-row>

                <b-row class="my-2">
                  <b-col sm="3">
                    <label>API Key:</label>
                  </b-col>
                  <b-col sm="7">
                    <b-form-input
                      id="input-apiKey"
                      v-model="apiKey"
                      placeholder="123456789"
                    ></b-form-input>
                  </b-col>
                  <b-col sm="2">
                    <b-button
                      type="button"
                      data-dismiss="modal"
                      class="btn btn-default"
                      variant="success"
											@click="reset"
                      >Reset</b-button>
                  </b-col>
                </b-row>

                <b-row class="my-2">
                  <b-col sm="3">
                    <label>Username:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-group
                      id="input-group-username"
                      label-for="input-username"
                      invalid-feedback="Username is required"
                    >
                      <b-form-input
                        id="input-username"
                        required
                        v-model="account.username"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row class="my-2">
                  <b-col sm="3">
                    <label>Old Password:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-group
                      id="input-group-opassword"
                      label-for="input-opassword"
                      invalid-feedback="Password is required"
                    >
                      <b-form-input
                        id="input-opassword"
                        required
                        v-model="account.current_password"
												type="password"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row class="my-2">
                  <b-col sm="3">
                    <label>New Password:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-group
                      id="input-group-npassword"
                      label-for="input-npassword"
                      invalid-feedback="Password is required"
                    >
                      <b-form-input
                        id="input-npassword"
                        required
                        v-model="account.new_password"
												type="password"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row class="my-2">
                  <b-col sm="3">
                    <label>Confirm New Password:</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-group
                      id="input-group-cnpassword"
                      label-for="input-cnpassword"
                      invalid-feedback="Password is required"
                    >
                      <b-form-input
                        id="input-cnpassword"
                        required
                        v-model="account.confirm_new_password"
												type="password"
                      ></b-form-input>
                    </b-form-group>
										<div v-show="!!error" class="mt-2">
											<b-alert show variant="danger">
												{{ error }}
											</b-alert>
										</div>
                  </b-col>
                </b-row>
								<div class="modal-footer" alig="left">
									<button type="submit" class="btn btn-primary">Save</button>
								</div>
              </form>
            </b-container>
          </template>
        </b-tab>

        <b-tab title="UI Settings">
          <b-form-checkbox
            id="checkbox-5"
            v-model="show_map"
            name="checkbox-5"
            :value="true"
            :unchecked-value="false"
						@change="setMapValue"
            >Show campaign results map
          </b-form-checkbox>
        </b-tab>
        <b-tab title="Reporting Settings">
					<form id="formIMAP" @submit="postIMAP">
						<p>Monitor an IMAP account for emails reported by users.</p>
						<div>
							<b-form-checkbox
								id="checkbox-1"
								v-model="imapSettings.enabled"
								name="checkbox-1"
								:disabled="blocked"
								:value="true"
								:unchecked-value="false"
							>
								Enable Email Account Monitoring
							</b-form-checkbox>
						</div>

						<template>
							<b-container fluid>
								<b-row class="my-2">
									<b-col sm="3">
										<label>IMAP Host:</label>
									</b-col>
									<b-col sm="9">
										<b-form-group
											id="input-group-1"
											label-for="input-1"
											invalid-feedback="Host is required"
										>
											<b-form-input
												id="input-1"
												required
												v-model="imapSettings.host"
												:disabled="blocked"
												placeholder="imap.example.com"
											></b-form-input>
										</b-form-group>
									</b-col>
								</b-row>

								<b-row class="my-2">
									<b-col sm="3">
										<label>IMAP Port:</label>
									</b-col>
									<b-col sm="9">
										<b-form-group
											id="input-group-2"
											label-for="input-2"
											invalid-feedback="Port is required"
										>
											<b-form-input
												id="input-2"
												required
												v-model="imapSettings.port"
												:disabled="blocked"
												placeholder="993"
											></b-form-input>
										</b-form-group>
									</b-col>
								</b-row>

								<b-row class="my-2">
									<b-col sm="3">
										<label>IMAP Username:</label>
									</b-col>
									<b-col sm="9">
										<b-form-group
											id="input-group-3"
											label-for="input-3"
											invalid-feedback="Username is required"
										>
											<b-form-input
												id="input-3"
												required
												v-model="imapSettings.username"
												:disabled="blocked"
												placeholder="Username"
											></b-form-input>
										</b-form-group>
									</b-col>
								</b-row>

								<b-row class="my-2">
									<b-col sm="3">
										<label>IMAP Password:</label>
									</b-col>
									<b-col sm="9">
										<b-form-group
											id="input-group-4"
											label-for="input-4"
											invalid-feedback="Password is required"
										>
											<b-form-input
												id="input-4"
												required
												v-model="imapSettings.password"
												:disabled="blocked"
												type="password"
												placeholder="Password"
											></b-form-input>
										</b-form-group>
									</b-col>
								</b-row>

								<b-row class="my-2">
									<b-col sm="3">
										<label>Use TLS:</label>
									</b-col>
									<b-col sm="9">
										<b-form-checkbox
											id="checkbox-2"
											v-model="imapSettings.tls"
											name="checkbox-2"
											:disabled="blocked"
											:value="true"
											:unchecked-value="false"
										></b-form-checkbox>
									</b-col>
								</b-row>
							</b-container>
						</template>

						<br />
						<div v-on:click="advanced = !advanced">
							<u>
								<p style="cursor: pointer" align="right">Advanced Settings</p>
							</u>
						</div>

						<template>
							<b-container fluid>
								<div v-if="advanced" id="hide">
									<b-row class="my-2">
										<b-col sm="3">
											<label>Folder:</label>
										</b-col>
										<b-col sm="9">
											<b-form-group id="input-group-5">
												<b-form-input
													id="input-5"
													v-model="imapSettings.folder"
													:disabled="blocked"
													placeholder="Leave blank for default of INBOX"
												></b-form-input>
											</b-form-group>
										</b-col>
									</b-row>

									<b-row class="my-2">
										<b-col sm="3">
											<label>Polling frequency:</label>
										</b-col>
										<b-col sm="9">
											<b-form-input
												id="input-6"
												v-model="imapSettings.imap_freq"
												:disabled="blocked"
												placeholder="Leave blank for default of every 60 seconds"
											></b-form-input>
										</b-col>
									</b-row>

									<b-row class="my-2">
										<b-col sm="3">
											<label>Restrict to domain:</label>
										</b-col>
										<b-col sm="9">
											<b-form-input
												id="input-7"
												v-model="imapSettings.restrict_domain"
												:disabled="blocked"
												placeholder="e.g. widgets.com.Leave blank for all domains"
											></b-form-input>
										</b-col>
									</b-row>

									<b-row class="my-2">
										<b-col sm="3">
											<label>Ignore Certificate Errors:</label>
										</b-col>
										<b-col sm="9">
											<b-form-checkbox
												id="checkbox-3"
												v-model="imapSettings.ignore_cert_errors"
												name="checkbox-3"
												:disabled="blocked"
												:value="true"
												:unchecked-value="false"
											></b-form-checkbox>
										</b-col>
									</b-row>

									<b-row class="my-2">
										<b-col sm="3">
											<label>Delete campaigns emails:</label>
										</b-col>
										<b-col sm="9">
											<b-form-checkbox
												id="checkbox-4"
												v-model="imapSettings.delete_reported_campaign_email"
												name="checkbox-4"
												:disabled="blocked"
												:value="true"
												:unchecked-value="false"
											></b-form-checkbox>
										</b-col>
									</b-row>
								</div>
							</b-container>
						</template>

						<div class="modal-footer" alig="left">
							<button
								type="submit"
								data-dismiss="modal"
								class="btn btn-success"
								:disabled="blocked"
								form="formIMAP">
								Save
							</button>
							<button
								type="button"
								class="btn btn-primary"
								id="modalSubmitt"
								:disabled="blocked"
								@click.prevent="validate">
								<b-icon icon="wrench" v-if="!blocked"></b-icon>
								<b-icon icon="circle-fill" v-if="!!blocked" animation="throb"></b-icon> Test Settings
							</button>
						</div>
					</form>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import api from "../../../api/api";

export default {
  name: "account",

  data() {
    return {
      account: null,
      imapSettings: null,
      show_map: false,
      advanced: false,
			apiKey: '',
			error: false,
			blocked: false
    };
  },
  beforeMount() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.account = {
        username: '',
        current_password: '',
        new_password: '',
        confirm_new_password: '',
        csrf_token: "4Q6oMySPgzXi/QE8pbi75FW66D/zYMOPducJvnEMeCVOsR/fd1uPpqwIGLoUAGcYHbiiKzDPB4tLDReD5Mz7rA=="
      };

      this.imapSettings = {
        delete_reported_campaign_email: false,
        enabled: false,
        folder: '',
        host: '',
        ignore_cert_errors: false,
        imap_freq: '',
        password: '',
        port: '',
        restrict_domain: '',
        tls: false,
        username: ''
      };

      this.getIMAP();
			const useMap = localStorage.getItem('use_map');
			if (!!useMap) this.show_map = JSON.parse(useMap);
    },
		setMapValue() {
			localStorage.setItem('use_map', this.show_map);
		},
    getIMAP() {
      api.IMAP.get()
        .then((response) => {
					if (response.data.length > 0) this.imapSettings = response.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
		postIMAP(evt) {
			evt.preventDefault();

			if (this.imapSettings.imap_freq == '') this.imapSettings.imap_freq = '60';

			api.IMAP.post(this.imapSettings)
        .then((response) => {
					console.log(response);
					if (response.data.success == true) {
						this.$swal.fire(
							'IMAP settings edited successfully!',
							response.data.message,
							'success'
						);
					} else {
						this.$swal.fire(
							'Error!',
							"Couldn't update IMAP settings",
							'error'
						);
					}
        })
        .catch((error) => {
					const errorMsg = error.response.data.message;
					this.$swal.fire('Error!', errorMsg, 'error');
        });
		},
		validate() {
			const data = {
				host: this.imapSettings.host,
				ignore_cert_errors: this.imapSettings.ignore_cert_errors,
				password: this.imapSettings.password,
				port: this.imapSettings.port,
				tls: this.imapSettings.tls,
				username: this.imapSettings.username
			};

			this.blocked = true;
			let _this = this;

			api.IMAP.validate(data)
				.then(response => {
					if (response.data.success) {
						this.blocked = false;
						this.$swal.fire(
							'Success',
							`Logged in to ${data.host}`,
							'success'
						);
					} else {
						this.blocked = false;
						this.$swal.fire({
							title: "Failed!",
							text: `Unable to login to ${data.host}`,
							icon: "error",
							showClass: {
								popup: '',
								backdrop: ''
							},
							showCancelButton: true,
							cancelButtonText: "Close",
							confirmButtonText: "More Info",
							confirmButtonColor: "#428bca",
							allowOutsideClick: false,
							showLoaderOnConfirm: true
						})
							.then(function (result) {
								if (result.value) {
									_this.$swal.fire(
										'Error:',
										response.data.message);
								}
							});
					}
				})
				.catch(error => {
					this.blocked = false;
					this.$swal.fire({
						title: "¡Error!",
						text: "An unexpected error has occurred",
						type: "error",
					})
				});
		},
		reset() {
			api.reset(this.apiKey)
				.then(response => {
					this.apiKey = response.data;
					this.$swal.fire('success!', response.message, 'success');
				})
				.catch(error => {
					const errorMsg = error.response.data.message;
					this.$swal.fire('Error!', errorMsg, 'error');
				});
		},
		submitSettings(evt) {
			evt.preventDefault();
			
			if (!!this.account.new_password && !!this.account.confirm_new_password &&
						this.account.new_password != this.account.confirm_new_password) {
				this.error = "Passwords must match";
			} else {
				this.error = "";

				let data = new FormData();
				for ( var key in this.account ) {
					data.append(key, this.account[key]);
				}

				api.settings(data)
					.then(response => {
						this.$swal.fire(
							'Account settings edited successfully!',
							response.data.message,
							'success'
						);
					})
					.catch(error => {
						const errorMsg = error.response.data.message;
						this.$swal.fire('Error!', errorMsg, 'error');
					})
			}
		},
    closeModal(id) {
      this.$bvModal.hide(id);
    },
  },
};
</script>

