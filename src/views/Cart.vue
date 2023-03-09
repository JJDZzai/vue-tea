<template>
  <div class="cart container">
    <header class="cart-header">
      <div @click="handleBack">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div>
        <span>购物车</span>
      </div>
      <div @click="handleEdit">
        <span v-text="isEdit ? '完成' : '编辑'"></span>
      </div>
    </header>
    <section ref="wrapper">
      <div>
        <div
          class="cart-goods-title"
          v-if="list.length"
        >
          <van-checkbox
            :value="isCheckedAll"
            checked-color="#3b8c2f"
            icon-size=".48rem"
            @click="checkAllFn"
          ></van-checkbox>
          <span>商品</span>
        </div>
        <ul v-if="list.length">
          <li
            v-for="(lis,index) in list"
            :key="index"
            @click="goDetail(lis.id)"
          >
            <div>
              <van-checkbox
                v-model="lis.checked"
                checked-color="#3b8c2f"
                icon-size=".48rem"
                @click="SINGLECHECK(index)"
              ></van-checkbox>
            </div>
            <h2>
              <img
                :src="lis.goods_imgUrl"
                width="74"
                height="74"
              >
            </h2>
            <div class="cart-goods-desc">
              <div class="cart-goods-desc_title">
                <span>{{lis.goods_name}}</span>
                <i
                  class="iconfont icon-qingkongshanchu"
                  @click="deleteGoods(lis.id)"
                ></i>
              </div>
              <div class="cart-goods-desc_price">￥{{lis.goods_price}}</div>
              <van-stepper
                v-model="lis.goods_num"
                integer
                @change="changeNum($event,lis)"
              />
            </div>
          </li>
        </ul>
        <div
          class="cart-empty"
          v-if="!list.length"
        >
          <img
            src="@/assets/images/logo-f.png"
            width="100"
          >
          <h3>购物车还是空的，快来挑选好货吧</h3>
          <div @click="$router.push('/home')">去逛逛</div>
        </div>
        <div v-if="!list.length">
          <div
            v-for="(good,index) in goodList"
            :key="index"
            class="cart-like-mt"
          >
            <Like
              v-if="good.type == 'likeList'"
              :likeList="good.data"
            />
          </div>
        </div>
      </div>
    </section>
    <footer>
      <div class="cart-checked">
        <van-checkbox
          :value="isCheckedAll"
          checked-color="#3b8c2f"
          icon-size=".48rem"
          v-show="!isEdit"
          @click="checkAllFn"
        ></van-checkbox>
      </div>
      <div
        class="total-goods"
        v-show="!isEdit"
      >
        <div>
          共有 <span class="total-goods-subtotal">{{total.num}}</span> 件商品
        </div>
        <div>
          <span>总计：</span>
          <span class="total-goods-subtotal">￥{{total.price.toFixed(2)}} </span>
          <span>+ </span>
          <span class="total-goods-subtotal">0茶币</span>
        </div>
      </div>
      <div
        class="cart-settlement"
        v-if="isEdit"
        :style="{backgroundColor:(selectList.length > 0 ? '#3b8c2f' : '#ccc')}"
        @click="deleteGoods"
      >删除</div>
      <div
        class="cart-settlement"
        v-else
        :style="{backgroundColor:(selectList.length > 0 ? '#3b8c2f' : '#ccc')}"
        @click="goOrder"
      >去结算</div>
    </footer>
  </div>
</template>

<script>
import "vant/lib/index.css";

import http from "@/common/api/request";

import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

import Like from "../components/home/Like";

// 引入 better-scroll
import BetterScroll from "better-scroll";

import { Toast } from "vant";

