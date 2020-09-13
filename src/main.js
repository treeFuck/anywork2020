import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 按需引入iview
import { Message, Switch, Button, Modal, Input, Select, Option, Notice } from 'view-design';
import 'view-design/dist/styles/iview.css';


Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;
Vue.component('i-switch', Switch);
Vue.component('Button', Button);
Vue.component('i-input', Input);
Vue.component('i-select', Select);
Vue.component('i-option', Option);


Vue.config.productionTip = false;
new Vue({
  router,
  store,
  Message,
  Notice,
  render: h => h(App)
}).$mount('#app')
