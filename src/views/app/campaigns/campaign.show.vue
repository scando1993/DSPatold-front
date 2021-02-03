<template>
	<div class="main-content">
		<breadcumb :page="'Campaigns User'" :folder="'Campaigns'" />
		<div class="my-4"></div>

		<b-row>
			<b-col sm="12">
				<b-card>
					<b-tabs>
						<b-tab title="Overview" active>
							<div class="row">
								<b-col cols="8">
									<b-card title="Campaign Timeline" class="mb-30">
										<div id="basicArea-chart" style="min-height: 365px">
											<apexchart
												type="line"
												height="350"
												:options="basicLineChart.chartOptions"
												:series="basicLineChart.series"
											/>
										</div>
									</b-card>
									<b-card title="Failures by Day" class="mb-30">
										<div>
											<apexchart
												width="500"
												type="bar"
												:options="options"
												:series="series"
											></apexchart>
										</div>
									</b-card>
								</b-col>
								<b-col lg="4" md="6" class="mb-30">
									<b-card title="Campaign Status" class="mb-30">
										<div class="ul-widget-app__browser-list">
											<div class="ul-widget-app__browser-list-1 mb-30">
												<i
													class="i-Email text-18 text-danger font-weight-600 mr-3"
												></i>
												<span class="text-15">Email sent</span>
												<b-badge pill variant="success p-1 m-1">3</b-badge>
											</div>

											<div class="ul-widget-app__browser-list-1 mb-30">
												<i
													class="i-Cloud-Email text-18 text-warning font-weight-600 mr-3"
												></i>
												<span class="text-15">Email Opened</span>
												<b-badge pill variant="danger p-1 m-1">1</b-badge>
											</div>

											<div class="ul-widget-app__browser-list-1 mb-30">
												<i
													class="i-Cursor-Click-2 text-18 text-info font-weight-600 mr-3"
												></i>
												<span class="text-15">Clicked Link</span>
												<b-badge pill variant="primary p-1 m-1">1</b-badge>
											</div>

											<div class="ul-widget-app__browser-list-1 mb-30">
												<i
													class="i-Data-Cloud text-18 text-danger font-weight-600 mr-3"
												></i>
												<span class="text-15">Submitted Data</span>
												<b-badge pill variant="dark p-1 m-1">1</b-badge>
											</div>

											<div class="ul-widget-app__browser-list-1 mb-30">
												<i class="i-Voicemail text-18 text-success mr-3"></i>
												<span class="text-15">Email Reported</span>

												<b-badge pill variant="danger p-1 m-1">0</b-badge>
											</div>
										</div>
									</b-card>

									<b-card title="Phishing Email" class="">
										<div class="ul-widget-app__browser-list">
											<div class="ul-widget-app__browser-list-1 mb-30">
												<span class="text-15">From</span>
												<span class="text-15 p-1 m-1"
													>scando@fiec.espol.edu.ec</span
												>
											</div>

											<div class="ul-widget-app__browser-list-1 mb-30">
												<span class="text-15">To</span>
												<span class="text-15 p-1 m-1">4 recipients</span>
											</div>

											<div class="ul-widget-app__browser-list-1 mb-30">
												<span class="text-15">Reply To</span>
												<span class="text-15 p-1 m-1"
													>scando@fiec.espol.edu.ec</span
												>
											</div>

											<div class="ul-widget-app__browser-list-1 mb-30">
												<span class="text-15">Subject</span>
												<span class="text-15 p-1 m-1">Cambio de password</span>
											</div>
										</div>
									</b-card>
								</b-col>
							</div>
						</b-tab>
						<b-tab title="Users">
							<div>
								<vue-good-table
									:columns="columns"
									:rows="rows"
									:search-options="{
										enabled: true,
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

												<b-dropdown-item
													class="dropdown-item"
													@click="duplicateCampaign(props.row)"
												>
													<i
														class="nav-icon i-File-Copy text-info font-weight-bold mr-2"
													></i
													>Details
												</b-dropdown-item>
												<!--<b-dropdown-item class="dropdown-item" @click="editCampaign(props.row)">
												<i class="nav-icon i-Pen-2 text-success font-weight-bold mr-2"></i>Edit
											</b-dropdown-item>
											<b-dropdown-item>
												<a class="dropdown-item" @click="deleteCampaign(props.row)">
													<i class="nav-icon i-Close-Window text-danger font-weight-bold mr-2"></i>Delete
												</a>
											</b-dropdown-item>-->
											</b-dropdown>
										</span>
										<span v-if="props.column.field === 'status'">
											<span
												class="badge badge-pill badge-outline-primary p-2"
												>{{ props.row.status }}</span
											>
										</span>
										<span v-else>{{
											props.formattedRow[props.column.field]
										}}</span>
									</template>
								</vue-good-table>
							</div>
						</b-tab>
					</b-tabs>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
export default {
	metaInfo: {
		title: "Campaigns",
	},
	name: "campaign-show",
	data() {
		return {
			columns: [
				{
					label: "First Name",
					field: "name",
					thClass: "text-left",
					tdClass: "text-left",
				},
				{
					label: "Last Name",
					field: "lastName",
					thClass: "text-left",
					tdClass: "text-left",
				},
				{
					label: "Email",
					field: "email",
					thClass: "text-left",
					tdClass: "text-left",
				},
				{
					label: "Position",
					field: "position",
					thClass: "text-left",
					tdClass: "text-left",
					type: "percentage",
				},
				{
					label: "Status",
					field: "status",
					thClass: "text-left",
					tdClass: "text-left",
				},
				{
					label: "",
					field: "action",
					thClass: "text-right",
					tdClass: "text-right",
				},
			],
			rows: [
				{
					name: "Kevin",
					lastName: "Cando",
					email: "scando@fiec.espol.edu.ec",
					position: "Developer",
					status: "Email sent",
					action: "",
				},
			],
			options: {
				chart: {
					id: "vuechart-example",
				},
				xaxis: {
					categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
				},
			},
			series: [
				{
					name: "series-1",
					data: [30, 40, 45, 50, 49, 60, 70, 91],
				},
			],
			basicLineChart: {
				series: [
					{
						name: "Desktops",
						data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
					},
				],
				chartOptions: {
					chart: {
						height: 350,
						zoom: {
							enabled: false,
						},
					},
					dataLabels: {
						enabled: false,
					},
					stroke: {
						curve: "straight",
					},
					title: {
						text: "Product Trends by Month",
						align: "left",
					},
					grid: {
						row: {
							colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
							opacity: 0.5,
						},
					},
					xaxis: {
						categories: [
							"Jan",
							"Feb",
							"Mar",
							"Apr",
							"May",
							"Jun",
							"Jul",
							"Aug",
							"Sep",
						],
					},
				},
			},
		};
	},
};
</script>

<style scoped>
</style>
