// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from '@/router/login'
import App from './App'
import VueAnalytics from 'vue-analytics'
import '@/less/app.less'


// analytics
Vue.use(VueAnalytics, {
  id: 'UA-119751378-1',
  router
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
