// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import * as uiv from 'uiv'
import locale from 'uiv/src/locale/lang/zh-CN'
import VueAnalytics from 'vue-analytics'
// register globally
import infiniteScroll from 'vue-infinite-scroll'
import VueTimeago from 'vue-timeago'

import '@/less/app.less'

Vue.use(uiv, {locale})
// analytics
Vue.use(VueAnalytics, {
  id: 'UA-119751378-1',
  router
})
// 无限滚动
Vue.use(infiniteScroll)

// https://github.com/egoist/vue-timeago
Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'zh_cn',
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn')
  }
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
