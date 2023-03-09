<template>
  <div
    class="my container"
    ref="main"
  >
    <div>
      <header>
        <div
          class="my-userinfo"
          v-if="loginStatus"
        >
          <img
            :src="userInfo.avatar"
            width="55"
            height="55"
          >
          <span>{{userInfo.nickname}}</span>
        </div>
        <div
          class="my-login"
          @click="handleLogin"
          v-else
        >登录 / 注册</div>
      </header>
      <section>
        <div class="my-order">
          <h1>我的订单</h1>
          <ul>
            <li>
              <i class="iconfont icon-quanbudingdan"></i>
              <span>全部</span>
            </li>
            <li>
              <i class="iconfont icon-daifukuan"></i>
              <span>待支付</span>
            </li>
            <li>
              <i class="iconfont icon-daifahuo"></i>
              <span>待发货</span>
            </li>
            <li>
              <i class="iconfont icon-daishouhuo"></i>
              <span>待收货</span>
            </li>
            <li>
              <i class="iconfont icon-daipingjia"></i>
              <span>待评价</span>
            </li>
          </ul>
        </div>
        <div class="my-person">
          <h1>个人中心</h1>
          <ul>
            <li>
              <div>
                <i class="iconfont icon-cha"></i>
                <span>我的茶购</span>
              </div>
              <div>
                <i class="iconfont icon-youjiantou"></i>
              </div>
            </li>
            <li>
              <div>
                <i class="iconfont icon-shoucang"></i>
                <span>我的收藏</span>
              </div>
              <div>
                <i class="iconfont icon-youjiantou"></i>
              </div>
            </li>
            <li @click="handleAddress">
              <div>
                <i class="iconfont icon-dizhi"></i>
                <span>地址管理</span>
              </div>
              <div>
                <i class="iconfont icon-youjiantou"></i>
              </div>
            </li>
          </ul>
        </div>
        <div class="my-tool">
          <h1>工具</h1>
          <ul>
            <li>
              <div>
                <i class="iconfont icon-jiarubanji"></i>
                <span>加入茶师</span>
              </div>
              <div>
                <i class="iconfont icon-youjiantou"></i>
              </div>
            </li>
            <li>
              <div>
                <i class="iconfont icon-he_16yijianxiang"></i>
                <span>意见箱</span>
              </div>
              <div>
                <i class="iconfont icon-youjiantou"></i>
              </div>
            </li>
            <li>
              <div>
                <i class="iconfont icon-kefu"></i>
                <span>客服</span>
              </div>
              <div>
                <i class="iconfont icon-youjiantou"></i>
              </div>
            </li>
          </ul>
          <div
            class="log-out"
            @click="LOGINOUT"
            v-if="loginStatus"
          >退出登录</div>
        </div>
      </section>
    </div>
    <footer>
      <Tabbar />
    </footer>
  </div>
</template>

<script>
import Tabbar from "@/components/common/Tabbar";

import BetterScroll from "better-scroll";

import { mapState, mapMutations } from "vuex";

export default {
  name: "My",
  components: {
    Tabbar,
  },
  data() {
    return {
      url: "http://www.baidu.com",
    };
  },
  mounted() {
    new BetterScroll(this.$refs.main, {
      click: true,
      movable: true,
      zoom: true,
      bounce: false,
    });
  },
  computed: {
    ...mapState("user", ["userInfo", "loginStatus"]),
  },
  methods: {
    ...mapMutations("user", ["LOGINOUT"]),
    handleLogin() {
      this.$router.push({
        name: "Login",
      });
    },
    handleAddress() {
      this.$router.push({
        name: "Address",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.my {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  & header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 4.2667rem;
    // background: url("../assets/images/cbtopbg.jpg") no-repeat;
    background-color: #67d377;
    & .my-login {
      color: #ffffff;
      background-color: #f8aa07;
      border-radius: 0.16rem;
      font-size: 0.4267rem;
      padding: 0.1333rem 0.5333rem;
    }
    & .my-userinfo {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      & img {
        border-radius: 50%;
      }
      & span {
        font-size: 0.48rem;
      }
    }
  }
  & section {
    background-color: #f5f5f5;
    padding: 0.1333rem;
    height: 600px;
    & .my-order {
      margin-bottom: 0.2667rem;
      & ul {
        display: flex;
        justify-content: space-between;
        padding: 0 0.2667rem;
        padding-right: 0.5333rem;
        & li {
          display: flex;
          flex-direction: column;
          & i {
            color: #9e9e9e;
            font-size: 28px;
            text-align: center;
            padding-bottom: 0.1333rem;
          }
          & span {
            color: #222222;
            font-size: 0.3733rem;
          }
        }
      }
    }
    & .my-person {
      margin-bottom: 0.2667rem;
      & li:nth-of-type(1) div:nth-of-type(1) i:nth-of-type(1) {
        color: #ff8269;
      }
      & li:nth-of-type(2) div:nth-of-type(1) i:nth-of-type(1) {
        color: #ffce54;
      }
      & li:nth-of-type(3) div:nth-of-type(1) i:nth-of-type(1) {
        color: #ff4b51;
      }
    }
    & .my-tool {
      & li:nth-of-type(1) div:nth-of-type(1) i:nth-of-type(1) {
        color: #95abf3;
      }
      & li:nth-of-type(2) div:nth-of-type(1) i:nth-of-type(1) {
        color: #b3c937;
      }
      & li:nth-of-type(3) div:nth-of-type(1) i:nth-of-type(1) {
        color: #00c670;
      }
    }
    & h1 {
      font-size: 0.3733rem;
      font-weight: 400;
      line-height: 1.1733rem;
      border-bottom: 0.0267rem solid #e3e5e9;
      color: #9e9e9e;
      background-color: #ffffff;
      padding-left: 0.2667rem;
    }
    & ul {
      background-color: #ffffff;
      & li {
        display: flex;
        justify-content: space-between;
        color: #222222;
        font-size: 0.3733rem;
        padding: 0.3467rem 0.2667rem;
        padding-right: 0;
        & i {
          padding-right: 0.2133rem;
          &:last-child {
            font-size: 0.3733rem;
          }
        }
        & span {
          color: #222222;
        }
      }
    }
  }
  & .log-out {
    height: 1.0667rem;
    margin-top: 0.2667rem;
    background-color: #ffffff;
    color: #222222;
    font-size: 0.4267rem;
    text-align: center;
    line-height: 1.0667rem;
  }
}
</style>
