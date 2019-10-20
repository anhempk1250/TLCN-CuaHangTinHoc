<template>
  <div>
    <div
      class="item"
      @mouseover="hoverItem()"
      @mouseleave="notHoverItem()"
      :class="{'myHover': shadowClass}"
      style="color: black;cursor: pointer"
      v-on:click="pushRouter()"
      v-if="!loading"
    >
      <div id="productImage">
        <img alt="itemImg" src="https://salt.tikicdn.com/cache/w1200/ts/product/f3/a1/2f/daef43879134e1a0ed37dfa76f102aca.jpg" />
      </div>
      <div id="productName">
        <div class="col">{{product.Name}}</div>
      </div>
      <div id="productPrice" class="row" style="padding-left: 10px;">
        <div class="col-7 text-left" style="padding-right: 0;">
          <b style="color: red;">{{product.Price - (product.Price / product.Percent_Discount)/1}} đ</b>
          <br />
          <div style="text-decoration: line-through;">{{product.Price}} đ</div>
        </div>

        <div class="col-5" style="padding-left: 0;margin-left: -5px;">
          <div v-if="product.ID_Discount!=null">
            Nhập mã
            <br />
            <span>{{product.ID_Discount}}</span>
          </div>
        </div>
      </div>
      <div id="productSoldout" v-if="checkSoldOut()">
        <div class="col">Hết hàng {{product.productCount}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isHover: false
    };
  },
  props: {
    product: Object,
    loading: Boolean
  },
  methods: {
    hoverItem() {
      this.isHover = true;
    },
    notHoverItem() {
      this.isHover = false;
    },
    checkSoldOut() {
      if (this.product.productCount < 1) return true;
      return false;
    },
    pushRouter() {
      this.$router.push(
        "/product/" + this.product.ID + "/" + this.product.Name
      );
    }
  },
  computed: {
    shadowClass() {
      return this.isHover;
    }
  }
};
</script>
<style scoped lang="scss">
.myHover {
  box-shadow: 0px 0px 60px 10px rgba(179, 168, 181, 1);
}
a:hover {
  text-decoration: none;
}
.item {
  font-size: small;
  margin: 1.5rem 0;
  height: 20rem;
  #productImage {
    img {
      height: 10rem;
      width: 10rem;
    }
  }
  #productName {
    margin: 1rem 0;
    text-align: left;
  }
  #productPrice {
    .row {
      margin: 0;
      padding: 0;
      .col {
        padding: 0;
        margin: 0;
      }
    }
    span {
      display: block;
      background-color: yellowgreen;
      margin-left: 20%;
      width: 60%;
      color: white;
      border-radius: 5px;
    }
  }
  #productSoldout {
    margin-top: 1rem;
    color: red;
    font-size: small;
    text-align: left;
  }
}
</style>