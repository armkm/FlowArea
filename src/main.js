// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import VueFire from 'vuefire'
import Vuex from 'vuex'

Vue.use(Vuex)
import 'element-ui/lib/theme-chalk/index.css';
import VueProgressBar from 'vue-progressbar'
import IcFirebaseUploader from 'ic-firebase-uploader';
import 'ic-firebase-uploader/dist/ic-firebase-uploader.min.css';
import { store } from './store'

Vue.config.productionTip = false
Vue.component('ic-firebase-uploader', IcFirebaseUploader);
Vue.use(VueFire)
Vue.use(require('vue-moment'));

const options = {
    color: '#000',
    failedColor: '#000',
    thickness: '5px',
    transition: {
        speed: '0.5s',
        opacity: '0.5s',
        termination: 500
    },
    autoRevert: true,
    location: 'top',
    inverse: false
}
Vue.use(VueProgressBar, options)
Vue.use(ElementUI);



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
