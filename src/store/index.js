import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        items: []
    },
    mutations: {
        addItems(state, data) {
            state.items = data
        },
        clearState(state, data) {
            state.items = data
        },
    },
    actions: {
        addItems({commit}, data) {
            commit('addItems', data)
        },
        clearState({commit}, data) {
            commit('clearState', data)
        }
    },
    modules: {}
})
