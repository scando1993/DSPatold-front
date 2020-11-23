<template>
	<vue-perfect-scrollbar
			class="sidebar-panel   rtl-ps-none ps scroll"
			@mouseleave.native="sidebarCompact();returnSelectedParentMenu()"

			@mouseenter.native="removeSidebarCompact"
			:class="{
      'vertical-sidebar-compact': getVerticalCompact.isSidebarCompact,
      'sidebar-full-collapse': getVerticalSidebar.isMobileCompact
    }"
			:settings="{ suppressScrollX : true ,  wheelPropagation: false}"
	>
		<div>
			<div class="gull-brand text-center d-flex align-items-center pl-2 mb-2 justify-content-between">
				<div><img class="" src="@/assets/images/logo.png"/></div>
				<div class="toggle-sidebar-compact">
					<label class="switch ul-switch switch-primary ml-auto">
						<input @click="switchSidebar" type="checkbox"/>
						<span class="ul-slider o-hidden"></span>
					</label>
				</div>
			</div>

			<div class="close-mobile-menu" @click="mobileSidebar">
				<i class="text-16 text-primary i-Close-Window font-weight-bold"></i>
			</div>

			<div class="mt-4 main-menu">

				<ul class="ul-vertical-sidebar pl-4" id="menu">
					<!-- <p class="main-menu-title text-muted ml-3 font-weight-700 text-13 mt-4 mb-2">Apps</p> -->
					<li class="Ul_li--hover">
						<div>
							<a class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'dashboard' }">
								<router-link tag="div" to="/">
									<i class="i-Bar-Chart text-20 mr-2 "/>
<!--									<img src="@/assets/images/svg/home.svg" class="text-20 mr-2 icon-sidebar"/>-->
									<span class="text-15" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Dashboard</span>
								</router-link>
							</a>
						</div>
					</li>

					<!-- TaskGrid Menu -->
					<li class="Ul_li--hover">
						<div>
							<a class="has-arrow" href="#" :class="{ active: selectedParentMenu === 'campaigns' }">
								<router-link tag="div" to="/app/campaigns">
									<i class="i-Tablet-Secure text-20 mr-2"/>
<!--									<img src="@/assets/images/svg/clientes.svg" class="text-20 mr-2 icon-sidebar"/>-->
									<span class="text-15" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Campaigns</span>
								</router-link>
							</a>
						</div>
					</li>

					<!-- Users & Groups menu  -->
					<li class="Ul_li--hover">
						<div>
							<a tag="a" class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'users' }">
								<router-link tag="div" to="/app/users">
									<i class="i-Statistic text-20 mr-2"/>
<!--									<img src="@/assets/images/svg/reportes.svg" class="text-20 mr-2 icon-sidebar"/>-->
									<span class="text-15" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Users & Groups</span>
								</router-link>
							</a>
						</div>
					</li>

					<!-- Email Templates menu  -->
					<li class="Ul_li--hover mb-2">
						<div>
							<a class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'templates' }">
								<router-link tag="div" to="#">
									<i class="i-Bell text-20 mr-2"></i>
<!--									<img src="@/assets/images/svg/notificaciones.svg" class="text-20 mr-2 icon-sidebar"/>-->
									<span class="text-15" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Email Templates</span>
								</router-link>
							</a>
						</div>
					</li>


					<!-- Landing Page menu> -->
					<li class="Ul_li--hover">
						<div>
							<a class="has-arrow " href="/app/landing" :class="{ active: selectedParentMenu === 'landing' }">
								<router-link tag="div" to="/app/landing">
									<i class="i-Monitor-Analytics icons-text mr-2"/>
									<span class="text-15" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Landing Pages</span>
								</router-link>
							</a>
						</div>
					</li>

					<!-- Sending Profiles menu-->
					<li class="Ul_li--hover">
						<div>
							<a class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'sending' }">
								<router-link tag="div" to="/app/sending">
<!--									<img src="@/assets/images/svg/settings.svg" class="text-20 mr-2 icon-sidebar"/>-->
									<span class="text-15" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Sending Profiles</span>
								</router-link>

							</a>
						</div>
					</li>

					<!-- Account Settings menu-->
					<li class="Ul_li--hover">
						<div>
							<a class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'settings' }">
								<router-link tag="div" to="/app/settings">
<!--									<img src="@/assets/images/svg/settings.svg" class="text-20 mr-2 icon-sidebar"/>-->
									<span class="text-15" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Account Settings</span>
								</router-link>

							</a>
						</div>
					</li>

					<!-- User Management menu-->
					<li class="Ul_li--hover">
						<div>
							<a class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'user_management' }">
								<router-link tag="div" to="/app/user_management">
<!--									<img src="@/assets/images/svg/settings.svg" class="text-20 mr-2 icon-sidebar"/>-->
									<span class="text-15" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">User Management</span>
								</router-link>

							</a>
						</div>
					</li>

					<!-- Webhooks menu-->
					<li class="Ul_li--hover">
						<div>
							<a class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'webhooks' }">
								<router-link tag="div" to="/app/webhooks">
<!--									<img src="@/assets/images/svg/settings.svg" class="text-20 mr-2 icon-sidebar"/>-->
									<span class="text-15" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Webhooks</span>
								</router-link>

							</a>
						</div>
					</li>

					<!-- Sign-out menu> -->
					<li class="Ul_li--hover">
						<div>
							<a class="has-arrow " href="#" @click.prevent="logoutUser">
								<i class="i-Power-2 text-20 mr-2"></i>
								<span
										class="text-15"
										:class="{ 'vertical-item-name': getVerticalCompact.isItemName }"
								>Sign Out</span>
							</a>
						</div>
					</li>
				</ul>

			</div>
		</div>
	</vue-perfect-scrollbar>
</template>
<script>
import {mapGetters, mapActions} from "vuex";
import arrowIcon from "@/components/arrow/arrowIcon";

export default {
	components: {
		arrowIcon
	},
	computed: {
		...mapGetters(["getVerticalCompact", "getVerticalSidebar"])
	},
	data() {
		return {
			selectedParentMenu: "",
		};
	},
	mounted() {
		this.toggleSelectedParentMenu();
		document.addEventListener("click", this.returnSelectedParentMenu);
	},
	beforeDestroy() {
		document.removeEventListener("click", this.returnSelectedParentMenu);

	},
	methods: {
		...mapActions([
			"switchSidebar",
			"sidebarCompact",
			"removeSidebarCompact",
			"mobileSidebar"
		]),


		toggleSelectedParentMenu() {
			const currentParentUrl = this.$route.path
				.split("/")
				.filter(x => x !== "")[1];

			if (currentParentUrl !== undefined || currentParentUrl !== null) {
				this.selectedParentMenu = currentParentUrl.toLowerCase();
				console.log(currentParentUrl)
			} else {
				this.selectedParentMenu = "dashboards";
			}
		},
		returnSelectedParentMenu() {

			this.toggleSelectedParentMenu();

		},

	}
};
</script>
<style>
</style>
