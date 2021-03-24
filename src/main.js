import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vClickOutside from "v-click-outside";
import i18n from "@/plugins/i18n";
import VueSimpleSVG from "vue-simple-svg";

Vue.use(VueSimpleSVG);
Vue.use(vClickOutside);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
