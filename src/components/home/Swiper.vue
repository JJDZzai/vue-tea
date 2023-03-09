<template>
  <div class="home-swiper">
    <swiper :options="swiperOption">
      <swiper-slide
        v-for="(item,index) in swiperList"
        :key="index"
      >
        <img :src="item.imgUrl">
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "Swiper",
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    swiperList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      swiperOption: {
        //swiper3
        // 自动播放
        autoplay: true,
        // 手动滑动后不再轮播处理
        on: {
          slideChangeTransitionEnd: function () {
            this.autoplay.start();
          },
        },
        // 循环播放
        loop: true,
        // 速度曲线
        speed: 500,
        // 轮播按钮
        pagination: {
          el: ".swiper-pagination", // 绑定样式
          clickable: true, // 可点击按钮切换
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.home-swiper {
  position: relative;
  width: 100%;
  height: 4.4rem;
}
.swiper-container {
  width: 100%;
  height: 4.4rem;
  & img {
    width: 100%;
    height: 4.4rem;
  }
}
.swiper-pagination {
  width: 100%;
  bottom: 0px;
}
::v-deep .swiper-pagination-bullet-active {
  background-color: #389746;
}
::v-deep .swiper-pagination-bullet {
  margin: 0 5px;
}
</style>