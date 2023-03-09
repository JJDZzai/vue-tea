<template>
  <div class="order-header">
    <div @click="$router.back()">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div>
      <span>提交订单</span>
    </div>
    <div @click="$router.push('/home')">
      <i class="iconfont icon-shouye"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.1733rem;
  color: #ffffff;
  background-color: #3b8c2f;
  & .icon-fanhui {
    font-size: 0.5333rem;
    padding-left: 0.2133rem;
  }
  & .icon-shouye {
    font-size: 0.6933rem;
    padding-right: 0.2133rem;
  }
  & span {
    font-size: 16px;
    line-height: 1.1733rem;
  }
}
</style>