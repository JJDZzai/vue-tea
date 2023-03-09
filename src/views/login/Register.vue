<template>
  <div class="register container">
    <header>
      <Header>
        <span>注册</span>
      </Header>
    </header>
    <section>
      <form
        action=""
        onsubmit="return false"
      >
        <div class="register-tel">
          <input
            type="tel"
            placeholder="请输入手机号"
            maxlength="11"
            v-model="account.userTel"
          >
        </div>
        <div class="register-info">
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
        <div class="register-tel">
          <input
            type="password"
            placeholder="请输入设置密码"
            maxlength="16"
            v-model="account.userPwd"
          >
        </div>
        <button
          class="register-sign"
          @click="handleRegistereAccount"
        >注 册</button>
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

export default {
  name: "register",
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
        userPwd: "",
      },
      rules: {
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: "手机号输入不正确",
        },
        userPwd: {
          rule: /^\w{6,16}$/,
          msg: "密码需为6-16位",
        },
      },
    };
  },
  methods: {
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
          console.log("注册账号返回的验证码", res);
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
    handleRegistereAccount() {
      // 如果没有输入账号密码在登录时给出提示
      if (
        !this.account.userTel &&
        !this.account.infoCode &&
        !this.account.userPwd
      ) {
        return Toast("请输入正确的手机号");
      }
      if (this.code == this.account.infoCode) {
        http
          .$axios({
            url: "/api/register",
            method: "POST",
            data: {
              phone: this.account.userTel,
              pwd: this.account.userPwd,
            },
          })
          .then((res) => {
            // 发送请求之后，密码与正则不匹配给出提示
            if (!this.validate("userPwd")) return;

            Toast(res.msg);

            if (!res.success) return;

            console.log("返回的结果", res);

            this.$router.push({
              name: "userLogin",
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
.register {
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
      & .register-tel input {
        width: 100%;
      }
      & .register-info {
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
      & .register-sign {
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