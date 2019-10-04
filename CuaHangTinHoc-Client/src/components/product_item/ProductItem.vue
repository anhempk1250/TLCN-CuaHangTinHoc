<template>
  <div
    class="item"
    @mouseover="hoverItem()"
    @mouseleave="notHoverItem()"
    :class="{'shadow-lg p-1 mb-1 bg-white rounded': shadowClass}"
  >
    <div id="productImage">
      <img alt="itemImg" src="https://img1.phongvu.vn/media/catalog/product/1/_/1_45_29.jpg" />
    </div>
    <div id="productName">
      <div class="col">Máy tính Dao Le Van Vinh</div>
    </div>
    <div id="productPrice" class="row">
      <div class="col">
        <b>12.800.000đ</b>
        <br />
        <div style="text-decoration: line-through;">13.800.000đ</div>
      </div>

      <div class="col">
        <div>
          Nhập mã
          <br />
          <span>VV01234</span>
        </div>
      </div>
    </div>
    <div id="productSoldout">
      <div class="col">Hết hàng</div>
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
  methods: {
    hoverItem() {
      this.isHover = true;
    },
    notHoverItem() {
      this.isHover = false;
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
.item {
  font-size: small;
  margin: 1.5rem 0.2rem;
  height: 22rem;
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