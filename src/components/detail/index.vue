<template>
  <div class="detail">
    <!-- 头部 -->
    <header>
      <div class="detail-header-return" v-show="isShow">
        <div>
          <i class="iconfont icon-fanhui" @click="$router.back()"></i>
        </div>
        <div>
          <i class="iconfont icon-shouye" @click="$router.push('/home')"></i>
        </div>
      </div>

      <div class="detail-header-bar" v-show="!isShow" :style="opacityOptions">
        <div>
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div>
          <span>商品详情</span>
          <span>商品评价</span>
        </div>
        <div>
          <i class="iconfont icon-shouye"></i>
        </div>
      </div>
    </header>

    <!-- 主内容 -->
    <section ref="wrapper">
      <div>
        <div v-for="(detail, index) in detailList" :key="index">
          <div class="detail-swiper">
            <swiper :options="swiperOption">
              <swiper-slide>
                <img :src="detail.imgUrl">
              </swiper-slide>
            </swiper>
            <div class="swiper-position">
              <div class="swiper-pagination"></div>
            </div>
          </div>

          <div class="detail-content">
            <div class="detail-desc">
              <div class="detail-text">
                <h3>{{ detail.name }}</h3>
                <div>{{ detail.content }}</div>
              </div>
              <div class="detail-price">
                <div class="detail-price-now">
                  <span>￥</span>
                  <b>{{ detail.price }}</b>
                </div>
                <div class="detail-price-before">
                  <span>价格:</span>
                  <del>￥{{ detail.original_price }}</del>
                </div>
              </div>
            </div>
          </div>

          <div class="detail-introdu">
            <div class="detail-introdu-text">
              <i class="iconfont icon--shangpinxiangqing-gai"></i>
              <h3>商品详情</h3>
            </div>
            <div>
              <img :src="detail.imgUrl">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer>
      <div class="detail-cell">
        <div>
          <i class="iconfont icon-kefu"></i>
          <span>客服</span>
        </div>
        <div @click="$router.push('/cart')">
          <i class="iconfont icon-gouwuche"></i>
          <span>购物车</span>
        </div>
        <div>
          <i class="iconfont icon-shoucang"></i>
          <span>收藏</span>
        </div>
      </div>
      <div class="detail-shop plate" @click="addToCart">加入购物车</div>
      <div class="detail-buy plate">立即购买</div>
    </footer>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

// 引入 better-scroll
import BetterScroll from "better-scroll";

import http from "@/common/api/request";

// mint ui
import { Toast } from "mint-ui";

