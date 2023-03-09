<template>
  <div class="retrieve-index container">
    <header>
      <Header>
        <span>找回密码</span>
      </Header>
    </header>
    <section>
      <form
        action=""
        onsubmit="return false"
      >
        <div class="retrieve-index-tel">
          <input
            type="tel"
            placeholder="请输入手机号"
            maxlength="11"
            v-model="account.userTel"
          >
        </div>
        <div class="retrieve-index-info">
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
          class="retrieve-index-sign"
          @click="handleNextStep"
        >下一步</button>
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
  name: "RetrieveIndex",
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
          msg: "手机号输入不正确，应为11位",
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
          console.log("忘记密码返回的验证码", res);
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
    handleNextStep() {
      // 如果没有输入账号密码在登录时给出提示
      if (!this.account.userTel) {
        return Toast("手机号有误");
      }

      if (!this.code == this.account.infoCode) {
        Toast("验证码输入不正确");
      }

      if (this.code == this.account.infoCode) {
        http
          .$axios({
            url: "/api/retrieve",
            method: "POST",
            data: {
              phone: this.account.userTel,
            },
          })
          .then((res) => {
            if (!res.success) {
              return Toast(res.msg);
            }

            this.$router.push({
              name: "retrieveNext",
              query: {
                phone: this.account.userTel,
              },
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
.retrieve-index {
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
      & .retrieve-index-tel input {
        width: 100%;
      }
      & .retrieve-index-info {
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
      & .retrieve-index-sign {
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