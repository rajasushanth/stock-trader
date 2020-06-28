import Vue from 'vue'
import Vuex from 'vuex'
import drawer from "./modules/ui/drawer";
import stocks from "./modules/service/stocks";
import snackbar from "./modules/ui/snackbar";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    drawer,
    stocks,
    snackbar
  }
})
