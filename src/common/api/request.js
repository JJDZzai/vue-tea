// 引入mint ui
import { Indicator } from "mint-ui";
import axios from "axios";
import store from "@/store";
import router from "@/router";

export default {
    common: {
        method: 'GET',
        data: {},
        params: {},
        headers: {}
    },
    $axios(options = {}) {
        options.method = options.method || this.common.method
        options.data = options.data || this.common.data
        options.params = options.params || this.common.params
        options.headers = options.headers || this.common.headers

        Indicator.open("加载中...");

        // 是否为登录状态
        if (options.headers.token) {
            options.headers.token = store.state.user.token
            if (!options.headers.token) {
                router.push('/user_login')
            }
        }

        return axios(options).then(res => {
            let data = res.data.data

            // token 过期重新登录
            if (data.code == 1000) {
                Indicator.close();
                return router.push('/user_login')
            }

            return new Promise((resolve, reject) => {
                if (!res) reject()

                resolve(data)

                setTimeout(() => {
                    Indicator.close();
                }, 300)
            })
        })
    }
}