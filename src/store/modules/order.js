import { INITORDER } from './mutations-types'

export default {
    namespaced: true,
    state: {
        list: [],
        order_id: localStorage.getItem('storeId') || ''
    },
    getters: {},
    actions: {},
    mutations: {
        [INITORDER] (state, orderId) {
            state.list = orderId;

            //存储订单号
            state.order_id = orderId[0].order_id;

            //设置一个id号
            localStorage.setItem('storeId', orderId[0].order_id);
        }
    }
}