import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 公共 css
import '@/assets/css/common.css'
//字体图标
import '@/assets/css/iconfont.css'

// flexible 适配
import '@/assets/js/flexible'

// ly-tab 插件
import LyTab from 'ly-tab'

// 引入mint ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// 引入 Vant ui
import Vant from 'vant';

// 引入 fastclick
import FastClick from 'fastclick'
// 使用 fastclick
FastClick.attach(document.body);

Vue.use(MintUI)

Vue.use(Vant)

Vue.use(LyTab)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: (h) => h(App),
}).$mount("#app");
