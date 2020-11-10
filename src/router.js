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
    redirect: "/app/dashboards/dashboard.v1",

    children: [
      {
        path: "/app/dashboards",
        component: () => import("./views/app/dashboards"), //dashboard
        children: [
          {
            path: "dashboard.v1",
            component: () => import("./views/app/dashboards/dashboard.v1")
          },
        ]
      },
      {
        path: "/app/campaigns",
        component: () => import("./views/app/campaigns"), //campaigns
      },
      {
        path: "/app/users",
        component: () => import("./views/app/users"), //users
        children: [
          {
            path: "dashboard.v1",
            component: () => import("./views/app/dashboards/dashboard.v1")
          },
        ]
      },
      {
        path: "/app/templates",
        component: () => import("./views/app/templates"), //templates
        children: [
          {
            path: "dashboard.v1",
            component: () => import("./views/app/dashboards/dashboard.v1")
          },
        ]
      },
      {
        path: "/app/landing",
        component: () => import("./views/app/landing"), //landing
        children: [
          {
            path: "dashboard.v1",
            component: () => import("./views/app/dashboards/dashboard.v1")
          },
        ]
      },
      {
        path: "/app/sending",
        component: () => import("./views/app/sending"), //sending
        children: [
          {
            path: "dashboard.v1",
            component: () => import("./views/app/dashboards/dashboard.v1")
          },
        ]
      },
      {
        path: "/app/account",
        component: () => import("./views/app/account"), //account
        children: [
          {
            path: "dashboard.v1",
            component: () => import("./views/app/dashboards/dashboard.v1")
          },
        ]
      },
      {
        path: "/app/user_management",
        component: () => import("./views/app/user_management"), //user_management
        children: [
          {
            path: "dashboard.v1",
            component: () => import("./views/app/dashboards/dashboard.v1")
          },
        ]
      },
      {
        path: "/app/webhooks",
        component: () => import("./views/app/webhooks"), //webhooks
        children: [
          {
            path: "dashboard.v1",
            component: () => import("./views/app/dashboards/dashboard.v1")
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
    path: "/vertical-sidebar",
    component: () => import("./containers/layouts/verticalSidebar")
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
