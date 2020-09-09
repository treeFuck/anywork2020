import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 按需引入iview
import { Message, Switch, Button, Modal, Input } from 'view-design';
import 'view-design/dist/styles/iview.css';


Vue.prototype.$Message = Message;
Vue.prototype.$Model = Modal;
Vue.component('i-switch', Switch);
Vue.component('Button', Button);
Vue.component('i-input', Input);


Vue.config.productionTip = false;
new Vue({
  router,
  store,
  Message,
  render: h => h(App)
}).$mount('#app')