export default {
  name: "detail",
  components: {
    swiper,
    swiperSlide,
  },
  data () {
    return {
      id: 0,
      isShow: true,
      BetterScroll: "",
      opacityOptions: {},
      detailList: [],
      swiperOption: {
        //swiper3
        autoplay: true,
        // 手动滑动后不再轮播处理
        on: {
          slideChangeTransitionEnd: function () {
            this.autoplay.start();
          },
        },
        // loop: true,
        speed: 500,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "fraction",
        },
      },
    };
  },
  created () {
    this.getData();
  },
  activated () {
    // 判断传过来的id和当前的id是否一致，不一致重新发送请求，一致就走缓存
    if (this.id != this.$route.query.id) {
      this.getData();
      this.id = this.$route.query.id;
    }
  },
  methods: {
    getData () {
      let id = this.$route.query.id;
      http
        .$axios({
          url: "/api/detail_list/id",
          params: { id },
        })
        .then((res) => {
          this.detailList = res;
        });

      this.$nextTick(function () {
        this.BetterScroll = new BetterScroll(this.$refs.wrapper, {
          click: true,
          probeType: 3,
          movable: true,
          zoom: true,
          bounce: false,
        });

        this.BetterScroll.on("scroll", (pop) => {
          let scrollY = Math.abs(pop.y);
          let opacity = scrollY / 100;

          opacity = opacity > 1 ? 1 : opacity;

          this.opacityOptions = { opacity };

          if (scrollY >= 50) {
            this.isShow = false;
          } else {
            this.isShow = true;
          }
        });
      });
    },
    addToCart () {
      let id = this.$route.query.id;
      http
        .$axios({
          url: "/api/addCart",
          method: "POST",
          data: {
            goodsId: id,
          },
          headers: {
            token: true,
          },
        })
        .then((res) => {
          if (res.success) {
            Toast(res.msg);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;

  // 头部
  & header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 1.1733rem;

    & .detail-header-return {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 1.1733rem;

      & div {
        width: 0.9067rem;
        height: 0.9067rem;
        margin: 0 0.2667rem;
        color: #ffffff;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        text-align: center;

        & i {
          font-size: 0.64rem;
          line-height: 0.9067rem;
        }
      }
    }

    & .detail-header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 1.1733rem;
      background-color: #ffffff;
      font-size: 0.4267rem;

      & span {
        padding: 0 0.5333rem;
      }

      & i {
        padding: 0 0.2667rem;
        font-size: 0.64rem;
      }
    }
  }

  // 主内容
  & section {
    flex: 1;
    overflow: hidden;

    & .detail-swiper {
      position: relative;
      width: 100%;
      height: 10rem;
      background-color: #ffffff;
      border-bottom: 0.0133rem solid #e3e5e9;
    }

    & .detail-content {
      padding: 0 0.2667rem;

      & .detail-desc {
        background-color: #ffffff;
        border-radius: 0.4rem;
        padding: 0.2667rem;
        margin-top: 0.1867rem;

        & .detail-text {
          padding-bottom: 0.2667rem;
          border-bottom: 0.0133rem solid #e3e5e9;

          & h3 {
            font-size: 0.48rem;
            font-weight: 400;
          }

          & div {
            padding: 0.1333rem 0;
            color: #999999;
            font-size: 0.3733rem;
          }
        }

        & .detail-price {
          padding: 0.2667rem 0;

          & .detail-price-now {
            color: #d22531;

            & span {
              font-size: 0.4267rem;
            }
          }

          & .detail-price-before {
            color: #9a9b9a;
            font-size: 0.3733rem;
          }
        }
      }
    }

    & .detail-introdu {
      background-color: #ffffff;
      margin-top: 0.2667rem;
      padding: 0 0.2667rem;

      & .detail-introdu-text {
        display: flex;
        align-items: center;
        padding: 0.2667rem 0 0.5333rem 0;

        & i {
          color: #dd2727;
        }

        & h3 {
          font-size: 0.4267rem;
          margin-left: 0.1333rem;
        }
      }

      & img {
        width: 100%;
        height: 100%;
      }
    }
  }

  // 底部
  & footer {
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.3067rem;
    background-color: #ffffff;
    border-top: 0.0267rem solid #e5e5e5;

    & .detail-cell {
      display: flex;
      height: 1.3067rem;
      color: #999999;
      font-size: 0.3733rem;

      & div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 1.3333rem;
        border-right: 0.0267rem solid #f5f5f5;
        line-height: 0.5867rem;

        & i {
          font-size: 0.5333rem;
        }
      }
    }

    & .detail-shop {
      background-color: #ff9500;
    }

    & .detail-buy {
      background-color: #dd2727;
    }

    & .plate {
      flex: 1;
      height: 100%;
      color: #ffffff;
      font-size: 0.4267rem;
      line-height: 1.3067rem;
    }

    & div {
      text-align: center;
    }
  }
}

.swiper-container {
  width: 100%;
  height: 10rem;

  & img {
    width: 100%;
    height: 10rem;
  }
}

.swiper-position {
  position: absolute;
  right: 0.1333rem;
  bottom: 0.1333rem;
  width: 0.9333rem;
  color: #ffffff;
  font-size: 0.2667rem;

  .swiper-pagination {
    width: 100%;
    background-color: #b2b2b2;
    border-radius: 0.2rem;
    padding: 0.0533rem;
  }
}

.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal>.swiper-pagination-bullets {
  left: -0.2667rem;
}
</style>