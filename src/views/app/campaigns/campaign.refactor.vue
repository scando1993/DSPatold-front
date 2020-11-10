<template>
	<!--	Body start content-->
	<div class="main-content">
		<breadcrumb :page="'Campaign'" :folder="''"/>
		<b-row>
			<b-button variant="primary" v-b-modal.campaign.new>New Campaign</b-button>
			<b-modal id="campaign.new" title="New Campaign">
				<b-container fluid>
					<b-form @submit="onSubmit" @reset="onReset" v-if="show">
						<b-form-group id="input-group-1" label="Your Name:" label-for="input-2">
							<b-form-input
									id="input-1"
									v-model="form.name"
									required
									placeholder="Campaign name"
							></b-form-input>
						</b-form-group>

						<b-form-group
								id="input-group-2"
								label="Email address:"
								label-for="input-2"
								description="We'll never share your email with anyone else."
						>
							<b-form-select
									id="input-2"
									v-model="form.email"
									:options="emails"
									required
									placeholder="Select an email template"
							></b-form-select>
						</b-form-group>

						<b-form-group id="input-group-3" label="Landing Page:" label-for="input-3">
							<b-form-select
									id="input-3"
									v-model="form.landingPage"
									:options="landings"
									required
									placeholder="Select a Landing Page"
							></b-form-select>
						</b-form-group>

						<b-form-group id="input-group-4">
							<b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
								<b-form-checkbox value="me">Check me out</b-form-checkbox>
								<b-form-checkbox value="that">Check that out</b-form-checkbox>
							</b-form-checkbox-group>
						</b-form-group>
					</b-form>
				</b-container>
				<div slot="modal-footer" class="w-100">
					<b-button type="submit" variant="primary">Submit</b-button>
					<b-button type="reset" variant="danger">Reset</b-button>
				</div>
			</b-modal>
		</b-row>
		<b-row>
			<b-tabs content-class="mt-3">
				<b-tab title="Active Campaigns" active>
					<b-alert show variant="success">
						No campaigns created yet. Let's create one!
					</b-alert>
				</b-tab>
				<b-tab title="Archived Campaigns"></b-tab>
			</b-tabs>
		</b-row>
	</div>

</template>

<script>
export default {
	metaInfo: {
		title: "Campaigns"
	},
	name: "campaign",
	data() {
		return {
			show: false,
			form: {
				emailTemplate: null,
				name: '',
				landingPage: null,
				url: '',
				launchDate: '',
				sendEmails: '',
				sendingProfiles: null,
				groups: [],
			},
			activeCampaigns: [],
			emails: [{ text: 'Example 1', value: null }, 'Example 2', 'Example 3'],
			landings: [{ text: 'Example 2', value: null }],
			sendingProfile: [{ text: 'Example 3', value: null }]
		}
	},
	methods:{
		onSubmit(evt){
			evt.preventDefault()
			alert(JSON.stringify(this.newForm))
		},
		onReset(evt){
			evt.preventDefault()
			// Reset our form values
			this.form.email = ''
			this.form.name = ''
			this.form.food = null
			this.form.checked = []
			// Trick to reset/clear native browser form validation state
			this.show = false
			this.$nextTick(() => {
				this.show = true
			})
		}
	}
}
</script>

<style scoped>

</style>
