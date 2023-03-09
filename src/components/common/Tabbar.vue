<template>
  <div class="tabbar">
    <ul>
      <li
        v-for="(item,index) in routeList"
        :key="index"
        @click="switchTab(item.path)"
      >
        <!-- <img :src="$route.path.includes(item.path) ? item.selected : item.active"> -->
        <i
          :class="$route.path.includes(item.path) ? item.active : item.active"
          :style="$route.path.includes(item.path) ? 'color:#389746' : ''"
        ></i>
        <span :class="$route.path.includes(item.path) ? 'active' : ''">{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {
      routeList: [
        {
          title: "首页",
          path: "/home",
          // active: "/images/home.png",
          // selected: "/images/home-select.png",
          active: "iconfont icon-home",
        },
        {
          title: "分类",
          path: "/list",
          // active: "/images/list.png",
          // selected: "/images/list-select.png",
          active: "iconfont icon-fenlei",
        },
        {
          title: "发现",
          path: "/master",
          // active: "/images/list.png",
          // selected: "/images/list-select.png",
          active: "iconfont icon-zhaodaofind2",
        },
        {
          title: "购物车",
          path: "/cart",
          // active: "/images/cart.png",
          // selected: "/images/cart-select.png",
          active: "iconfont icon-gouwuche",
        },
        {
          title: "我的",
          path: "/my",
          // active: "/images/my.png",
          // selected: "/images/my-select.png",
          active: "iconfont icon-wode",
        },
      ],
    };
  },
  methods: {
    switchTab(path) {
      // 判断点击的是否是同一个路由 (如果是同一个路由就return掉，不产生报错)
      if (this.$route.path == path) return;
      this.$router.replace(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabbar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1.44rem;
  background-color: #fff;
  border-top: 0.0267rem solid #efefef;
  & > ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    & > li {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #666666;
      & > i {
        font-size: 26px;
      }
      & > span {
        font-size: 0.32rem;
        text-align: center;
      }
    }
  }
}

// 动态判断路由跳转时的文字变换
.active {
  color: #389746;
}
</style>