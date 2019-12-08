<template>
  <div style="font-family: Roboto, sans-serif;">
    <div class="row">
      <div class="col-md-9">
        <Carousel />
      </div>
      <div class="col-md-3">
        <div class="row">
          <img
            style="width: 100%;height: 9.5rem;margin-bottom: 0.75rem;"
            src="https://img1.phongvu.vn/media/banner/pv-banner-390x190-2f883.jpg"
            alt="image"
          />
        </div>
        <div class="row">
          <img
            style="width: 100%;height:9.5rem;margin-bottom: 0.75rem;"
            src="https://img1.phongvu.vn/media/banner/pv-banner-390x190-e6fa7.jpg"
            alt="image"
          />
        </div>
        <div class="row">
          <img
            style="width: 100%;height:9.5rem;"
            src="https://img1.phongvu.vn/media/banner/pv-banner-390x190-025bd.jpg"
            alt="image"
          />
        </div>
      </div>
    </div>
    <div style="margin: 3rem 0;" v-for="(productType,index) in productTypeList" :key="index">
      <div v-if="productType.product_list_with_type.length > 0">
        <h3 class="text-left" style="color : #1D99DB">{{productType.name}}</h3>
      <div class="ListProductContainer">
        <div class="bodyContentHomePage">
          <div
            class="productList"
            v-for="(product,indexProduct) in productType.product_list_with_type"
            :key="indexProduct"
          >
            <ProductItem class="product-container" :loading="false" :product="product" />
          </div>
        </div>
        <a href="#" class="btn btn-outline-primary">Xem Thêm </a>
      </div>
      </div>
    </div>
  </div>
</template> 
<script>
import ProductItem from "../../components/product_item/ProductItem.vue";
import Carousel from "../../components/homepage_carousel/Homepage_carousel.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  components: { ProductItem, Carousel },
  methods: {},
  computed: {
    ...mapGetters({
      productList: "productList",
      productLoading: "productLoading",
      productTypeList: "productTypeList",
      productTypeLoading: "productTypeLoading"
    })
  },
  created() {
    if (this.productTypeList.length == 0)
      this.$store.dispatch("getProductTypeList");
  }
};
</script>
<style lang="scss" scoped>
.ListProductContainer {
  background-color: white;
  padding: 0 1rem 1rem 1rem;
  a {
    width: 20%;
  }
  .bodyContentHomePage {
    width: 100%;
    background-color: white;
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    .productList {
      .product-container {
        margin: 2rem 1rem;
      }
    }
  }
}
.row {
  margin: 0;
  .col-md-9,
  .col-md-3 {
    margin: 0;
    padding: 0;
  }
}
</style>