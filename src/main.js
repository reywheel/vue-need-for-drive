import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vClickOutside from "v-click-outside";
import i18n from "@/plugins/i18n";
import VueSimpleSVG from "vue-simple-svg";
import { actionTypes as errorsAT } from "@/store/errors";

Vue.use(VueSimpleSVG);
Vue.use(vClickOutside);
Vue.config.productionTip = false;
includeBaseComponents();

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

function includeBaseComponents() {
  var requireComponent = require.context(
    "./components",
    true,
    /Base[A-Z]\w+\.(vue|js)$/
  );
  requireComponent.keys().forEach(function(fileName) {
    var baseComponentConfig = requireComponent(fileName);
    baseComponentConfig = baseComponentConfig.default || baseComponentConfig;
    var baseComponentName =
      baseComponentConfig.name ||
      fileName.replace(/^.+\//, "").replace(/\.\w+$/, "");
    Vue.component(baseComponentName, baseComponentConfig);
  });
}

export function addError(error) {
  store.dispatch(errorsAT.addError, { error });
}
