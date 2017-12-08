// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor, /* {  default global options } */)

Vue.config.productionTip = false

//var vm = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#wrap',
  //parent: vm,
  router,
  template: '<App/>',
  components: { App }
})

