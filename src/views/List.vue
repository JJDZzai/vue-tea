<template>
  <div class="list container">
    <header
      class="list-header"
      v-show="isShow"
    >
      <div
        class="list-search-return"
        @click="$router.push('/home')"
      >
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div
        class="list-header-search"
        @click="handleSearch"
      >
        <i class="iconfont icon-fangdajing"></i>
        <span>搜您喜欢的...</span>
      </div>
      <div
        class="list-header-kefu"
        @click="$router.push('/home')"
      >
        <i class="iconfont icon-shouye"></i>
      </div>
    </header>

    <section>
      <div class="list-aside">
        <ul class="list-aside-l">
          <li
            v-for="(left,index) in leftData"
            :key="index"
            :class="{active:index === currenIndex}"
            @click="goScroll(index)"
          >{{left.name}}</li>
        </ul>
      </div>
      <div
        class="list-main"
        ref="right"
      >
        <div>
          <div class="list-main-poster">
            <img src="/images/list-banner.jpeg">
          </div>
          <ul
            v-for="(right,index) in rightData"
            :key="index"
            class="list-main-height"
          >
            <li
              class="list-main-good"
              v-for="(r,index) in right"
              :key="index"
            >
              <div class="list-main-good_desc">
                <h3>{{r.name}}</h3>
                <ul>
                  <li
                    v-for="(l,index) in r.list"
                    :key="index"
                  >
                    <img :src="l.imgUrl">
                    <span>{{l.name}}</span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "@/components/common/Tabbar";

import http from "@/common/api/request";

// 引入 better-scroll
import BetterScroll from "better-scroll";

export default {
  name: "List",
  components: {
    Tabbar,
  },
  data() {
    return {
      leftData: [],
      rightData: [],
      // 承载右侧每一块的高度值
      allHeight: [],
      // better-scroll
      rightBetterScroll: "",
      // 右侧滑动的距离值
      rightScrollY: "",
      isShow: true,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    currenIndex() {
      return this.allHeight.findIndex((item, index) => {
        return (
          this.rightScrollY >= item &&
          this.rightScrollY < this.allHeight[index + 1]
        );
      });
    },
  },
  methods: {
    async getData() {
      let res = await http.$axios({
        url: "/api/list/getList",
      });

      let leftArr = [];
      let rightArr = [];

      res.forEach((v) => {
        leftArr.push({
          id: v.id,
          name: v.name,
        });
        rightArr.push(v.data);
      });
      this.leftData = leftArr;
      this.rightData = rightArr;

      this.$nextTick(function () {
        // 右侧
        this.rightBetterScroll = new BetterScroll(this.$refs.right, {
          probeType: 3,
          movable: true,
          zoom: true,
          bounce: false,
        });
        // 统计右侧所有板块的高度值、并放入数组中
        let height = 0;
        this.allHeight.push(height);
        // 获取右侧每一块高度
        let ul = this.$refs.right.querySelectorAll(".list-main-height");
        // 把DOM对象转换成真数组
        let uls = Array.from(ul);
        uls.forEach((u) => {
          height += u.clientHeight;
          this.allHeight.push(height);
        });

        // 获取右侧滑动距离值
        this.rightBetterScroll.on("scroll", (pop) => {
          this.rightScrollY = Math.abs(pop.y);

          Math.abs(pop.y) >= 50 ? (this.isShow = false) : (this.isShow = true);
        });
      });
    },
    goScroll(index) {
      this.rightBetterScroll.scrollTo(0, -this.allHeight[index], 300);
    },
    handleSearch() {
      this.$router.push({
        name: "searchIndex",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  & .list-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 1.1733rem;
    color: #ffffff;
    background-color: #389746;
    & .list-search-return {
      padding: 0 0.2667rem;
      & i {
        font-size: 100%;
      }
    }
    & h1 {
      width: 2.1333rem;
      height: 1.3333rem;
      padding: 0 0.2667rem;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    & .list-header-search {
      display: flex;
      align-items: center;
      width: 7.6267rem;
      height: 0.8rem;
      background-color: #ffffff;
      border-radius: 0.5333rem;
      & > i {
        color: #aaa;
        font-size: 0.5333rem;
        padding: 0 0.0533rem 0 0.2133rem;
      }
      & > span {
        margin-top: -0.0533rem;
        font-size: 0.3733rem;
        color: #757575;
      }
    }
    & .list-header-kefu {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.0667rem;
      height: 1.0667rem;
      & > i {
        font-size: 0.6933rem;
      }
    }
  }
  & section {
    display: flex;
    & .list-aside {
      width: 2.48rem;
      background-color: #ffffff;
      overflow: hidden;
      border-right: 0.0267rem solid #efefef;
      & .list-aside-l {
        display: flex;
        flex-direction: column;
        align-items: center;
        & li {
          width: 100%;
          padding: 3px 0;
          margin: 8px 0;
          font-size: 0.3733rem;
          text-align: center;
        }
      }
    }
    & .list-main {
      flex: 1;
      & .list-main-poster {
        display: flex;
        padding: 0.2667rem;
        & img {
          width: 100%;
        }
      }
      & .list-main-good {
        text-align: center;
        margin-bottom: 1.2rem;
        & .list-main-good_desc {
          margin-top: 0.32rem;
          & h3 {
            position: relative;
            color: #333333;
            font-size: 0.48rem;
            font-weight: 400;
            &::before {
              position: absolute;
              content: "";
              top: 0;
              left: 2.5333rem;
              bottom: 0;
              margin: auto;
              height: 1px;
              width: 0.53333rem;
              background-color: #d9d9d9;
            }
            &::after {
              position: absolute;
              content: "";
              top: 0;
              right: 2.5333rem;
              bottom: 0;
              margin: auto;
              height: 1px;
              width: 0.53333rem;
              background-color: #d9d9d9;
            }
          }
          & ul {
            display: flex;
            flex-wrap: wrap;
            margin-top: 0.2667rem;
            & li {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 33.33%;
              margin: 0.2667rem 0;
              & img {
                width: 1.4133rem;
                height: 1.4133rem;
              }
              & span {
                color: #222222;
                font-size: 0.32rem;
              }
            }
          }
        }
      }
    }
  }
}

// 动态生成侧边栏细线
.active {
  height: 25px;
  color: #389746;
  border-left: 0.16rem solid #389746;
}
</style>
