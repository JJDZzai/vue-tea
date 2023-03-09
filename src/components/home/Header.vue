<template>
  <div class="home-header">
    <h1>
      <img src="@/assets/images/logo.png">
    </h1>
    <div
      class="home-header-search"
      @click="handleSearch"
    >
      <i class="iconfont icon-fangdajing"></i>
      <span>搜您喜欢的...</span>
    </div>
    <div class="home-header-kefu">
      <i class="iconfont icon-kefu"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    handleSearch() {
      this.$router.push({
        name: "searchIndex",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.home-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  color: #ffffff;
  background-color: #389746;
  & h1 {
    width: 2.1333rem;
    height: 1.3333rem;
    padding: 0 0.2667rem;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
  & .home-header-search {
    display: flex;
    align-items: center;
    width: 6.56rem;
    height: 0.8rem;
    background-color: #ffffff;
    border-radius: 0.32rem;
    & > i {
      padding: 0 0.16rem;
      color: #ccc;
    }
    & > span {
      margin-top: -0.0533rem;
      font-size: 0.3733rem;
      color: #aaa;
    }
  }
  & .home-header-kefu {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.0667rem;
    & > i {
      font-size: 0.64rem;
    }
  }
}
</style>