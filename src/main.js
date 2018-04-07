// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import moment from 'moment/src/moment'
import VueSweetalert2 from 'vue-sweetalert2';
import VueCharts from 'vue-chartjs'

import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false

export const kuuBus = new Vue();
export const tooteBus = new Vue();

Vue.use(Vuetify)
Vue.use(axios)
Vue.use(VueCharts)
Vue.use(VueSweetalert2);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
