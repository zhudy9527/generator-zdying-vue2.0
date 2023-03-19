import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import store from './store/index'
import ElementUI from 'element-ui';
import './assets/css/index.css'
Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')