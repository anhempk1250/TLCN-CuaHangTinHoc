<template>
  <div style="width: 100%;">
    <div class="btn-group-vertical" style="width: 100%;padding-left: 1rem;">
      <router-link :to="{name: 'overview'}" style="width: 100%;">
        <button class="btn" :class="{'active': $route.name == 'overview'}">
          <i class="fa fa-tachometer"></i> Tổng Quan
        </button>
      </router-link>
      <router-link :to="{name: 'category'}" style="width: 100%;">
        <button class="btn" :class="{'active': $route.name == 'category'}">
          <i class="fa fa-tachometer"></i> Danh Mục Sản Phẩm
        </button>
      </router-link>
      <router-link :to="{name: 'products'}" style="width: 100%;">
        <button class="btn" :class="{'active': $route.name == 'products'}">
          <i class="fa fa-barcode"></i> Sẩn Phẩm
        </button>
      </router-link>
      <router-link :to="{name: 'order'}" style="width: 100%;">
        <button class="btn" :class="{'active': $route.name == 'order'}">
          <i class="fa fa-shopping-cart"></i> Đơn Hàng
        </button>
      </router-link>
      <router-link :to="{name: 'customer'}" style="width: 100%;">
        <button class="btn" :class="{'active': $route.name == 'customer'}">
          <i class="fa fa-users"></i> Khách Hàng
        </button>
      </router-link>
      <router-link :to="{name: 'promotion'}" style="width: 100%;">
        <button class="btn" :class="{'active': $route.name == 'promotion'}">
          <i class="fa fa-tachometer"></i> Khuyến Mãi
        </button>
      </router-link>
      <router-link :to="{name: 'sales'}" style="width: 100%;">
        <button class="btn" :class="{'active': $route.name == 'sales'}">
          <i class="fa fa-signal"></i> Doanh Số
        </button>
      </router-link>

      <router-link :to="{name: 'profit'}" style="width: 100%;">
        <button class="btn" :class="{'active': $route.name == 'profit'}">
          <i class="fa fa-usd"></i> Lợi Nhuận
        </button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    test() {
      console.log(this.$route);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "LeftMenu.scss";
div {
  width: 100%;
  overflow-y: hidden;
  .btn-group-vertical {
    button {
      font-size: 13px;
      width: 100%;
      text-align: left;
      padding: 10px 15px;
      color: black;
      background-color: #e9ebea;
      border-bottom: 1px solid silver;
      border-radius: 0;
      height: 3.5rem;
    }
    button:hover {
      font-weight: bold;
      color: blue;
      background-color: white;
      font-size: 14px;
    }
    .active {
      color: black;
      font-size: 14px;
      font-weight: bolder;
      background-color: #fbd441;
    }
  }
}
</style>