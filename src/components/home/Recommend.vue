<template>
  <div class="home-recommend">
    <Card>
      <span>火爆推荐</span>
    </Card>
    <ul>
      <li
        v-for="(item,index) in recommendList"
        :key="index"
        @click="goDetail(item.id)"
      >
        <h2>
          <img :src="item.imgUrl">
        </h2>
        <div class="main">
          <h3>{{item.name}}</h3>
          <p>{{item.content}}</p>
          <div class="price">
            <span>￥ </span>
            <b>{{item.price}}</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Card from "./Card";

export default {
  name: "Recommend",
  components: { Card },
  props: {
    recommendList: {
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
.home-recommend {
  background-color: #ffffff;
  margin-top: 10px;
  ul li {
    position: relative;
    h2 {
      text-align: center;
      img {
        width: 9.6rem;
        height: 3.84rem;
        border-radius: 0.32rem;
      }
    }
    .main {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      position: absolute;
      top: 0;
      right: 0;
      padding: 30px;
      padding-right: 20px;
      h3 {
        font-size: 0.34rem;
        color: #666666;
        font-weight: 400;
      }
      p {
        font-size: 0.4267rem;
        color: #333333;
      }
      .price {
        margin-top: 0.5333rem;
        color: #b0352f;
        span {
          font-size: 0.34rem;
        }
        b {
          font-size: 0.48rem;
        }
      }
    }
  }
}
</style>