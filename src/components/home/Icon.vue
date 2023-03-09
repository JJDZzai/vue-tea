<template>
  <div class="home-icon">
    <ul>
      <li
        v-for="(item,index) in iconList"
        :key="index"
      >
        <img :src="item.imgUrl">
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Icon",
  props: {
    iconList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.home-icon {
  background-color: #ffffff;
  padding: 0.4rem 0;
  & ul {
    display: flex;
    justify-content: space-around;
    & li {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      & img {
        width: 1.0133rem;
        height: 1.0133rem;
      }
      & span {
        padding-top: 0.2667rem;
        font-size: 0.4rem;
      }
    }
  }
}
</style>