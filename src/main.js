import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import apiGet from './api/http.js'
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// const ls=async ()=>{
//   return await apiGet('')
// }
// console.log(ls());
  
new Vue({
  render: h => h(App),
}).$mount('#app')
