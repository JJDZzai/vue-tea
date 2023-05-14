<template>
  <div class="order container">
    <Header />
    <section ref="main">
      <div>
        <div class="order-info">
          <h3>收货信息: </h3>
          <div class="order-info-detail" @click="goAddress">
            <div v-if="this.address">
              <div>
                <span>{{ address.name }}</span>&nbsp;&nbsp;
                <span>{{ address.tel }}</span>
              </div>
              <div>
                <span>{{ address.province }}</span>&nbsp;&nbsp;
                <span>{{ address.city }}</span>&nbsp;&nbsp;
                <span>{{ address.county }}</span>&nbsp;&nbsp;
                <span>{{ address.addressDetail }}</span>
              </div>
            </div>
            <div class="order-info-detail_empty" v-else>
              <span>您的收货地址为空，点击添加收货地址</span>
            </div>
            <div>
              <i class="iconfont icon-youjiantou"></i>
            </div>
          </div>
        </div>
        <div class="order-payment">
          <div class="order-payment-method">支付方式： <span>选择在线支付</span></div>
          <van-radio-group v-model="paymentMethod" direction="horizontal">
            <van-radio name="zfb">支付宝</van-radio>
            <van-radio name="wx">微信支付</van-radio>
          </van-radio-group>
        </div>
        <div class="order-goods">
          <ul>
            <li v-for="(good, index) in goodsList" :key="index" @click="goDetail(good.id)">
              <div>
                <img :src="good.goods_imgUrl">
              </div>
              <div class="order-goods-content">
                <h3>{{ good.goods_name }}</h3>
                <div class="order-goods-content_subtotal">
                  <span>￥{{ good.goods_price }}</span>
                  <span>x{{ good.goods_num }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <footer>
      <div class="order-total">
        共<span>{{ total.num }}</span>件，
        总金额: <span>￥{{ total.price }}</span>
      </div>
      <div class="order-submit" @click="goPayment">提交订单</div>
    </footer>
  </div>
</template>

<script>
import Header from "./Header";
import { mapState, mapGetters, mapMutations } from "vuex";

import "vant/lib/index.css";

import http from "@/common/api/request";

import BetterScroll from "better-scroll";

import { Toast } from "vant";

// 引入 qs
import qs from "qs";

export default {
  name: "Order",
  components: { Header },
  data () {
    return {
      paymentMethod: "zfb",
      address: [],
      goodsList: [],
      total: {
        price: 0,
        num: 0,
      },
    };
  },
  mounted () {
    new BetterScroll(this.$refs.main, {
      movable: true,
      zoom: true,
      click: true,
      bounce: true,
    });
  },
  created () {
    this.getAddress();
    this.getOrder();
    this.goodsList = JSON.parse(this.$route.query.goodsList);
  },
  activated () {
    this.$bus.$on("selectAddress", (data) => {
      this.address = JSON.parse(data);
    });
  },
  computed: {
    ...mapState({
      order_id: (state) => state.order.order_id,
      selectList: (state) => state.cart.selectList,
    }),
    ...mapGetters("address", ["defaultAddress"]),
  },
  methods: {
    ...mapMutations({
      INITDATA: "address/INITDATA",
      INITORDER: "order/INITORDER",
    }),
    goDetail (id) {
      this.$router.push({
        name: "Detail",
        query: { id },
      });
    },
    // 查询地址
    getAddress () {
      http
        .$axios({
          url: "/api/selectedAddress",
          method: "POST",
          headers: {
            token: true,
          },
        })
        .then((res) => {
          this.INITDATA(res.data);
          // 有默认收货地址
          if (this.defaultAddress.length) {
            this.address = this.defaultAddress[0];
          } else {
            this.address = res.data[0];
          }
        });
    },
    // 查询订单号
    getOrder () {
      http
        .$axios({
          url: "/api/selectOrder",
          method: "POST",
          header: {
            token: true,
          },
          data: {
            order_id: this.order_id,
          },
        })
        .then((res) => {
          this.INITORDER(res.data);
          this.total = {
            price: res.data[0].goods_price,
            num: res.data[0].goods_num,
          };
        });
    },
    // 选择收货地址
    goAddress () {
      this.$router.push({
        name: "addressIndex",
        query: {
          type: "select",
        },
      });
    },
    // 提交订单
    goPayment () {
      // 判断是否有默认地址
      if (!this.address) return Toast("请填写收货地址");

      // 修改订单状态为待支付，清空购物车商品
      http
        .$axios({
          url: "/api/resetOrder",
          method: "POST",
          headers: {
            token: true,
          },
          data: {
            order_id: this.order_id,
            selectList: this.selectList,
          },
        })
        .then((res) => {
          let newArr = [];
          this.goodsList.forEach((v) => {
            newArr.push(v.goods_name);
          });

          // 支付传递的参数
          let orderData = {
            order_id: this.order_id,
            name: newArr.join(""),
            price: this.total.price,
          };

          if (res.success) {
            // 去支付
            http
              .$axios({
                url: "/api/payment",
                method: "POST",
                headers: {
                  token: true,
                  // 支付订单必须要写
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                // 增加安全性的字符串解析
                data: qs.stringify(orderData),
              })
              .then((res) => {
                if (res.success) {
                  // 打开支付宝的支付页面
                  window.location.href = res.paymentUrl;
                }
              });
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.order {
  & section {
    background-color: #f5f5f5;

    & .order-info {
      font-size: 0.4267rem;

      & h3 {
        padding: 0.2667rem 0.4rem;
        font-size: 0.3733rem;
        font-weight: 400;
      }

      & .order-info-detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.2667rem 0.4rem;
        background-color: #ffffff;

        & .order-info-detail_empty {
          color: #b8b8b8;
          font-size: 0.3733rem;
          margin-left: 1.0667rem;
        }

        & i {
          color: #dddddd;
          font-size: 0.5333rem;
        }
      }
    }

    & .order-payment {
      font-size: 0.3733rem;
      background-color: #ffffff;
      margin-top: 0.2667rem;
      padding: 0.2667rem 0.4rem;

      & .order-payment-method {
        margin-bottom: 0.2667rem;

        & span {
          color: #3b8c2f;
        }
      }
    }

    & .order-goods {
      font-size: 0.3733rem;
      background-color: #ffffff;
      margin-top: 0.2667rem;
      padding: 0.2667rem 0.4rem;

      & li {
        display: flex;
        width: 100%;
        margin: 0.32rem 0;

        & img {
          width: 1.9733rem;
          height: 1.9733rem;
          border: 0.0267rem solid #eeeeee;
        }

        & .order-goods-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-left: 0.4rem;

          & h3 {
            width: 5.3333rem;
            color: #222222;
            font-size: 0.32rem;
            font-weight: 400;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          & .order-goods-content_subtotal {
            display: flex;
            justify-content: space-between;
            align-items: center;

            & span:first-child {
              color: #b0352f;
            }
          }
        }
      }
    }
  }

  & footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 1.2rem;
    border-top: 0.0267rem solid #e7e7e7;

    & .order-total {
      font-size: 0.32rem;
      margin-left: 0.4rem;
      line-height: 1.2rem;

      & span:first-child {
        color: #b0352f;
        font-size: 0.3733rem;
        margin: 0 0.08rem;
      }

      & span:last-child {
        color: #b0352f;
        font-size: 0.48rem;
      }
    }

    & .order-submit {
      width: 3.2rem;
      height: 1.2rem;
      color: #ffffff;
      background-color: #3b8c2f;
      font-size: 0.48rem;
      text-align: center;
      line-height: 1.2rem;
    }
  }
}
</style>