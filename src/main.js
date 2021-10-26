import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// Import axios
import './service'

// Import localstorage arquive
import './service/localstorage.js'

// Import Scss arquive
import './assets/css/style.scss'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')