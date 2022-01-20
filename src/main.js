import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as filters from "./filters";
import * as directives from "./directives";
import i18n from "./lang/lang";
import store from "./stores/index";
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
  setInteractionMode,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import { EventBus } from "@/events/eventBus";
// plugins
import VueCookie from "vue-cookies";

// import common prototype
import Constant from "./configs/constant";
import Helper from "./helpers/index";
import "./helpers/validate";
import Api from "./services/api";
import Moment from "moment";
import Log from "@/helpers/log";
// Bootstrap Vue
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

// Master CSS
import "@/assets/css/master.css";

import {
  faEnvelope,
  faPhoneAlt,
  faUserPlus,
  faSignInAlt,
  faMapMarkerAlt,
  faUserGraduate,
  faCaretDown,
  faUserLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faEnvelope,
  faPhoneAlt,
  faUserPlus,
  faSignInAlt,
  faMapMarkerAlt,
  faUserGraduate,
  faCaretDown,
  faUserLock,
  faUser
);

Vue.prototype.$constant = Constant;
Vue.prototype.$helper = Helper;
Vue.prototype.$api = Api;
Vue.prototype.$moment = Moment;
Vue.prototype.$cookie = VueCookie;
Vue.prototype.$eventBus = EventBus;
Vue.prototype.$routeTimer = 0;
Vue.prototype.$log = Log;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ElementUI);
Vue.component("fa", FontAwesomeIcon);

// set mode of vee-validate
setInteractionMode("passive");

i18n.locale = VueCookie.get("locale") || "en";
Moment.locale(i18n.locale);
localize(i18n.locale);

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key]);
});

Vue.config.productionTip = false;

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

window.URL = window.URL || window.webkitURL;

new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount("#app");
