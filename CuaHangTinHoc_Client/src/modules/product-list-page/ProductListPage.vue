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

    <div
      class="row"
      style="background-color:white;margin-top:2rem;margin-bottom:1rem;padding:1.5rem 0"
    >
      <div class="col-12 col-md-2">
        <select @change="updateTempList()" v-model="categoryIdSelected" class="form-control">
          <option selected value="-1">-- Danh Mục --</option>
          <option v-for="(category,index) in categoryList" :key="index" :value="category.id">
            <p>{{category.name}}</p>
          </option>
        </select>
      </div>
      <div class="col-12 col-md-2">
        <select @change="updateTempList()" v-model="typeProductIdSelected" class="form-control">
          <option value="-1">Loại sản phẩm</option>
          <option v-for="(type,index) in loadTypeList" :key="index" :value="type.id">{{type.name}}</option>
        </select>
      </div>
      <div class="col-12 col-md-2">
        <select @change="updateTempList()" v-model="producerIdSelected" class="form-control">
          <option value="-1" selected>-- Nhà Sản Xuất --</option>
          <option
            v-for="(producer,index) in storeProducerList"
            :key="index"
            :value="producer.id"
          >{{producer.name}}</option>
        </select>
      </div>
      <div class="col-12 col-md-3 offset-md-3">
        <input
          @keyup.enter="updateTempList()"
          v-model="inputSearch"
          type="text"
          class="form-control"
          placeholder="Tìm kiếm"
        />
      </div>
      <div v-if="!loadLoading" class="bodyContentHomePage">
        <div v-for="(product,index) in loadTempPageList" :key="index">
          <ProductItem :loading="productLoading" :product="product"></ProductItem>
        </div>
      </div>
      <div
        v-if="!productLoading && loadTempPageList.length == 0"
        class="text-center"
        style="width: 100%;"
      >
        <img src="https://tiki.vn/desktop/img/account/tiki-not-found-pgae.png" />
        <h3>Không tìm thấy sản phẩm</h3>
      </div>
      <div v-if="productLoading" class="text-center" style="width:100%;">
        <b-spinner variant="primary" type="grow" style="width: 100px;height:100px;"></b-spinner>
        <b-spinner variant="primary" type="grow" style="width: 100px;height:100px;"></b-spinner>
        <b-spinner variant="primary" type="grow" style="width: 100px;height:100px;"></b-spinner>
      </div>
    </div>
    <b-pagination
      v-model="currentPage"
      @change="changePage()"
      style="margin-left:-15px;"
      :total-rows="loadTempList.length"
      :per-page="perPage"
    ></b-pagination>
  </div>
</template>
<script>
import Carousel from "../../components/homepage_carousel/Homepage_carousel";
import ProductItem from "../../components/product_item/ProductItem";
import { mapGetters } from "vuex";
export default {
  components: {
    Carousel,
    ProductItem
  },
  data() {
    return {
      inputSearch: "",
      categoryIdSelected: -1,
      producerIdSelected: -1,
      typeProductIdSelected: -1,
      tempList: [],
      loading: false,
      typeListSelected: [],
      tempPageList: [],
      list: [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "4" },
        { id: 5, name: "5" },
        { id: 6, name: "6" },
        { id: 7, name: "7" },
        { id: 8, name: "8" },
        { id: 9, name: "9" },
        { id: 10, name: "10" }
      ],
      start: 0,
      currentPage: 1,
      perPage: 20
    };
  },
  methods: {
    search(productList) {
      if (this.inputSearch != "") {
        let arr = [];
        let inputSearch = this.inputSearch.toLowerCase();
        for (let i = 0; i < productList.length; i++) {
          let id = productList[i].id.toLowerCase();
          let name = productList[i].name.toLowerCase();
          if (id.includes(inputSearch) || name.includes(inputSearch)) {
            arr.push(productList[i]);
          }
        }
        this.tempList = arr;
      } else this.tempList = productList;
      this.currentPage = 1;
      this.changePage();
      this.loading = false;
    },
    changePage() {
      let vm = this;
      setTimeout(function() {
        let arr = [];
        vm.start = (vm.currentPage - 1) * vm.perPage;
        let end = vm.start + vm.perPage;
        if (end > vm.tempList.length) end = vm.tempList.length;
        for (let i = vm.start; i < end; i++) {
          arr.push(vm.tempList[i]);
        }
        vm.tempPageList = arr;
      }, 300);
    },
    updateTempList() {
      this.loading = true;
      this.updateForCategoryTempList(this.storeProductList);
    },
    updateForCategoryTempList(productList) {
      if (this.categoryIdSelected != -1) {
        let arr = [];
        console.log(productList);
        if (this.categoryIdSelected != 1) {
          for (let i = 0; i < productList.length; i++) {
            if (productList[i].product_category_id == this.categoryIdSelected) {
              arr.push(productList[i]);
            }
          }
        } else {
          arr = productList;
        }
        console.log(arr, "here");
        this.updateTypeListSelected();
        this.updateForTypeTempList(arr);
      } else {
        this.updateForProducerTempList(productList);
        this.typeProductIdSelected = -1;
      }
    },
    updateForTypeTempList(productList) {
      console.log(productList);
      if (this.typeProductIdSelected != -1) {
        let arr = [];
        for (let i = 0; i < productList.length; i++) {
          if (this.checkProductType(productList[i].product_type_list)) {
            arr.push(productList[i]);
          }
        }
        this.updateForProducerTempList(arr);
      } else this.updateForProducerTempList(productList);
    },
    checkProductType(typeList) {
      for (let i = 0; i < typeList.length; i++) {
        if (typeList[i].id == this.typeProductIdSelected) {
          return true;
        }
      }
      return false;
    },
    updateTypeListSelected() {
      if (this.categoryIdSelected == -1) this.typeListSelected = [];
      else {
        let categories = this.categoryList;
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].id == this.categoryIdSelected) {
            this.typeListSelected = categories[i].product_types;
          }
        }
      }
    },
    updateForProducerTempList(productList) {
      if (this.producerIdSelected != -1) {
        let arr = [];
        for (let i = 0; i < productList.length; i++) {
          if (productList[i].producer.id == this.producerIdSelected) {
            arr.push(productList[i]);
          }
        }
        this.search(arr);
      } else {
        this.search(productList);
      }
    }
  },
  computed: {
    ...mapGetters({
      storeProductList: "productList",
      productLoading: "productLoading",
      storeProducerList: "producerList",
      categoryList: "productCategoryList"
    }),
    loadTempPageList() {
      return this.tempPageList;
    },
    loadTypeList() {
      return this.typeListSelected;
    },
    loadTempList() {
      return this.tempList;
    },
    loadLoading() {
      return this.loading;
    }
  },
  created() {
    this.$store.dispatch("getProductCategoryFromProductListPage");
    this.$store.dispatch("getProducerListFromProductListPage");
    console.log(this.$route.params, "meta");
    this.$store.dispatch("getProductListFromProductListPage").then(() => {
      if (this.$route.params.categoryID) {
        this.categoryIdSelected = this.$route.params.categoryID;
        if (this.$route.params.typeID) {
          this.typeProductIdSelected = this.$route.params.typeID;
        }
        if (this.$route.params.producerID) {
          this.producerIdSelected = this.$route.params.producerID;
        }
        this.updateTempList();
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.bodyContentHomePage {
  width: 100%;
  margin-top: 2rem;
  background-color: white;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  .productList {
    .product-container {
      margin: 2rem 1rem;
    }
  }
}
</style>