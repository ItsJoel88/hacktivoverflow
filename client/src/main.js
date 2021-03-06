import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAWN from "vue-awesome-notifications"
import 'vue-awesome-notifications/dist/styles/style.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue2Editor from "vue2-editor";


Vue.use(Vue2Editor);
Vue.use(BootstrapVue)
Vue.use(VueAWN)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
