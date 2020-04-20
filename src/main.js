import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

import {VApp, VFooter, VCarousel} from 'vuetify'
Vue.use(vuetify, { components: { VApp, VFooter, VCarousel}})

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyB6AdustZXGPajm25Iog1LBCKz6PD7uREM",
      authDomain: "animalcrossinghangout.firebaseapp.com",
      databaseURL: "https://animalcrossinghangout.firebaseio.com",
      projectID: "animalcrossinghangout", 
      storageBucket: "gs://animalcrossinghangout.appspot.com"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadHangouts')
  }
}).$mount('#app')


