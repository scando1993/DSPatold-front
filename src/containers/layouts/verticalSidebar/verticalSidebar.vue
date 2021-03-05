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
				<div>
					<img class="full" src="@/assets/images/LOGO-DATAPROTECT_2.png" v-if="!getVerticalCompact.isItemName"/>
					<img class="icon" src="@/assets/images/LOGO-DATAPROTECT.png" v-else/>
				</div>
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
									<i class="i-Bar-Chart text-20 mr-2 sidebar-text"/>
<!--									<img src="@/assets/images/svg/home.svg" class="text-20 mr-2 icon-sidebar"/>-->
									<span class="text-15 sidebar-text" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Dashboard</span>
								</router-link>
							</a>
						</div>
					</li>

					<!-- TaskGrid Menu -->
					<li class="Ul_li--hover">
						<div>
							<a class="has-arrow" href="#" :class="{ active: selectedParentMenu === 'campaigns' }">
								<router-link tag="div" to="/app/campaigns">
									<i class="i-Tablet-Secure text-20 mr-2 sidebar-text"/>
<!--									<img src="@/assets/images/svg/clientes.svg" class="text-20 mr-2 icon-sidebar"/>-->
									<span class="text-15 sidebar-text" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Campaigns</span>
								</router-link>
							</a>
						</div>
					</li>

<!--					&lt;!&ndash; Users & Groups menu  &ndash;&gt;-->
<!--					<li class="Ul_li&#45;&#45;hover">-->
<!--						<div>-->
<!--							<a tag="a" class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'users' }">-->
<!--								<router-link tag="div" to="/app/users">-->
<!--									<i class="i-Statistic text-20 mr-2"/>-->
<!--&lt;!&ndash;									<img src="@/assets/images/svg/reportes.svg" class="text-20 mr-2 icon-sidebar"/>&ndash;&gt;-->
<!--									<span class="text-15" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Users & Groups</span>-->
<!--								</router-link>-->
<!--							</a>-->
<!--						</div>-->
<!--					</li>-->

					<!-- Email Templates menu  -->
					<li class="Ul_li--hover mb-2">
						<div>
							<a class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'templates' }">
								<router-link tag="div" to="/app/templates">
									<i class="i-Bell text-20 mr-2 sidebar-text"></i>
<!--									<img src="@/assets/images/svg/notificaciones.svg" class="text-20 mr-2 icon-sidebar"/>-->
									<span class="text-15 sidebar-text" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Email Templates</span>
								</router-link>
							</a>
						</div>
					</li>


					<!-- Landing Page menu> -->
					<li class="Ul_li--hover">
						<div>
							<a class="has-arrow " href="/app/landing_pages" :class="{ active: selectedParentMenu === 'landing_pages' }">
								<router-link tag="div" to="/app/landing_pages">
									<i class="i-Monitor-Analytics text-20 mr-2 sidebar-text"/>
									<span class="text-15 sidebar-text" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Landing Pages</span>
								</router-link>
							</a>
						</div>
					</li>

					<!-- Sending Profiles menu-->
					<li class="Ul_li--hover">
						<div>
							<a class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'sending_profiles' }">
								<router-link tag="div" to="/app/sending_profiles">
<!--									<img src="@/assets/images/svg/settings.svg" class="text-20 mr-2 icon-sidebar"/>-->
									<i class="i-Add-Cart text-20 mr-2 sidebar-text"/>
									<span class="text-15 sidebar-text" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Sending Profiles</span>
								</router-link>

							</a>
						</div>
					</li>

<!--					&lt;!&ndash; Account Settings menu&ndash;&gt;-->
<!--					<li class="Ul_li&#45;&#45;hover">-->
<!--						<div>-->
<!--							<a class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'account' }">-->
<!--								<router-link tag="div" to="/app/account">-->
<!--&lt;!&ndash;									<img src="@/assets/images/svg/settings.svg" class="text-20 mr-2 icon-sidebar"/>&ndash;&gt;-->
<!--									<span class="text-15" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Account Settings</span>-->
<!--								</router-link>-->

<!--							</a>-->
<!--						</div>-->
<!--					</li>-->

<!--					&lt;!&ndash; User Management menu&ndash;&gt;-->
<!--					<li class="Ul_li&#45;&#45;hover">-->
<!--						<div>-->
<!--							<a class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'user_management' }">-->
<!--								<router-link tag="div" to="/app/user_management">-->
<!--&lt;!&ndash;									<img src="@/assets/images/svg/settings.svg" class="text-20 mr-2 icon-sidebar"/>&ndash;&gt;-->
<!--									<span class="text-15" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">User Management</span>-->
<!--								</router-link>-->

<!--							</a>-->
<!--						</div>-->
<!--					</li>-->

<!--					&lt;!&ndash; Webhooks menu&ndash;&gt;-->
<!--					<li class="Ul_li&#45;&#45;hover">-->
<!--						<div>-->
<!--							<a class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'webhooks' }">-->
<!--								<router-link tag="div" to="/app/webhooks">-->
<!--&lt;!&ndash;									<img src="@/assets/images/svg/settings.svg" class="text-20 mr-2 icon-sidebar"/>&ndash;&gt;-->
<!--									<span class="text-15" :class="{ 'vertical-item-name': getVerticalCompact.isItemName }">Webhooks</span>-->
<!--								</router-link>-->

<!--							</a>-->
<!--						</div>-->
<!--					</li>-->

					<!-- Sign-out menu> -->
					<li class="Ul_li--hover">
						<div>
							<a class="has-arrow " href="#" @click.prevent="logoutUser">
								<i class="i-Power-2 text-20 mr-2 sidebar-text"></i>
								<span
										class="text-15 sidebar-text"
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

			if (currentParentUrl !== undefined && currentParentUrl !== null) {
				this.selectedParentMenu = currentParentUrl.toLowerCase();
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
.layout-sidebar-vertical .gull-brand img.full{
		width: 10rem;
}
.layout-sidebar-vertical .gull-brand img.icon{
	width: 3rem;
		margin-left: 5px;
}

.layout-sidebar-vertical .sidebar-panel{
		background: #2b5077;
}

.sidebar-text{
		color: #ffffff;
}
</style>
