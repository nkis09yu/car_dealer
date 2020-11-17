import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import './assets/css/reset.css'
import './assets/css/common.css'
import axios from 'axios'
import qs from 'qs'
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)
// 移动端调试
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// Vue.use(vConsole)

// import './mock/index.js'

Vue.prototype.qs = qs 
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

import { Image as VanImage } from 'vant';
import { Lazyload, Toast, Overlay, Dialog } from 'vant';

Vue.use(VanImage);
Vue.use(Lazyload);
Vue.use(Toast);
Vue.use(Overlay);
Vue.use(Dialog);

router.beforeEach((to, from, next) => {
  store.state.footerIndex = to.meta.index;
  store.state.showFooter = to.meta.showFooter;
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
