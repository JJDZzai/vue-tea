<template>
  <div class="master container">
    <header>
      <div class="master-header">
        <div @click="$router.back()">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div>
          <span>茶师亲制</span>
        </div>
        <div @click="handleSearch">
          <i class="iconfont icon-fangdajing"></i>
        </div>
      </div>
      <ly-tab
        v-model="selectedId"
        :items="topBar"
        :options="options"
        @change="changeTab"
      >
      </ly-tab>
    </header>
    <section class="wrapper">
      <div class=".wrapper">
        <div
          v-for="(m,index) in mainData"
          :key="index"
        >
          <Longjing
            v-if="m.type == 'longList'"
            :longList="m.data"
          />
          <Tieguanyin
            v-if="m.type == 'tieList'"
            :tieList="m.data"
          />
        </div>
      </div>
    </section>
    <footer>
      <Tabbar />
    </footer>
  </div>
</template>

<script>
import Longjing from "./master/Longjing";
import Tieguanyin from "./master/Tieguanyin";

import Tabbar from "@/components/common/Tabbar";

import BetterScroll from "better-scroll";

import http from "@/common/api/request";

export default {
  name: "Master",
  components: {
    Longjing,
    Tieguanyin,
    Tabbar,
  },
  data() {
    return {
      selectedId: 0,
      topBar: [],
      options: {
        activeColor: "#389746",
      },
      mainData: [],
      sBetterScroll: "",
      dBetterScroll: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleSearch() {
      this.$router.push({
        name: "searchIndex",
      });
    },
    async getData() {
      let res = await http.$axios({
        url: "/api/find/0/data/1",
      });
      this.topBar = Object.freeze(res.topBar);
      this.mainData = Object.freeze(res.data);

      this.$nextTick(function () {
        this.sBetterScroll = new BetterScroll(".wrapper", {
          click: true,
          movable: true,
          zoom: true,
        });
      });
    },
    async addData(index) {
      let res = await http.$axios({
        url: "/api/find/" + index + "/data/1",
      });
      this.mainData = Object.freeze(res);

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
  },
};
</script>

<style lang="scss" scoped>
.master {
  & section {
    background-color: #f5f5f5;
  }
  & .master-header {
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
      font-size: 16px;
      line-height: 1.1733rem;
    }
  }
}

::v-deep .ly-tabbar {
  border-bottom: 0;
  //   box-shadow: none;
}

::v-deep .ly-tab-active-bar {
  margin-bottom: -3px;
}
</style>