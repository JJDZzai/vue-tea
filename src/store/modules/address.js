import { INITDATA } from './mutations-types'

export default {
    namespaced: true,
    state: {
        list: []
    },
    getters: {
        defaultAddress(state) {
            return state.list.filter(v => {
                return v.isDefault == 1
            })
        }
    },
    actions: {},
    mutations: {
        [INITDATA](state, arr) {
            state.list = arr
        }
    }
}