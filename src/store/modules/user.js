import { USER_LOGIN, USER_INFO, LOGINOUT } from './mutations-types'
export default {
    namespaced: true,
    state: {
        // 登录状态
        loginStatus: false,
        // token
        token: null,
        // 用户信息：用户头像 | 用户昵称
        userInfo: {}
    },
    getters: {

    },
    actions: {},
    mutations: {
        // 设置用户信息
        [USER_LOGIN](state, user) {
            // 成功登录
            state.loginStatus = true
            // token值记录
            state.token = user.token
            // 用户所有信息
            state.userInfo = user

            localStorage.setItem('userInfo', JSON.stringify(user))
        },

        // 读取用户信息
        [USER_INFO](state) {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            if (userInfo) {
                state.loginStatus = true
                state.token = userInfo.token
                state.userInfo = userInfo
            }
        },

        // 退出登录
        [LOGINOUT](state) {
            state.loginStatus = false
            state.token = null
            state.userInfo = {}
            localStorage.removeItem('userInfo')
        }
    }
}
