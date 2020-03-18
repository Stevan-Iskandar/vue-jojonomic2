// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import {VuejsDatatableFactory} from 'vuejs-datatable'

Vue.config.productionTip = false
Vue.use(VuejsDatatableFactory)

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  mounted () {
    $('#app').on('click', '#area .list-group-item', function() {
      alert('ok');
    });
  }
})
