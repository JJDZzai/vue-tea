<template>
  <div class="home-dhp">
    <ul>
      <li
        v-for="(d,index) in dhpList"
        :key="index"
      >
        <img :src="d.imgUrl">
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "Dhp",
  props: {
    dhpList: {
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
.home-dhp {
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