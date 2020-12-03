<template>
	<!--	Body start content-->
	<div class="main-content">
		<breadcumb :page="'Users & Groups'" :folder="''"/>
		<b-button variant="primary" v-b-modal:groups-new>New Group</b-button>
		<div class="my-4"></div>

		<b-row>
			<b-col sm="12">
				<div v-if="isEmpty(activeGroups)">
					<b-alert variant="success" :show="isEmpty(activeGroups)">
						No campaigns created yet. Let's create one!
					</b-alert>
				</div>
				<b-card v-else>
					<vue-good-table
							v-if="!isEmpty(activeGroups)"
							:columns="columns"
							:rows="activeGroups"
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
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
export default {
	name: "users.dashboard",
	data() {
		return {
			activeGroups: [],
			columns: []
		}
	},
	methods: {
		isEmpty(){}
	}
}
</script>

<style scoped>

</style>
