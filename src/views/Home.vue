<template>
  <div class="home container">
    <div class="headers">
      <div class="headers-top">
        <!-- 页头 -->
        <Header />
        <!-- 导航栏 -->
        <ly-tab
          v-model="selectedId"
          :items="topBar"
          :options="options"
          @change="changeTab"
        >
        </ly-tab>
      </div>
    </div>
    <!-- 主体 -->
    <section class="wrapper">
      <!-- better-scroll 实现滚动必须有一个父级元素包含组件，并且这个父级元素要大于它外面父元素的高度要高（子元素要比父元素高）才能滚动起来 -->
      <div>
        <div
          v-for="(m,index) in mainData"
          :key="index"
        >
          <Swiper
            v-if="m.type == 'swiperList'"
            :swiperList="m.data"
          />
          <Icon
            v-if="m.type == 'iconList'"
            :iconList="m.data"
          />
          <Recommend
            v-if="m.type == 'recommendList'"
            :recommendList="m.data"
          />
          <Like
            v-if="m.type == 'likeList'"
            :likeList="m.data"
          />
          <Dhp
            v-if="m.type == 'dhpList'"
            :dhpList="m.data"
          />
          <Tgy
            v-if="m.type == 'tgyList'"
            :tgyList="m.data"
          />
        </div>
        <div
          class="section-footer"
          v-if="selectedId == 0"
          @click="handleSetOut"
        >
          <img src="../assets/images/logo-f.png">
        </div>
      </div>
    </section>
    <Tabbar />
  </div>
</template>

<script>
import Header from "@/components/home/Header";
import Swiper from "@/components/home/Swiper";
import Icon from "@/components/home/Icon";
import Recommend from "@/components/home/Recommend";
import Like from "@/components/home/Like";
import Dhp from "@/components/home/Dhp";
import Tgy from "@/components/home/Tgy";
import Tabbar from "@/components/common/Tabbar";

// 引入 better-scroll
import BetterScroll from "better-scroll";

import http from "@/common/api/request";

export default {
  name: "Home",
  components: {
    Header,
    Swiper,
    Icon,
    Recommend,
    Like,
    Dhp,
    Tgy,
    Tabbar,
  },
  data() {
    return {
      selectedId: 0,
      topBar: [],
      mainData: [],
      options: {
        activeColor: "#389746",
        // 可在这里指定labelKey，数据里文字对应的字段
      },
      sBetterScroll: "",
      dBetterScroll: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await http.$axios({
        url: "/api/index_list/0/data/1",
      });
      this.topBar = Object.freeze(res.topBar);
      this.mainData = Object.freeze(res.data);

      this.$nextTick(function () {
        // 挂载之后有节点并渲染页面（可使用better-scroll插件），created创建之后没有节点
        // ..wrapper --> this.$refs.wrapper
        this.sBetterScroll = new BetterScroll(".wrapper", {
          click: true,
          movable: true,
          zoom: true,
        });
      });
    },
    async addData(index) {
      let res = await http.$axios({
        url: "/api/index_list/" + index + "/data/1",
      });
      if (res.constructor != Array) {
        this.mainData = res.data;
      } else {
        this.mainData = res;
      }

      this.$nextTick(function () {
        this.dBetterScroll = new BetterScroll(".wrapper", {
          click: true,
          movable: true,
          zoom: true,
        });
      });
    },
    changeTab(item, index) {
      this.addData(index);
    },
    handleSetOut() {
      this.$router.push({
        name: "My",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .headers {
    height: 2.5867rem;
    .headers-top {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
  section {
    background-color: #f5f5f5;
    & .section-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 2.6667rem;
      & img {
        width: 3.4667rem;
        height: 1.7333rem;
      }
    }
  }
}
::v-deep .ly-tabbar {
  border-bottom: 0;
  box-shadow: none;
}

::v-deep .ly-tab-active-bar {
  margin-bottom: -3px;
}
</style>
