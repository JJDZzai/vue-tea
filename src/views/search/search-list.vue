<template>
  <div class="search-list container">
    <div class="search-list-header">
      <Header />
      <ul v-if="goodList.length">
        <li
          v-for="(item,index) in sortList.data"
          :key="index"
          @click="handleHighlight(index)"
        >
          <div :class="sortList.currentIndex == index ? 'active' : ''">{{item.name}}</div>
          <div
            class="search-list-header_filter"
            v-if="index != 0"
          >
            <i
              class="iconfont icon-shangjiantou"
              :class="item.status == 1 ? 'active' : ''"
            ></i>
            <i
              class="iconfont icon-xiajiantou"
              :class="item.status == 2 ? 'active' : ''"
            ></i>
          </div>
        </li>
      </ul>
    </div>

    <section class="wrapper">
      <template v-if="goodList.length">
        <ul>
          <li
            v-for="(good,index) in goodList"
            :key="index"
          >
            <img v-lazy="good.imgUrl">
            <h3>{{good.name}}</h3>
            <div class="price">
              <div>
                <span>￥</span>
                <span>{{good.price}}</span>
              </div>
              <div>立即购买</div>
            </div>
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="no-goods">没有找到相关商品</div>
      </template>
    </section>
    <Tabbar />
  </div>
</template>

<script>
import Header from "@/components/search/Header";
import Tabbar from "@/components/common/Tabbar";

import http from "@/common/api/request";

// 引入 better-scroll
import BetterScroll from "better-scroll";

export default {
  name: "SearchList",
  components: {
    Header,
    Tabbar,
  },
  data() {
    return {
      goodList: [],
      sortList: {
        currentIndex: 0,
        /* 
          status: 0  不高亮
          status: 1  上箭头高亮
          status: 2  下箭头高亮
        */
        data: [
          { name: "综合", key: "zh" },
          { name: "销量", status: 0, key: "num" },
          { name: "价格", status: 0, key: "price" },
        ],
      },
    };
  },
  created() {
    this.getData();
  },
  computed: {
    order() {
      let obj = this.sortList.data[this.sortList.currentIndex];
      let val = obj.status == 1 ? "asc" : "desc";
      return {
        [obj.key]: val,
      };
    },
  },
  methods: {
    getData() {
      http
        .$axios({
          url: "/api/goods/storeList",
          params: {
            searchName: this.$route.query.key,
            ...this.order,
          },
        })
        .then((res) => {
          this.goodList = res;

          this.$nextTick(function () {
            // 挂载之后有节点并渲染页面（可使用better-scroll插件），created创建之后没有节点
            // ..wrapper --> this.$refs.wrapper
            this.sBetterScroll = new BetterScroll(".wrapper", {
              movable: true,
              zoom: true,
            });
          });
        });
    },
    handleHighlight(index) {
      this.sortList.currentIndex = index;
      // 点击的下标对应的数据是哪一个
      let item = this.sortList.data[index];

      // 先干掉所有，取消所有的状态值
      this.sortList.data.forEach((v, i) => {
        if (i != index) {
          v.status = 0;
        }
      });

      // 留下自己，当前点击改变状态
      if (index == this.sortList.currentIndex) {
        item.status = item.status == 1 ? 2 : 1;
      }

      // 发送请求给后端进行排序
      this.getData();
    },
  },
  watch: {
    $route() {
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.search-list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  & .search-list-header ul {
    display: flex;
    justify-content: space-around;
    padding: 0.1333rem 0;
    font-size: 0.3733rem;
    & li {
      display: flex;
      align-items: center;
      & div {
        padding: 0 0.0267rem;
      }
      & .search-list-header_filter {
        display: flex;
        flex-direction: column;
        & i {
          font-size: 12px;
          line-height: 8px;
        }
        & i:first-child {
          padding-top: 5px;
        }
        & i:last-child {
          padding-bottom: 3px;
        }
      }
    }
  }
  section {
    flex: 1;
    overflow: hidden;
    background-color: #f5f5f5;
    & ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      & li {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        padding: 0.2667rem;
        box-sizing: border-box;
        & img {
          width: 4.5333rem;
          height: 4.5333rem;
        }
        & h3 {
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #333;
          font-size: 0.3733rem;
          font-weight: 400;
          padding: 0.1067rem 0;
          padding-bottom: 0.2667rem;
        }
        & .price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          font-size: 0.3733rem;
          & div:first-child {
            color: #b0352f;
          }
          & div:last-child {
            height: 20px;
            color: #ffffff;
            background-color: #b0352f;
            border-radius: 0.1067rem;
            padding: 0.08rem 0.16rem;
          }
        }
      }
    }
    .no-goods {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 5.3333rem;
      font-size: 0.5333rem;
      color: #cccccc;
    }
  }
}

// 动态高亮
.active {
  color: #389746;
}

.search-list section img[lazy="loading"] {
  background-color: #f7f7f7;
}
</style>