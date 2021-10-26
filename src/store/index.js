import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alert: false,
    actionBalance: false,
  },

  mutations: {
    changeAlert (state, payload) {
      state.alert = payload
    },

    setBalance (state, payload) {
      state.actionBalance = payload
    }
  },

  actions: {
    CHANGE_ALERT (context, payload) {
      context.commit('changeAlert', payload)
    },

    CHANGE_BALANCE (context, payload) {
      context.commit('setBalance', payload)
    },
  },

  getters: {
    alert: (state) => {
      return state.alert
    },

    actionBalance: (state) => {
      return state.actionBalance
    }
  },

  modules: {
  }
})
