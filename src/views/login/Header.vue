<template>
  <div class="login-header">
    <div @click="$router.back()">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div>
      <slot></slot>
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
.login-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.1733rem;
  color: #ffffff;
  background-color: #3b8c2f;
  & i {
    font-size: 0.6933rem;
    padding: 0 0.2133rem;
  }
  & span {
    font-size: 16px;
    line-height: 1.1733rem;
  }
}
</style>