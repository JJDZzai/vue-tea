<template>
  <div class="tieguanyin">
    <ul>
      <li
        v-for="(item,index) in tieList"
        :key="index"
        @click="goDetail(item.id)"
      >
        <h2>
          <img v-lazy="item.imgurl">
        </h2>
        <h3>{{item.name}}</h3>
        <div class="price">
          <span>￥</span>
          <b>{{item.price}}</b>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tieguanyin",
  props: {
    tieList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        name: "Detail",
        query: { id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tieguanyin {
  background-color: #ffffff;
  & ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0.1rem;
    & li {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
      margin-bottom: 15px;
      & h2 img {
        width: 4.6933rem;
        height: 4.6933rem;
      }
      & h3 {
        width: 96%;
        font-size: 0.3733rem;
        font-weight: 400;
        line-height: 0.4rem;
        color: #222222;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      & .price {
        width: 100%;
        text-align: left;
        color: #b0352f;
        & span {
          font-size: 0.34rem;
        }
        & b {
          font-size: 0.5rem;
          font-weight: normal;
        }
      }
    }
  }
}

.tieguanyin img[lazy="loading"] {
  background-color: #f7f7f7;
}
</style>