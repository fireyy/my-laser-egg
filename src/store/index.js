import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      id: null,
      mac: null,
      now: {},
      today: [],
      recent: [],
      loading: true
    },
    actions,
    mutations,
    getters
  })
}
