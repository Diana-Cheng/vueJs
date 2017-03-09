var Vue = require('vue')
var VueResource = require('vue-resource')
var VueRouter = require('vue-router')

// Vue.use(VueResource)
Vue.use(VueRouter)

var header = require('../components/header.vue')
var tab = require('../components/tab.vue')
var Goods = require('../components/goods.vue')
var Ratings = require('../components/ratings.vue')
var Seller = require('../components/seller.vue')

const  routes = [
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/seller', component:Seller}
]
const  router = new VueRouter({
  routes
})
// var vm = new Vue({
//   el: '#app',
//   components: {
//     'cloud-head': header,
//     'cloud-tab': tab
//   },
//   router
// })
const app = new Vue({
  components: {
    'cloud-head': header,
    'cloud-tab': tab
  },
  router
}).$mount('#app')