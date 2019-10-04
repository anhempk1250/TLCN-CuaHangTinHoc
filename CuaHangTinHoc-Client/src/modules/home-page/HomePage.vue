<template>
  <div>
    <Notification/>
    <div id="bodyContent" class="row">
      <div id="productList" v-for="index in 10" :key="index">
        <ProductItem />
      </div>
    </div>
  </div>
</template>
<script>
import ProductItem from "../../components/product_item/ProductItem.vue";
import Notification from "../../components/homepage_notification/Homepage_notification.vue";
export default {
  data() {
    return {};
  },
  components: { ProductItem, Notification }
};
</script>
<style scoped lang="scss">
div {
  #bodyContent {
    width: 101%;
    margin-top: 0;
    background-color: white;
    #productList {
      max-width: 20%;
      min-width: 20%;
    }
  }
}
</style>