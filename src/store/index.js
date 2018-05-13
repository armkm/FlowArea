import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { firebaseMutations } from 'vuexfire'
import { firebaseAction } from 'vuexfire'

export const store = new Vuex.Store({
    strict: true,
    state: {
        todos: []
    },
    mutations: firebaseMutations,
    getters: {
        todos: state => state.todos,
    },
    actions: {
        setTodosRef: firebaseAction(({bindFirebaseRef}, ref) => {
            bindFirebaseRef('todos', ref)
        }),
    },
})

