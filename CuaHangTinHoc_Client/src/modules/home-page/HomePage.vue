<template>
  <div>
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
    <div class="row bodyContentHomePage">
      <div class="productList col-2" v-for="i in 20" :key="i">
        <ProductItem v-if="i%2==0" class="product-container" :loading="productLoading" :product="productList[0]" />
        <ProductItem v-else class="product-container" :loading="productLoading" :product="productList[1]" />
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
      productLoading: "productLoading"
    })
  },
  created() {
    if( this.productList.length == 0 )
      this.$store.dispatch("getProductList");
  }
};
</script>
<style lang="scss" scoped>
div {
  .bodyContentHomePage {
    width: 100%;
    background-color: white;
    div {
      .productList {
        .product-container {
          margin: 2rem 1rem;
        }
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