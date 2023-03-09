<template>
  <div class="search-index container">
    <Header />
    <section class="wrapper">
      <div>
        <template v-if="searchList.length">
          <div class="search-index-history">
            <h3>
              <div>
                <i class="iconfont icon-time"></i>
                <span>历史搜索</span>
              </div>
              <div>
                <i
                  class="iconfont icon-qingkongshanchu"
                  @click="handleDelete"
                ></i>
              </div>
            </h3>
            <ul>
              <li
                v-for="(item,index) in searchList"
                :key="index"
                @click="goSearchList(item)"
              >{{item}}</li>
            </ul>
          </div>
        </template>
        <template v-else>
          <div class="no-records">暂无搜索记录</div>
        </template>
        <div class="search-index-like">
          <div class="search-index-like_text">
            <i class="iconfont icon-dianzan"></i>
            <span>猜你喜欢</span>
          </div>
          <div
            v-for="(good,index) in goodList"
            :key="index"
            class="search-index-like_mt"
          >
            <Like
              v-if="good.type == 'likeList'"
              :likeList="good.data"
            />
          </div>
        </div>
      </div>
    </section>
    <Tabbar />
  </div>
</template>

<script>
import Header from "@/components/search/Header";
import Tabbar from "@/components/common/Tabbar";

import Like from "@/components/home/Like";

import http from "@/common/api/request";

// mint ui
import { MessageBox } from "mint-ui";

// 引入 better-scroll
import BetterScroll from "better-scroll";

export default {
  name: "SearchIndex",
  components: {
    Header,
    Tabbar,
    Like,
  },
  data() {
    return {
      searchList: [],
      goodList: [],
    };
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem("keyword")) || [];
    this.getData();
  },
  methods: {
    async getData() {
      let res = await http.$axios({
        url: "/api/index_list/0/data/1",
      });
      this.goodList = res.data;

      this.$nextTick(function () {
        new BetterScroll(".wrapper", {
          click: true,
          movable: true,
          zoom: true,
        });
      });
    },
    handleDelete() {
      MessageBox({
        title: "提示",
        message: "确定要清空历史记录吗？",
        showCancelButton: true,
      }).then((res) => {
        if (res == "confirm") {
          localStorage.removeItem("keyword");
          this.searchList = [];
        }
      });
    },
    goSearchList(key) {
      this.$router.push({
        name: "searchList",
        query: {
          key,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-index {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  & section {
    flex: 1;
    overflow: hidden;
    background-color: #f5f5f5;
  }
  & .search-index-history {
    height: 5.3333rem;
    & h3 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.4267rem;
      font-weight: 400;
      padding: 0.2667rem 0.5333rem;
      & i {
        color: #389746;
        padding-right: 0.1333rem;
        font-size: 0.4267rem;
      }
    }
    & ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 0.2667rem;
      & li {
        height: 0.8rem;
        font-size: 0.3733rem;
        color: #999999;
        border: 0.0267rem solid #dddddd;
        padding: 0 0.16rem;
        margin: 0.2133rem 0.2667rem;
        line-height: 0.8rem;
      }
    }
  }
  & .search-index-like {
    margin-top: 1.6rem;
    & .search-index-like_text {
      font-size: 0.4267rem;
      font-weight: 400;
      margin-left: 0.5333rem;
      & i {
        color: #389746;
        padding-right: 0.1333rem;
        font-size: 0.4267rem;
      }
    }
    & .search-index-like_mt {
      margin-top: 0.8rem;
    }
  }
  & .no-records {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5.3333rem;
    font-size: 0.5333rem;
    color: #cccccc;
  }
}
</style>