import { CARTLIST, CHECKALL, CHECKNO, SINGLECHECK } from './mutations-types'
import { Toast, Dialog } from 'vant';

import http from "@/common/api/request";

export default {
    namespaced: true,
    state: {
        list: JSON.parse(window.localStorage.getItem('cartlist')) || [], // 购物车数据
        selectList: JSON.parse(window.localStorage.getItem('selectList')) || [] // 选中的数据
    },
    getters: {
        isCheckedAll(state) {
            return state.list.length == state.selectList.length
        },
        total(state) {
            let total = {
                num: 0,
                price: 0
            }
            state.list.forEach(v => {
                if (v.checked) {
                    total.num += parseInt(v.goods_num)
                    total.price += v.goods_price * v.goods_num
                }
            })
            return total
        }
    },
    actions: {
        checkAllFn({ commit, getters }) {
            getters.isCheckedAll ? commit('CHECKNO') : commit('CHECKALL')
        },
        deleteGoods({ state, commit }, id) {
            // 如果没有被选中给出提示信息
            if (state.selectList.length == 0) {
                Toast('请选择要删除的商品');
            }
            let arrCartId = []
            Dialog.confirm({
                message: '确定要删除这些商品吗？',
            }).then(() => {
                if (typeof id == 'number') {
                    // 单选删除
                    arrCartId = [id]
                    let index = state.list.findIndex(v => {
                        return v.id == id
                    })
                    state.list.splice(index, 1)
                } else {
                    // 多选删除
                    arrCartId = state.selectList
                    commit('DELGOODS')
                }
                http.$axios({
                    url: "/api/deleteCart",
                    method: 'POST',
                    data: {
                        arrId: arrCartId
                    }
                }).then((res) => {
                    if (res.success) {
                        Toast.success('删除成功');
                    }
                })
            }).catch(() => { });
        }
    },
    mutations: {
        // 购物车数据
        [CARTLIST](state, cartArr) {
            state.list = cartArr
            state.selectList = state.list.map(v => {
                return v.id
            })
            window.localStorage.setItem('list', JSON.stringify(state.list))
            window.localStorage.setItem('selectList', JSON.stringify(state.selectList))
        },
        // 全选
        [CHECKALL](state) {
            state.selectList = state.list.map(v => {
                v.checked = true
                return v.id
            });
        },
        // 全不选
        [CHECKNO](state) {
            state.list.forEach(v => {
                v.checked = false
            });
            state.selectList = []
        },
        // 单选
        [SINGLECHECK](state, index) {
            let id = state.list[index].id
            let selectId = state.selectList.indexOf(id)

            // 如果能找到，则删除此id
            if (selectId > -1) {
                return state.selectList.splice(selectId, 1)
            }
            // 如果之前没有选中，就给selectList添加一个id
            state.selectList.push(id)
        },
        // 删除
        DELGOODS(state) {
            state.list = state.selectList.filter(v => {
                return state.selectList.indexOf(v.id) == -1
            })
        }
    },
}