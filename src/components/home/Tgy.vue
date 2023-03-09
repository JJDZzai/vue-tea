<template>
  <div class="home-tgy">
    <ul>
      <li
        v-for="(t,index) in tgyList"
        :key="index"
      >
        <img :src="t.imgUrl">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Dhp",
  props: {
    tgyList: {
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
.home-tgy {
  & ul {
    border-bottom: 1px solid #f0ebeb;
  }
  & ul li {
    margin-bottom: -7px;
  }
  width: 100%;
  & img {
    width: 100%;
    height: 100%;
  }
}
</style>