export default {
  name: "Cart",
  components: { Like },
  data() {
    return {
      goodList: [],
      checked: true,
      isEdit: false,
    };
  },
  created() {
    this.getData();
    this.getList();
  },
  computed: {
    ...mapState("cart", ["list", "selectList"]),
    ...mapGetters("cart", ["isCheckedAll", "total"]),
    goodsList() {
      return this.selectList.map((id) => {
        return this.list.find((v) => v.id == id);
      });
    },
  },
  methods: {
    ...mapActions("cart", ["checkAllFn", "deleteGoods"]),
    ...mapMutations({
      CARTLIST: "cart/CARTLIST",
      SINGLECHECK: "cart/SINGLECHECK",
      INITORDER: "order/INITORDER",
    }),
    goDetail(id) {
      this.$router.push({
        name: "Detail",
        query: { id },
      });
    },
    getData() {
      http
        .$axios({
          url: "/api/selectedCart",
          method: "POST",
          headers: {
            token: true,
          },
        })
        .then((res) => {
          res.data.forEach((v) => {
            v["checked"] = true;
          });

          this.CARTLIST(res.data);
        });
    },
    async getList() {
      let res = await http.$axios({
        url: "/api/index_list/0/data/1",
      });
      this.goodList = res.data;

      this.$nextTick(function () {
        new BetterScroll(this.$refs.wrapper, {
          click: true,
          movable: true,
          zoom: true,
          bounce: false,
        });
      });
    },
    handleBack() {
      this.$router.push({
        name: "Home",
      });
    },
    // 编辑/完成
    handleEdit() {
      this.isEdit = !this.isEdit;
    },
    // 修改商品数量
    changeNum(value, lis) {
      // 修改后的数量以及当前购物车商品的id，传递给后端
      http
        .$axios({
          url: "/api/updateCart",
          method: "POST",
          headers: {
            token: true,
          },
          data: {
            num: value,
            id: lis.id,
          },
        })
        .then((res) => {});
    },
    // 结算
    goOrder() {
      if (!this.selectList.length) {
        return Toast("至少选择一件商品");
      }

      let newList = [];
      this.list.forEach((item) => {
        this.selectList.filter((v) => {
          if (v == item.id) {
            newList.push(item);
          }
        });
      });

      // 生成一个订单
      http
        .$axios({
          url: "/api/addOrder",
          method: "POST",
          headers: {
            token: true,
          },
          data: {
            newList,
          },
        })
        .then((res) => {
          if (!res.success) return;
          this.INITORDER(res.data);
          // 进入提交订单页;
          this.$router.push({
            name: "Order",
            query: {
              goodsList: JSON.stringify(this.goodsList),
            },
          });
        });
    },
  },
};
</script>


<style lang="scss" scoped>
.cart {
  & .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.1733rem;
    color: #ffffff;
    background-color: #3b8c2f;
    & i {
      font-size: 0.64rem;
      padding: 0 0.2133rem;
    }
    & span {
      font-size: 0.4267rem;
      line-height: 1.1733rem;
    }
    & div:nth-child(3) span {
      font-size: 0.3733rem;
      padding-right: 0.2667rem;
    }
  }
  & section {
    background-color: #f5f5f5;
    & .cart-goods-title {
      display: flex;
      padding: 0.5333rem 0.2667rem;
      border-bottom: 0.0267rem solid #e8e8e8;
      & span {
        color: #333333;
        font-size: 0.4267rem;
        padding: 0 0.4rem;
        font-weight: 700;
      }
    }
    & ul {
      & li {
        display: flex;
        align-items: center;
        background-color: #ffffff;
        margin-bottom: 0.0533rem;
        padding: 0 0.2667rem;
        & h2 {
          padding: 0.2667rem;
          & img {
            border: 0.0267rem solid #eeeeee;
            vertical-align: middle;
          }
        }
        & .cart-goods-desc {
          width: 100%;
          & .cart-goods-desc_title {
            display: flex;
            justify-content: space-between;
            height: 0.8533rem;
            color: #222222;
            font-size: 0.32rem;
            & span {
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
          }
          & .cart-goods-desc_price {
            color: #b0352f;
            font-size: 0.3733rem;
          }
          & ::v-deep .van-stepper {
            text-align: right;
          }
        }
      }
    }
    & .cart-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1.6rem;
      & h3 {
        color: #666666;
        font-size: 0.3733rem;
        font-weight: 400;
        margin-top: 0.5333rem;
      }
      & div {
        color: #666666;
        font-size: 0.32rem;
        margin-top: 0.4rem;
        padding: 0.1333rem 0.2667rem;
        background-color: #ffffff;
        border: 1px solid #d6d6d7;
        border-radius: 0.16rem;
      }
    }
    & .cart-like-mt {
      margin-top: 1.6rem;
    }
  }
  & footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.2rem;
    box-shadow: 0 0 0.08rem #d7d7d7;
    & .cart-checked {
      width: 1.0667rem;
      display: flex;
      justify-content: center;
    }
    & .total-goods {
      flex: 1;
      font-size: 0.32rem;
      line-height: 0.48rem;
      & .total-goods-subtotal {
        color: #b0352f;
        font-size: 0.3733rem;
      }
    }
    & .cart-settlement {
      width: 3.2rem;
      height: 1.2rem;
      color: #ffffff;
      font-size: 0.48rem;
      text-align: center;
      line-height: 1.2rem;
      background-color: #3b8c2f;
    }
  }
}
</style>
