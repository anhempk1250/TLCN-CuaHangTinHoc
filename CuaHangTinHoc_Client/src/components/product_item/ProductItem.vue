<template>
  <div>
    <div
      class="item"
      @mouseover="hoverItem()"
      @mouseleave="notHoverItem()"
      :class="{'myHover': shadowClass}"
      style="color: black;cursor: pointer;font: 14px Roboto, sans-serif"
      v-on:click="pushRouter()"
    >
      <div id="productImage">
        <img alt="itemImg" :src="product.first_image.image_link" />
      </div>
      <div id="productName">
        <div class="col">{{fixProductName}}</div>
      </div>
      <div id="productPrice" class="row" style="padding-left: 10px;">
        <div class="col-7 text-left" style="padding-right: 0;">
          <div v-if="product.ID_Discount!=null">
            <b
              style="color: red;"
            >{{fixFormatVND(product.Price - (product.Price / product.Percent_Discount)/1)}} đ</b>

            <div
              style="text-decoration: line-through;margin-top: 5px;"
            >{{fixFormatVND(product.Price)}} đ</div>
          </div>
          <div v-else-if="product.ID_Discount==null">
            <b style="color: red;">{{fixFormatVND(product.Price)}} đ</b>
          </div>
        </div>

        <div
          class="col-5"
          style="padding-left: 0;margin-left: -5px;"
          v-if="product.ID_Discount!=null"
        >
          <div>
            Nhập mã
            <br />
            <span style="margin-top: 5px;">{{product.ID_Discount}}</span>
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
    fixFormatVND(nStr) {
      nStr = nStr + "";
      let x = nStr.split(".");
      let x1 = x[0];
      let x2 = x.length > 1 ? "." + x[1] : "";
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
      }
      return x1 + x2;
    },
    pushRouter() {
      this.$store.dispatch("addProductHistory", this.product);
      this.$router.push({
        name: "product",
        params: { id: this.product.id }
      });
    }
  },
  computed: {
    shadowClass() {
      return this.isHover;
    },
    fixProductName() {
      let name = this.product.Name;
      if (this.product.Name.length > 45) return name.substring(0, 45) + " ...";
      else {
        return name;
      }
    }
  }
};
</script>
<style scoped lang="scss">
.myHover {
  box-shadow: 0px 0px 20px 5px rgba(179, 168, 181, 1);
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