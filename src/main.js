// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faUsers, faUser} from '@fortawesome/free-solid-svg-icons'
import {faFontAwesome} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import $ from 'jquery'
import {ClientTable} from 'vue-tables-2';

library.add(faUsers, faUser, faFontAwesome)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(ClientTable);

export const bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  mounted () {
    // $('#app').on('click', '#area .list-group-item', function() {
    //   alert('ok');
    // });
  }
})
