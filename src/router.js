import Vue from "vue";
import store from "./store";
// import {isMobile} from "mobile-device-detect";
import Router from "vue-router";
import NProgress from "nprogress";
import authenticate from "./services/authenticate";

Vue.use(Router);

// create new router

const routes = [
	{
		path: "/",
		component: () => import("./views/app"), //webpackChunkName app
		beforeEnter: authenticate,
		redirect: "/",

		children: [
			{
				path: "/",
				component: () => import("./views/app/dashboards"), //dashboard
				children: [
					{
						path: "",
						component: () => import("./views/app/dashboards/dashboard")
					}
				]
			},
			{
				path: "/app/campaigns",
				component: () => import("./views/app/campaigns"), //campaigns
				children: [
					{
						path: "new",
						component: () => import("./views/app/campaigns/campaign.new")
					},
					{
						path: "show/:id",
						name: "campaignShow",
						component: () => import('./views/app/campaigns/campaign.show')
					},
					{
						path: '',
						component: () => import('./views/app/campaigns/campaign.list')
					}
				]
			},
			{
				path: "/app/groups",
				component: () => import("./views/app/groups"), //users & groups
				children: [
					{
						path: "new",
						component: () => import("./views/app/groups/group.new")
					},
					{
						path: '',
						component: () => import('./views/app/groups/group.list')
					},
					{
						path: "show/:id",
						name: "groupShow",
						component: () => import('./views/app/groups/group.show')
					},
				]
			},
			{
				path: "/app/templates",
				component: () => import("./views/app/templates"), //templates
				children: [
					{
						path: "new",
						component: () => import("./views/app/templates/template.new")
					},
					{
						path: "show/:id",
						name: "templateShow",
						component: () => import('./views/app/templates/template.show')
					},
					{
						path: '',
						component: () => import('./views/app/templates/template.list')
					}
				]
			},
			{
				path: "/app/landing_pages",
				component: () => import("./views/app/landing_pages"), //landing
				children: [
					{
						path: "new",
						component: () => import("./views/app/landing_pages/landingPage.new")
					},
					{
						path: "show/:id",
						name: "landingShow",
						component: () => import('./views/app/landing_pages/landingPage.show')
					},
					{
						path: '',
						component: () => import('./views/app/landing_pages/landingPage.list')
					}
				]
			},
			{
				path: "/app/sending_profiles",
				component: () => import("./views/app/sending_profiles"), //sending
				children: [
					{
						path: "new",
						component: () => import("./views/app/sending_profiles/sendingProfile.new")
					},
					{
						path: "show/:id",
						name: "sendingProfileShow",
						component: () => import('./views/app/sending_profiles/sendingProfile.show')
					},
					{
						path: '',
						component: () => import('./views/app/sending_profiles/sendingProfile.list')
					}
				]
			},
			{
				path: "/app/settings",
				component: () => import("./views/app/account_settings"), //account
				children: [
					{
						path: "",
						component: () => import("./views/app/account_settings/index.vue")
					},
				]
			},
			{
				path: "/app/users",
				component: () => import("./views/app/user_management"), //user_management
				children: [
					{
						path: "new",
						component: () => import("./views/app/user_management/user.new")
					},
					{
						path: "show/:id",
						name: "userShow",
						component: () => import('./views/app/user_management/user.show')
					},
					{
						path: "",
						component: () => import("./views/app/user_management/user.list")
					},
				]
			},
			{
				path: "/app/webhooks",
				component: () => import("./views/app/webhooks"), //webhooks
				children: [
					{
						path: "new",
						component: () => import("./views/app/webhooks/webhook.new")
					},
					{
						path: "show/:id",
						name: "webhookShow",
						component: () => import('./views/app/webhooks/webhook.show')
					},
					{
						path: "",
						component: () => import("./views/app/webhooks/webhook.list")
					},
				]
			},
		]
	},

	// sessions
	{
		path: "/app/sessions",
		component: () => import("./views/app/sessions"),
		redirect: "/app/sessions/signIn",
		children: [
			{
				path: "signIn",
				component: () => import("./views/app/sessions/signIn")
			},
			{
				path: "signUp",
				component: () => import("./views/app/sessions/signUp")
			},
			{
				path: "forgot",
				component: () => import("./views/app/sessions/forgot")
			}
		]
	},
	{
		path: "*",
		component: () => import("./views/app/pages/notFound")
	}
];

const router = new Router({
	mode: "history",
	linkActiveClass: "open",
	routes,
	scrollBehavior(to, from, savedPosition) {
		return {x: 0, y: 0};
	}
});

router.beforeEach((to, from, next) => {
	// If this isn't an initial page load.
	if (to.path) {
		// Start the route progress bar.

		NProgress.start();
		NProgress.set(0.1);
	}
	next();
});

router.afterEach(() => {
	// Remove initial loading
	const gullPreLoading = document.getElementById("loading_wrap");
	if (gullPreLoading) {
		gullPreLoading.style.display = "none";
	}
	// Complete the animation of the route progress bar.
	setTimeout(() => NProgress.done(), 500);
	// NProgress.done();
	// if (isMobile) {
	if (window.innerWidth <= 1200) {
		// console.log("mobile");
		store.dispatch("changeSidebarProperties");
		if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
			store.dispatch("changeSecondarySidebarProperties");
		}

		if (store.getters.getCompactSideBarToggleProperties.isSideNavOpen) {
			store.dispatch("changeCompactSidebarProperties");
		}
	} else {
		if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
			store.dispatch("changeSecondarySidebarProperties");
		}

		// store.state.sidebarToggleProperties.isSecondarySideNavOpen = false;
	}
});

export default router;
