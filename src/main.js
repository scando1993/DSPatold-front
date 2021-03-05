import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import VueAxios from 'vue-axios'
import store from './store'
import i18n from "./lang/lang"
import router from "@/router";
import { plainAxiosInstance, securedAxiosInstance } from "@/services";

import firebase from "firebase/app";
import "firebase/auth";
import { firebaseSettings } from "@/config";

import {BootstrapVue, IconsPlugin, SpinnerPlugin} from "bootstrap-vue";
import VueTour from "vue-tour";
import VueTagsInput from "@johmun/vue-tags-input";
import VueTheMask from "vue-the-mask";
import Vuelidate from "vuelidate";
import VueFormWizard from "vue-form-wizard";
import VueLazyload from "vue-lazyload";
import VueGoodTablePlugin from "vue-good-table";
import Meta from "vue-meta";
import FlagIcon from "vue-flag-icon";

import Breadcumb from "@/components/breadcumb";

import vSelect from 'vue-select'
import 'vue-select/src/scss/vue-select.scss';

import VueSweetalert2 from "vue-sweetalert2";

import "@/assets/styles/sass/themes/lite-blue.scss";
import VueApexCharts from 'vue-apexcharts';
import moment from 'moment';
import CKEditor from 'ckeditor4-vue';
import VueHorizontalTimeline from "vue-horizontal-timeline";
import VueTimeline from "@growthbunker/vuetimeline";
import JsonCSV from 'vue-json-csv';

Vue.config.productionTip = false

// Vue.use(VueAxios, {
//   secure: securedAxiosInstance,
//   plain: plainAxiosInstance
// })

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(SpinnerPlugin);
Vue.use(VueSweetalert2);
Vue.use(VueHorizontalTimeline);
Vue.use(VueTimeline);
Vue.component('downloadCsv', JsonCSV);

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.component('breadcumb', Breadcumb);
Vue.component('v-select', vSelect);
Vue.component(
    "vertical-sidebar",
    // The `import` function returns a Promise.
    () => import("./containers/layouts/verticalSidebar")
);

Vue.component("vue-perfect-scrollbar", () =>
    import("vue-perfect-scrollbar")
);

Vue.use(Meta, {
  keyName: "metaInfo",
  attribute: "data-vue-meta",
  ssrAttribute: "data-vue-meta-server-rendered",
  tagIDKeyName: "vmid",
  refreshOnceOnNavigation: true
});

Vue.use(FlagIcon);
//vuelidate
Vue.use(Vuelidate);

// maskForm
Vue.use(VueTheMask);

//form wizard globally
Vue.use(VueFormWizard);

// tags input plugin
Vue.use(VueTagsInput);

Vue.use(VueGoodTablePlugin);

Vue.use(VueTour);

Vue.use(VueLazyload, {
  observer: true,
  // optional
  observerOptions: {
    rootMargin: "0px",
    threshold: 0.1
  }
});

Vue.use(CKEditor)

firebase.initializeApp(firebaseSettings);

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY HH:mm')
  }
});

new Vue({
  securedAxiosInstance,
  plainAxiosInstance,
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
