<template>
  <div class="address-list container">
    <header>
      <Header>
        <span v-if="addressStatus">添加地址</span>
        <span v-else>编辑地址</span>
      </Header>
    </header>
    <section>
      <van-address-edit
        v-if="addressStatus"
        :area-list="areaList"
        show-set-default
        @save="onSave"
      />
      <van-address-edit
        v-else
        :area-list="areaList"
        :address-info="AddressInfo"
        show-delete
        show-set-default
        @save="onUpdate"
        @delete="onDelete"
      />
    </section>
    <footer>
      <Tabbar />
    </footer>
  </div>
</template>

<script>
import Header from "./Header";
import Tabbar from "@/components/common/Tabbar";

import { Toast } from "vant";

import "vant/lib/index.css";

import http from "@/common/api/request";

export default {
  name: "AddressIndex",
  components: {
    Header,
    Tabbar,
  },
  data() {
    return {
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市",
        },
        city_list: {
          110100: "北京市",
          120100: "天津市",
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",

          120101: "津南区",
          120102: "东丽区",
        },
      },
      AddressInfo: {},
      addressStatus: false,
    };
  },
  mounted() {
    let key = JSON.parse(this.$route.query.key);
    // 添加地址
    if (key == "add") {
      this.addressStatus = true;
    } else {
      this.AddressInfo = key;
      this.AddressInfo.isDefault =
        this.AddressInfo.isDefault == 1 ? true : false;
    }
  },
  methods: {
    // 新增
    onSave(content) {
      content.isDefault = content.isDefault == true ? 1 : 0;
      http
        .$axios({
          url: "/api/addAddress",
          method: "POST",
          headers: {
            token: true,
          },
          data: {
            ...content,
          },
        })
        .then((res) => {
          this.$router.push({
            name: "addressIndex",
          });
          if (res.success) {
            Toast(res.msg);
          }
        });
    },
    // 修改
    onUpdate(content) {
      content.isDefault = content.isDefault == true ? 1 : 0;
      http
        .$axios({
          url: "/api/updateAddress",
          method: "POST",
          headers: {
            token: true,
          },
          data: {
            ...content,
          },
        })
        .then((res) => {
          this.$router.push({
            name: "addressIndex",
          });
          if (res.success) {
            Toast(res.msg);
          }
        });
    },
    // 删除(修改)
    onDelete(content) {
      http
        .$axios({
          url: "/api/deleteAddress",
          method: "POST",
          headers: {
            token: true,
          },
          data: {
            id: content.id,
          },
        })
        .then((res) => {
          this.$router.push({
            name: "addressIndex",
          });
          if (res.success) {
            Toast(res.msg);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.address-list {
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
    & .van-address-edit {
      padding: 0;
      width: 100%;
    }
    ::v-deep .van-switch--on {
      background-color: #3b8c2f;
    }
    ::v-deep .van-button--danger {
      background-color: #3b8c2f;
      border: 0;
    }
  }
}
</style>