<template>
  <div class="retrieve-next container">
    <header>
      <Header>
        <span>找回密码</span>
      </Header>
    </header>
    <section>
      <form action="" onsubmit="return false">
        <div>
          <input type="password" placeholder="请输入新的密码" maxlength="11" v-model="account.userPwd">
        </div>
        <button class="retrieve-next-sign" @click="handleConfirmPassword">确认密码</button>
      </form>
    </section>
    <footer>
      <Tabbar />
    </footer>
  </div>
</template>

<script>
import Header from "../Header";
import Tabbar from "@/components/common/Tabbar";

// mint ui
import { Toast } from "mint-ui";

import http from "@/common/api/request";

export default {
  name: "Login",
  components: {
    Header,
    Tabbar,
  },
  data () {
    return {
      account: {
        userPwd: "",
      },
      rules: {
        userPwd: {
          rule: /^\w{6,16}$/,
          msg: "密码需为6-16位",
        },
      },
    };
  },
  methods: {
    handleConfirmPassword () {
      // 如果没有输入账号密码在登录时给出提示
      if (!this.validate("userPwd")) return;
      if (this.account.userPwd) {
        http
          .$axios({
            url: "/api/recovery",
            method: "POST",
            data: {
              phone: this.$route.query.phone,
              pwd: this.account.userPwd,
            },
          })
          .then((res) => {
            if (res.success) {
              Toast(res.msg);
            }
            this.$router.push({
              name: "userLogin",
            });
          });
      }
    },
    validate (key) {
      let val = true;
      if (!this.rules[key].rule.test(this.account[key])) {
        Toast(this.rules[key].msg);
        val = false;
        return false;
      }
      return val;
    },
  },
};
</script>

<style lang="scss" scoped>
.retrieve-next {
  & section {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;

    & form {
      margin-top: 0.6667rem;

      & div {
        height: 1.1733rem;
        margin: 0.4rem 0;

        & input {
          width: 100%;
          background-color: #ffffff;
          line-height: 44px;
          padding: 0 0.2667rem;
          border: 0.0267rem solid #d7d7d7;
          border-radius: 0.1067rem;
          box-sizing: border-box;
        }
      }

      & .retrieve-next-sign {
        width: 8.9333rem;
        height: 1.1733rem;
        color: #ffffff;
        background-color: #3b8c2f;
        text-align: center;
        line-height: 1.1733rem;
        font-size: 14px;
        border: 0;
        border-radius: 0.1067rem;
      }
    }
  }
}
</style>