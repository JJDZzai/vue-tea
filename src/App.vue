<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.commit("user/USER_INFO");
  },
  methods: {},
};
</script>

<style></style>
