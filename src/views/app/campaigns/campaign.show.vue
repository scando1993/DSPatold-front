<template>
    <div class="main-content">
        <breadcumb :page="'Campaigns User'" :folder="'Campaigns'"/>
        <div class="my-4">
        </div>

        <b-row>
            <b-col sm="12">
                <b-card>
                    <b-tabs>
                        <b-tab title="Overview" active>
                            <div class="row">
                                <b-col cols="8"></b-col>
                                <b-col lg="4" md="6" class=" mb-30">
                                    <b-card title="Travel Different Countries">
                                        <div class="ul-widget-app__poll-list mb-4">
                                            <h3 class="heading mr-2">
                                                Status
                                            </h3>
                                            <div class="d-flex">
                                                <span class="text-muted text-12">Status</span>
                                                <span class="t-font-boldest ml-auto">
                                75%
                                <i class="i-Turn-Up-2 text-14 text-success font-weight-700"></i>
                            </span>
                                            </div>
                                            <b-progress height="5px" :value="75"></b-progress>
                                        </div>
                                        <div class="ul-widget-app__poll-list mb-4">
                                            <h3 class="heading mr-2">
                                                4589
                                            </h3>
                                            <div class="d-flex">
                                                <span class="text-muted text-12">From U.S.A</span>
                                                <span class="t-font-boldest ml-auto">
                                33%
                                <i class="i-Turn-Down-2 text-14 text-danger font-weight-700"></i>
                            </span>
                                            </div>
                                            <b-progress height="5px" variant="success" :value="33"></b-progress>
                                        </div>
                                        <div class="ul-widget-app__poll-list mb-4">
                                            <h3 class="heading mr-2">
                                                7589
                                            </h3>
                                            <div class="d-flex">
                                                <span class="text-muted text-12">From Canada</span>
                                                <span class="t-font-boldest ml-auto">
                                49%
                                <i class="i-Turn-Down-2 text-14 text-danger font-weight-700"></i>
                            </span>
                                            </div>
                                            <b-progress height="5px" variant="dark" :value="49"></b-progress>
                                        </div>
                                        <div class="ul-widget-app__poll-list mb-4">
                                            <h3 class="heading mr-2">
                                                3589
                                            </h3>
                                            <div class="d-flex">
                                                <span class="text-muted text-12">From France</span>
                                                <span class="t-font-boldest ml-auto">
                                13%
                                <i class="i-Turn-Down-2 text-14 text-danger font-weight-700"></i>
                            </span>
                                            </div>
                                            <b-progress height="5px" variant="danger" :value="13"></b-progress>
                                        </div>
                                        <div class="ul-widget-app__poll-list mb-4">
                                            <h3 class="heading mr-2">
                                                3589
                                            </h3>
                                            <div class="d-flex">
                                                <span class="text-muted text-12">From japan</span>
                                                <span class="t-font-boldest ml-auto">
                                25%
                                <i class="i-Turn-Down-2 text-14 text-danger font-weight-700"></i>
                            </span>
                                            </div>
                                            <b-progress height="5px" variant="warning" :value="25"></b-progress>
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
        title: "Campaigns"
    },
    name: "campaign-show",
    data() {
        return {
            rows: [],
            columsn: []
        }
    }
}
</script>

<style scoped>

</style>
