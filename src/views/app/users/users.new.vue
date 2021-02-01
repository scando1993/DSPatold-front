<template>
	<b-modal id="users-new" title="New Group" size="lg">
		<b-container fluid>
			<b-form id="users-new-form" @submit="onSubmit" @reset="onReset">
				<b-form-group label="Name:" label-for="input-users-new-1">
					<b-form-input
							id="input-users-new-1"
							v-model="form.name"
							required
							placeholder="Group name"
					/>
				</b-form-group>
				<b-form-group>
					<b-form-row>
						<b-col cols="2">
							<b-button variant="danger">Bulk Import</b-button>
						</b-col>
						<b-col cols="10" md="auto" class="text-modal">
							Download CSV Template
						</b-col>
					</b-form-row>
				</b-form-group>
				<b-form-group>
					<b-form-row >
						<b-col>
							<b-form-input
									id=""
									v-model="userForm.name"
									placeholder="First Name"
							/>
						</b-col>
						<b-col>
							<b-form-input
									id=""
									v-model="userForm.lastName"
									placeholder="Last Name"
							/>
						</b-col>
						<b-col>
							<b-form-input
									id=""
									v-model="userForm.email"
									placeholder="Email"
							/>
						</b-col>
						<b-col>
							<b-form-input
									id=""
									v-model="userForm.position"
									placeholder="Position"
							/>
						</b-col>
						<b-col>
							<b-button type="submit" variant="danger">Add User</b-button>
						</b-col>
					</b-form-row>
				</b-form-group>
				<b-form-group>
					<vue-good-table
							:columns="columns"
							:rows="activeUsers"
							:search-options="{
										enabled: true
									}"
							styleClass="tableOne vgt-table"
					>
						<template slot="table-row" slot-scope="props">
							<span v-if="props.column.field === 'action'">
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

									<b-dropdown-item class="dropdown-item" @click="duplicateCampaign(props.row)">
										<i class="nav-icon i-File-Copy text-info font-weight-bold mr-2"></i>Duplicate
									</b-dropdown-item>
									<b-dropdown-item class="dropdown-item" @click="editCampaign(props.row)">
										<i class="nav-icon i-Pen-2 text-success font-weight-bold mr-2"></i>Edit
									</b-dropdown-item>
									<b-dropdown-item>
										<a class="dropdown-item" @click="deleteCampaign(props.row)">
											<i class="nav-icon i-Close-Window text-danger font-weight-bold mr-2"></i>Delete
										</a>
									</b-dropdown-item>
								</b-dropdown>
							</span>
							<span v-if="props.column.field === 'status'">
								<span class="badge badge-pill badge-outline-primary p-2 ">{{ props.row.status }}</span>
							</span>
							<span v-else>{{ props.formattedRow[props.column.field] }}</span>
						</template>
					</vue-good-table>
				</b-form-group>
			</b-form>
		</b-container>
		<div slot="modal-footer" class="ml-auto">
			<b-button form="form-1" type="reset" variant="danger">Reset</b-button>
			<span class="mx-2"></span>
			<b-button form="form-1" type="submit" variant="primary">Submit</b-button>
		</div>
	</b-modal>
</template>

<script>
export default {
	name: "users-new",
	data() {
		return {
			columns: [],
			activeUsers: [],
			form: {
				name: "",
				userList: []
			},
			userForm: {
				name: "",
				lastName: "",
				email: "",
				position: ""
			}
		};
	},
	methods: {
		onSubmit() {

		},
		onReset() {
		}
	}
}
</script>

<style scoped>
.text-modal{
		align-self: center;
}
</style>
