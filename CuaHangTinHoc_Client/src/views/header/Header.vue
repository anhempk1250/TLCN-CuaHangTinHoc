<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light myHeader1">
      <a class="navbar-brand" href="#">VH</a>
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
        <button class="btn">
          <i class="fa fa-star"></i> Khuyến Mãi
        </button>
        <button
          class="leftNavbar-item btn"
          data-toggle="modal"
          data-target="#login_modal"
          data-backdrop="dynamic"
        >
          <i class="fa fa-user"></i> Đăng Nhập
        </button>
        <button class="leftNavbar-item btn">
          <i class="fa fa-shopping-cart"></i> Giỏ Hàng
        </button>
      </div>
    </nav>

    <nav class="navbar navbar-expand-lg navbar-light myHeader2">
      <div class="collapse navbar-collapse">
        <div class="nav-item dropdown">
          <a
            style="color:black"
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fa fa-bars"></i> Danh mục sản phẩm
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </div>

        <ul class="navbar-nav ml-auto">
          <a
            class="nav-link"
            style="color: black"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="modal"
            data-target=".bd-example-modal-xl"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fa fa-chevron-down"></i> Sản phẩm vừa xem
          </a>
          <li class="nav-item active ml-auto">
            <a class="nav-link" href="#">
              <i class="fa fa-building"></i>
              Hệ thống Showroom
            </a>
          </li>
          <li class="nav-item active ml-auto">
            <a class="nav-link" href="#">
              <i class="fa fa-wrench"></i>
              Kiểm tra bảo hành
            </a>
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

    <Login_Modal />
    <History_product_modal />
  </div>
</template>
<script>
import Login_Modal from "../../components/login_modal/Login_modal.vue";
import History_product_modal from "../../components/history_product_modal/History_product_modal.vue";

export default {
  data() {
    return {};
  },
  components: { Login_Modal, History_product_modal }
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
  .navbar-brand {
    margin-right: 5%;
  }
  #navbarSupportedContent {
    .myFormSearch {
      width: 50%;
      display: grid;
      grid-template-columns: 75% 20%;
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
</style>