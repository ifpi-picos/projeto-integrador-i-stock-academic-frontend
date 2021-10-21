import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alert: false
  },
  mutations: {
    changeAlert (state, payload) {
      state.alert = payload
    }
  },
  actions: {
    CHANGE_ALERT (context, payload) {
      context.commit('changeAlert', payload)
      console.log(payload)
    }
  },

  getters: {
    alert: (state) => {
      return state.alert
    },
  },

  modules: {
  }
})
