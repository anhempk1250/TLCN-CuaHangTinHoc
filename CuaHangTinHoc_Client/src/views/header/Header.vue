<template>
  <div style="font:Roboto, san-serif;">
    <nav class="navbar navbar-expand-lg navbar-light myHeader1">
      <router-link class="navbar-brand" :to="{name: 'home-page'}">
        <img
          style="width: 5rem;"
          src="https://iweb.tatthanh.com.vn/pic/3/blog/images/logo-may-tinh.jpg"
          alt="logo-image"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="form-inline my-2 my-lg-0 navbar-nav ml-auto myFormSearch">
          <input
            class="form-control mr-sm-2 myInputSearch"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn my-2 my-sm-0" type="submit">
            <i class="fa fa-search"></i> Search
          </button>
        </form>
        <router-link
          class="btn"
          style="color: white;"
          v-if="loadUserName && loadUserName != ''"
          :to="{name: 'mypage'}"
        >
          <i class="fas fa-user"></i>
          {{loadUserName}}
        </router-link>

        <button
          class="leftNavbar-item btn"
          data-toggle="modal"
          data-target=".login_modal"
          data-backdrop="dynamic"
          v-else
        >
          <i class="fas fa-user"></i> Đăng Nhập
        </button>

        <router-link v-if="$route.name != 'cart'" :to="{name: 'cart'}">
          <button class="leftNavbar-item btn">
            <i class="fa fa-shopping-cart"></i>  
            <span style="color:yellowgreen;" v-if="productCountInCart!=0">{{' (' + productCountInCart+') '}}</span>Giỏ Hàng
          </button>
        </router-link>
        <a v-if="$route.name == 'cart'" href="http://localhost:8081/cart">
          <button class="leftNavbar-item btn">
            <i class="fa fa-shopping-cart"></i>  
            <span style="color:yellowgreen;" v-if="productCountInCart!=0">{{' (' + productCountInCart+') '}}</span>Giỏ Hàng
          </button>
        </a>

        <button
          class="btn"
          style="color: white;"
          v-if="loadUserName && loadUserName != ''"
          @click="logout()"
        >
          <i class="fas fa-exit"></i>
          Đăng Xuất
        </button>
      </div>
    </nav>

    <nav class="navbar navbar-expand-lg navbar-light myHeader2">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="dropdown">
            <a
              class="nav-link dropdown-toggle"
              style="color: black"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-bars"></i>
              Danh Mục Sản Phẩm
            </a>
            <ul class="dropdown-menu" style="padding:0;" aria-labelledby="navbarDropdownMenuLink">
              <li
                v-for="(category,index) in productCategoryList"
                :key="index"
                class="dropdown-submenu"
              >
                <a
                  v-if="category.id!=1"
                  href="#"
                  class="dropdown-item dropdown-toggle"
                  @click="goProductListPage(category.id,-1,-1)"
                >{{category.name}}</a>
                <ul class="dropdown-menu" style="padding:0;">
                  <li class="dropdown-submenu">
                    <a
                      @click="goProductListPage(category.id,-1,-1)"
                      class="dropdown-item dropdown-toggle"
                      href="#"
                    >Thương Hiệu</a>
                    <ul class="dropdown-menu">
                      <li v-for="(producer,index) in producerList" :key="index">
                        <a
                          href="#"
                          class="dropdown-item"
                          @click="goProductListPage(category.id,-1,producer.id)"
                        >{{producer.name}}</a>
                      </li>
                    </ul>
                  </li>
                  <div v-if="category.product_types && category.product_types.length > 0">
                    <li v-for="(type,indexType) in category.product_types" :key="indexType">
                      <a
                        href="#"
                        class="dropdown-item"
                        @click="goProductListPage(category.id,type.id, -1)"
                      >{{type.name}}</a>
                    </li>
                  </div>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li>
            <DropdownMegaHistory
              class="nav-link"
              style="color: black"
              :productHistoryList="productHistoryList"
            ></DropdownMegaHistory>
          </li>
          <li class="nav-item active ml-auto">
            <router-link class="nav-link" :to="{name: 'showroom'}">
              <i class="fa fa-building"></i>
              Hệ thống Showroom
            </router-link>
          </li>
          <li class="nav-item active ml-auto">
            <router-link :to="{name: 'policy'}" class="nav-link" href="#">
              <i class="fa fa-wrench"></i>
              Kiểm tra bảo hành
            </router-link>
          </li>
          <li class="nav-item active ml-auto">
            <a class="nav-link" href="#">
              <i class="fa fa-bell"></i>
              Thông báo
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <Login_Modal :store="false" />
  </div>
