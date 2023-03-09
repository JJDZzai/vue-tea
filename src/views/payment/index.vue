<template>
  <div class="payment">
    <div
      class="payment-content"
      v-if="paymentStatus"
      @click="$router.push('/home')"
    >
      <i class="iconfont icon-zhifuchenggong success"></i>
      <p>支付成功</p>
      <div class="success-back">返回首页</div>
    </div>
    <div
      class="payment-content"
      v-else
    >
      <i class="iconfont icon-zhifushibai fail"></i>
      <p>支付失败</p>
      <div class="fail-back">返回首页</div>
    </div>
  </div>
</template>

<script>
import http from "@/common/api/request";

import qs from "qs";

export default {
  name: "Payment",
  data() {
    return {
      paymentStatus: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let datas = {
        out_trade_no: this.$route.query.out_trade_no, // 订单号
        trade_no: this.$route.query.trade_no, // 支付宝交易号，支付宝流水号
      };

      http
        .$axios({
          url: "/api/paymentStatus",
          method: "POST",
          headers: {
            token: true,
          },
          data: qs.stringify(datas),
        })
        .then((res) => {
          console.log(res);
          if (res.code == 2) {
            this.paymentStatus = true;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.payment {
  & .payment-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2.6667rem;
    & i {
      font-size: 2.1333rem;
    }
    & .success {
      color: #16aa68;
    }
    & .fail {
      color: #b0352f;
    }
    & p {
      font-size: 0.4267rem;
      margin-top: 0.5333rem;
    }
    & div {
      width: 5.3333rem;
      height: 1.0667rem;
      color: #ffffff;
      font-size: 0.48rem;
      text-align: center;
      line-height: 1.0667rem;
      padding: 0.08rem;
      margin-top: 0.8rem;
      border-radius: 0.0533rem;
    }
    & .success-back {
      background-color: #16aa68;
    }
    & .fail-back {
      background-color: #68c3aa;
    }
  }
}
</style>