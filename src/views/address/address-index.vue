<template>
  <div class="address-index container">
    <header>
      <Header>
        <span>我的地址</span>
      </Header>
    </header>
    <section>
      <ul v-if="list.length">
        <li
          v-for="(lis,index) in list"
          :key="index"
          @click="goList(lis)"
        >
          <div class="address-detail-info">
            <div>
              <span>{{lis.name}}</span>
              &nbsp; &nbsp;<span>{{lis.tel}}</span>
            </div>
            <div>
              <span
                class="active"
                v-if="lis.isDefault == 1"
              >[默认] </span>
              <span>{{lis.province}} </span>
              <span>{{lis.city}} </span>
              <span>{{lis.county}} </span>
              <span>{{lis.addressDetail}} </span>
            </div>
          </div>
          <div class="arrow">
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </li>
      </ul>
      <div
        class="empty-address"
        v-else
      >
        <i class="iconfont icon-dizhi1"></i>
        <p>无限的思念与牵挂，不如留个地址好相见~</p>
      </div>
      <div
        class="address-add"
        @click="goList('add')"
      >添加地址</div>
    </section>
    <footer>
      <Tabbar />
    </footer>
  </div>
</template>

<script>
import Header from "./Header";
import Tabbar from "@/components/common/Tabbar";

import http from "@/common/api/request";

import { mapState, mapMutations } from "vuex";

export default {
  name: "AddressIndex",
  components: {
    Header,
    Tabbar,
  },
  data() {
    return {
      addressStatus: false,
    };
  },
  created() {
    this.getData();
    if (this.$route.query.type == "select") {
      this.addressStatus = true;
    }
  },
  computed: {
    ...mapState("address", ["list"]),
  },
  methods: {
    ...mapMutations("address", ["INITDATA"]),
    getData() {
      http
        .$axios({
          url: "/api/selectedAddress",
          method: "POST",
          headers: {
            token: true,
          },
        })
        .then((res) => {
          this.INITDATA(res.data);
        });
    },
    goList(option) {
      if (this.addressStatus) {
        this.$bus.$emit("selectAddress", JSON.stringify(option));
        this.$router.back();
        return;
      }
      this.$router.push({
        name: "addressList",
        query: {
          key: JSON.stringify(option),
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.address-index {
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
    & ul {
      width: 100%;
      & li {
        display: flex;
        align-items: center;
        justify-content: space-between;

        background-color: #ffffff;
        margin-top: 0.2667rem;
        padding: 0.4rem;
        font-size: 0.3733rem;
        & .address-detail-info {
          & div:first-child {
            margin-bottom: 0.2667rem;
          }
          & .active {
            color: #b0352f;
          }
        }
        & .arrow {
          & i {
            color: #9e9e9e;
            font-size: 0.5333rem;
            font-weight: 700;
          }
        }
      }
    }
    & .address-add {
      width: 3.2rem;
      height: 1.0667rem;
      color: #ffffff;
      background-color: #3b8c2f;
      font-size: 0.3733rem;
      text-align: center;
      line-height: 1.0667rem;
      border-radius: 0.0533rem;
      margin-top: 1.0667rem;
    }
    & .empty-address {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 0.5333rem;
      & i {
        color: #dddddd;
        font-size: 2.1333rem;
      }
      & p {
        color: #dddddd;
        font-size: 0.3733rem;
        padding-top: 0.2667rem;
      }
    }
  }
}
</style>