</template>
<script>
import Login_Modal from "../../components/login_modal/Login_modal.vue";
import DropdownMegaHistory from "../../components/dropdown_mega/dropdown_mega.vue";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      token: "",
      userName: ""
    };
  },
  methods: {
    goProductListPage(categoryID, typeID, producerID) {
      let params = {
        categoryID: categoryID,
        typeID: typeID,
        producerID: producerID
      };
      if (this.$route.name != "productList") {
        this.$router.push({ name: "productList", params: params });
      }
    },
    test() {
      console.log(this.productCategoryList);
    },
    logout() {
      this.$swal
        .fire({
          title: "Đăng xuất",
          text: "Có chắc bạn muốn đăng xuất",
          showCancelButton: true,
          confirmButtonText: "Có",
          cancelButtonText: "Không"
        })
        .then(result => this.handleLogout(result));
    },
    handleLogout(result) {
      if (result.value) {
        this.$store.dispatch("customerLogout");
        if (this.$route.name != "home-page")
          this.$router.push({ name: "home-page" });
      }
    }
  },
  components: {
    Login_Modal,

    DropdownMegaHistory
  },
  computed: {
    ...mapGetters({
      productCategoryList: "productCategoryList",
      productCategoryLoading: "productCategoryLoading",
      producerList: "producerList",
      producerLoading: "producerLoading",
      productHistoryList: "productHistoryList",
      customerAccountObject: "customerAccountObject",
      productCountInCart: "productCountInCart"
    }),
    loadUserName() {
      if (localStorage.userName && localStorage.userName != "")
        return localStorage.userName;
      else {
        return this.customerAccountObject.name;
      }
    },
    loadProductCountInCart() {
      return this.productCountInCart;
    }
  },
  created() {
    if (this.productCategoryList.length == 0)
      this.$store.dispatch("getProductCategory");
    if (this.producerList.length == 0) this.$store.dispatch("getProducerList");

    if (localStorage.productHistoryList)
      this.$store.dispatch(
        "updateProductHistory",
        localStorage.productHistoryList
      );
    if (localStorage.cname != "") this.userName = localStorage.cname;

    this.$store.dispatch("updateProductCountInCart");
  }
};
</script>
<style scoped lang="scss">
.dropdown-toggle::after {
  display: none;
}
.myHeader1 {
  padding-left: 5rem;
  padding-right: 5rem;
  background-color: #068f94;
  button {
    background-color: #068f94;
    color: white;
  }

  .btn:focus,
  .btn:active {
    outline: none !important;
    box-shadow: none !important;
  }

  .navbar-brand {
    margin-right: 5%;
  }
  #navbarSupportedContent {
    .myFormSearch {
      width: 50%;
      display: grid;
      grid-template-columns: 70% 30%;
    }
  }
}
.myHeader2 {
  padding: 0 5rem;
  margin: 0;
  background-color: #e9ebea;
  border: 0.5px solid #9bc4af;
  border-top: 0px;
}
.navbar-nav li:hover > ul.dropdown-menu {
  display: block;
  color: red;
}

.dropdown-submenu {
  position: relative;
  padding: 0;
}
.dropdown-submenu > .dropdown-menu {
  position: absolute;
  top: -3px;
  left: 99.5%;
}

/* rotate caret on hover */
.dropdown-menu > li > a:hover:after {
  text-decoration: underline;
  transform: rotate(-90deg);
}
</style>