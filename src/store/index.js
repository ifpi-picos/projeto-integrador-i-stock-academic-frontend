import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alert: false,
    actionBalance: false,
    listWallets: []
  },

  mutations: {
    changeAlert (state, payload) {
      state.alert = payload
    },

    setBalance (state, payload) {
      state.actionBalance = payload
    },

    setListWallets (state, payload) {
      state.listWallets = payload
    }
  },

  actions: {
    CHANGE_ALERT (context, payload) {
      context.commit('changeAlert', payload)
    },

    CHANGE_BALANCE (context, payload) {
      context.commit('setBalance', payload)
    },

    CHANGE_LIST_WALLETS (context, payload) {
      context.commit('setListWallets', payload)
    }
  },

  getters: {
    alert: (state) => {
      return state.alert
    },

    actionBalance: (state) => {
      return state.actionBalance
    },

    listWallets: (state) => {
      return state.listWallets
    }
  },

  modules: {
  }
})
