<template>
  <div class="login container">
    <header>
      <Header>
        <span>登录</span>
      </Header>
    </header>
    <section>
      <form
        action=""
        onsubmit="return false"
      >
        <div class="login-tel">
          <input
            type="tel"
            placeholder="请输入手机号"
            maxlength="11"
            v-model="account.userTel"
          >
        </div>
        <div class="login-info">
          <input
            type="tel"
            placeholder="请输入短信验证码"
            maxlength="6"
            v-model="account.infoCode"
          >
          <button
            :disabled="disabled"
            @click="getSmsCode"
            :style="{backgroundColor:btnBgColor,color:btnColor}"
          >{{codeMsg}}</button>
        </div>
        <button
          class="login-sign"
          @click="handleLogin"
        >登 录</button>
        <div class="login-tab">
          <div @click="handlePasswordLogin">
            <i class="iconfont icon-mima1"></i>
            <span>密码登录</span>
          </div>
          <div @click="handleRegister">
            <i class="iconfont icon-shouji"></i>
            <span>快速注册</span>
          </div>
        </div>
      </form>
    </section>
    <footer>
      <Tabbar />
    </footer>
  </div>
</template>

<script>
import Header from "./Header";
import Tabbar from "@/components/common/Tabbar";

// mint ui
import { Toast } from "mint-ui";

import http from "@/common/api/request";

import { mapMutations } from "vuex";

export default {
  name: "Login",
  components: {
    Header,
    Tabbar,
  },
  data() {
    return {
      code: "",
      disabled: false,
      codeNum: 6,
      codeMsg: "获取短信验证码",
      btnColor: "",
      btnBgColor: "",
      account: {
        userTel: "",
        infoCode: "",
      },
      rules: {
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: "手机号输入不正确",
        },
      },
    };
  },
  methods: {
    ...mapMutations("user", ["USER_LOGIN"]),
    handlePasswordLogin() {
      this.$router.push({
        name: "userLogin",
      });
    },
    handleRegister() {
      this.$router.push({
        name: "Register",
      });
    },
    getSmsCode() {
      // 1. 验证
      if (!this.validate("userTel")) return;

      // 2. 验证成功并发送请求，后端进行验证
      http
        .$axios({
          url: "/api/code",
          method: "POST",
          data: {
            phone: this.account.userTel,
          },
        })
        .then((res) => {
          console.log("验证码信息", res);
          if (res.success) {
            this.code = res.data;

            // 成功发送之后禁止按钮
            this.disabled = true;

            // 倒计时
            let timer = setInterval(() => {
              --this.codeNum;
              this.codeMsg = `重新发送 ${this.codeNum} 秒`;
              this.btnColor = "#848689";
              this.btnBgColor = "#EEEEEE";
            }, 1000);

            // 清除倒计时
            setTimeout(() => {
              clearInterval(timer);
              this.disabled = false;
              this.codeNum = 6;
              this.codeMsg = "获取短信验证码";
              this.btnColor = "#FFFFFF";
              this.btnBgColor = "#3b8c2f";
            }, 6000);
          }
        });
    },
    validate(key) {
      let val = true;
      if (!this.rules[key].rule.test(this.account[key])) {
        Toast(this.rules[key].msg);
        val = false;
        return false;
      }
      return val;
    },
    handleLogin() {
      // 如果没有输入账号密码在登录时给出提示
      if (!this.account.userTel) {
        return Toast("手机号有误");
      }

      if (!this.code == this.account.infoCode) {
        return Toast("验证码不正确");
      }

      if (this.code == this.account.infoCode) {
        http
          .$axios({
            url: "/api/addUser",
            method: "POST",
            data: {
              phone: this.account.userTel,
            },
          })
          .then((res) => {
            // 发送请求之后，密码与正则不匹配给出提示
            if (!this.validate("userTel")) return;

            Toast(res.msg);

            if (!res.success) return;

            console.log("返回的结果", res);
            this.USER_LOGIN(res.data);

            this.$router.push({
              name: "My",
            });
          });
      } else {
        Toast("验证码不正确");
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
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
          background-color: #ffffff;
          line-height: 1.1733rem;
          padding: 0 0.2667rem;
          border: 0.0267rem solid #d7d7d7;
          border-radius: 0.1067rem;
          box-sizing: border-box;
        }
      }
      & .login-tel input {
        width: 100%;
      }
      & .login-info {
        display: flex;
        & input {
          width: 100%;
          flex: 1;
          border-right: 0;
          border-top-right-radius: 0;
        }
        & button {
          color: #ffffff;
          background-color: #3b8c2f;
          padding: 0 0.2133rem;
          border: 0;
          border-radius: 0.1067rem;
        }
      }
      & .login-sign {
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
      & .login-tab {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #222222;
        & i {
          font-size: 0.48rem;
        }
        & span {
          font-size: 0.3733rem;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>