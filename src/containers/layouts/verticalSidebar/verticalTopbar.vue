<template>
	<div class="mb-30">
		<header
				class="main-header vertical-header bg-white d-flex justify-content-between"
		>
			<div class="menu-toggle vertical-toggle" @click="mobileSidebar">
				<div></div>
				<div></div>
				<div></div>
			</div>
			<div class="header-toggle">
				<!-- <i
					class="i-Add-UserStar mr-3 text-20 cursor-pointer"
					v-b-tooltip.hover
					title="User"
				></i> -->
				<router-link tag="div" to="/app/groups">
					<i
						class="i-Find-User mr-3 text-20 cursor-pointer"
						v-b-tooltip.hover
						title="Users and Groups"
					></i>
				</router-link>
			</div>
			<div style="margin: auto"></div>

			<div class="header-part-right">
				<!-- Full screen toggle -->
				<!-- <i
					class="i-Full-Screen header-icon d-none d-sm-inline-block"
					@click="handleFullScreen"
				></i> -->

				<!-- User avatar dropdown -->
				<div class="dropdown">
					<b-dropdown
						id="dropdown-1"
						right
						text="Right align"
						class="m-md-2 user col align-self-end"
						toggle-class="text-decoration-none"
						no-caret
						variant="link"
					>
						<template slot="button-content">
							<img
								src="@/assets/images/faces/1.jpg"
								id="userDropdown"
								alt
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							/>
						</template>

						<div class="dropdown-menu-right" aria-labelledby="userDropdown">
							<div class="dropdown-header">
								<i class="i-Lock-User mr-1"></i> Timothy Carlson
							</div>
							<a class="dropdown-item">
								<router-link tag="div" to="/app/users">
									<span class="text-15">User Management</span>
								</router-link>
							</a>
							<a class="dropdown-item">
								<router-link tag="div" to="/app/settings">
									<span class="text-15">Account Settings</span>
								</router-link>
							</a>
							<a class="dropdown-item">
								<router-link tag="div" to="/app/webhooks">
									<span class="text-15">Webhooks</span>
								</router-link>
							</a>
							<a class="dropdown-item" href="#" @click.prevent="logoutUser">Sign out</a>
						</div>
					</b-dropdown>
				</div>
			</div>
		</header>
	</div>
</template>
<script>
import {mapGetters, mapActions} from "vuex";
import Util from "@/utils";

export default {
	computed: {
		...mapGetters(["getVerticalCompact", "getVerticalSidebar", "getSideBarToggleProperties"])
	},
	data() {
		return {};
	},
	methods: {
		...mapActions(["switchSidebar", "sidebarCompact", "removeSidebarCompact", "mobileSidebar"]),

		handleFullScreen() {
			Util.toggleFullScreen();
		},
	}
};
</script>>
