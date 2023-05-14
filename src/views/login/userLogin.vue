<template>
  <div class="user-login container">
    <header>
      <Header>
        <span>登录</span>
      </Header>
    </header>
    <section>
      <form action="" onsubmit="return false">
        <div class="user-login-tel">
          <input type="tel" placeholder="请输入手机号" maxlength="11" v-model="account.userTel">
        </div>
        <div class="user-login-info">
          <input type="tel" placeholder="请输入密码" maxlength="12" v-model="account.userPwd">
        </div>
        <button class="user-login-sign" @click="handlelogin">登 录</button>
        <div class="user-login-tab">
          <div @click="handleSmsLogin">
            <i class="iconfont icon-duanxin"></i>
            <span>短信登录</span>
          </div>
          <div @click="handleRetrievePassword">
            <i class="iconfont icon-mima1"></i>
            <span>找回密码</span>
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
  data () {
    return {
      account: {
        userTel: "",
        userPwd: "",
      },
      rules: {
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: "账号输入不正确",
        },
        userPwd: {
          rule: /^\w{6,16}$/,
          msg: "请输入6-16位密码",
        },
      },
    };
  },
  methods: {
    ...mapMutations("user", ["USER_LOGIN"]),
    handleSmsLogin () {
      this.$router.push({
        name: "Login",
      });
    },
    handleRetrievePassword () {
      this.$router.push({
        name: "retrieveIndex",
      });
    },
    handleRegister () {
      this.$router.push({
        name: "Register",
      });
    },
    handlelogin () {
      // 1. 如果没有输入账号密码在登录时给出提示
      if (!this.validate("userTel") || !this.validate("userPwd")) return;

      // 2. 验证成功并发送请求，后端进行验证
      http
        .$axios({
          url: "/api/login",
          method: "POST",
          data: {
            userTel: this.account.userTel,
            userPwd: this.account.userPwd,
          },
        })
        .then((res) => {
          // 账号和密码匹配则成功登录
          // 提示信息
          Toast(res.msg);

          // 登录失败
          if (!res.success) return;

          this.USER_LOGIN(res.data);

          // 登录成功，跳转页面
          this.$router.push({
            name: "My",
          });
        });
    },
    validate (key) {
      let val = true;
      if (!this.rules[key].rule.test(this.account[key])) {
        // 如果规则与输入的不匹配展示提示信息
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
.user-login {
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
          line-height: 44px;
          padding: 0 0.2667rem;
          border: 0.0267rem solid #d7d7d7;
          border-radius: 0.1067rem;
          box-sizing: border-box;
        }
      }

      & .user-login-tel input {
        width: 100%;
      }

      & .user-login-info {
        display: flex;

        & input {
          width: 100%;
        }
      }

      & .user-login-sign {
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

      & .user-login-tab {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #222222;

        & i {
          font-size: 0.48rem;
          // padding-right: 1px;
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