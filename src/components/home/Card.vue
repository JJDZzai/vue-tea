<template>
  <div class="home-card">
    <div class="home-card-title">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.home-card {
  .home-card-title {
    padding: 0.2667rem 0;
    font-size: 0.48rem;
    color: #333333;
    text-align: center;
    & > span {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: block;
        background: #d4c0a7;
        top: 50%;
        margin-top: -3px;
        left: -0.5rem;
      }
      &::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: block;
        background: #d4c0a7;
        top: 50%;
        margin-top: -3px;
        right: -0.5rem;
      }
    }
  }
}
</style>