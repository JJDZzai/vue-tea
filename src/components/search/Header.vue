<template>
  <div class="search-header">
    <div
      class="search-header-return"
      @click="$router.back()"
    >
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div class="search-header-main">
      <i class="iconfont icon-fangdajing"></i>
      <form
        action=""
        onsubmit="return false"
        @keyup.enter="goSearchList"
      >
        <input
          type="text"
          placeholder="搜索您喜欢的产品..."
          v-model.trim="form.keyword"
          autofocus
          ref="myInput"
        >
      </form>
    </div>
    <div
      class="search-header-btn"
      @click="goSearchList"
    >搜索</div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      form: {
        keyword: this.$route.query.key,
        keywordArr: [],
      },
    };
  },
  mounted() {
    // 键盘监听事件
    window.addEventListener("touchmove", this.myTouchMove, true);
  },
  methods: {
    // 失去焦点
    myTouchMove() {
      this.$refs.myInput.blur();
    },
    goSearchList() {
      //  如果搜索的关键字没有，直接return
      if (!this.form.keyword) {
        return Toast("输入不能为空");
      }

      // 判断之前有没有搜索过的关键字
      if (!localStorage.getItem("keyword")) {
        // 如果没有搜索过则追加
        localStorage.setItem("keyword", "[]");
      } else {
        // 如果有搜索过则展示
        this.form.keywordArr = JSON.parse(localStorage.getItem("keyword"));
      }

      // 添加数据
      this.form.keywordArr.unshift(this.form.keyword);

      let newArr = new Set(this.form.keywordArr);

      localStorage.setItem("keyword", JSON.stringify(Array.from(newArr)));

      // 如果搜索的值和当前的值一致, 直接return掉
      if (this.form.keyword === this.$route.query.key) return;
      this.$router.push({
        name: "searchList",
        query: {
          key: this.form.keyword,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.1733rem;
  color: #ffffff;
  background-color: #389746;
  & .search-header-return {
    padding: 0 0.2667rem;
    & i {
      font-size: 100%;
    }
  }
  & .search-header-main {
    display: flex;
    align-items: center;
    width: 7.6533rem;
    height: 0.8rem;
    background-color: #ffffff;
    border-radius: 0.8rem;
    & i {
      color: #aaa;
      font-size: 0.5333rem;
      padding: 0 0.0533rem 0 0.2133rem;
    }
    & form {
      display: flex;
      width: 100%;
      & input {
        width: 100%;
        color: #000;
        font-size: 0.3733rem;
      }
    }
  }
  & .search-header-btn {
    font-size: 0.4267rem;
    padding: 0 0.16rem;
  }
}
</style>