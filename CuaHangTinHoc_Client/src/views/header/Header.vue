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
              <i class="fa fa-bars"> Danh Mục Sản Phẩm</i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <a class="dropdown-item" href="#">Action</a>
              </li>
              <li>
                <a class="dropdown-item" href="#">Another action</a>
              </li>
              <li class="dropdown-submenu">
                <a class="dropdown-item dropdown-toggle" href="#">Google</a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">Submenu</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">Submenu0</a>
                  </li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 1</a>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">Subsubmenu1</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Subsubmenu1</a>
                      </li>
                    </ul>
                  </li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#">Submenu 2</a>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">Subsubmenu2</a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">Subsubmenu2</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
          <li>
            <a class="nav-link" style="color: black" href="#">
              <DropdownMega></DropdownMega>
            </a>
          </li>
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
import DropdownMega from "../../components/dropdown_mega/dropdown_mega.vue";
export default {
  data() {
    return {
      
    };
  },
  components: { Login_Modal, History_product_modal, DropdownMega }
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
.navbar-nav li:hover > ul.dropdown-menu {
  display: block;
}
.dropdown-submenu {
  position: relative;
}
.dropdown-submenu > .dropdown-menu {
  top: 0;
  left: 99%;
  margin-top: -4.45rem;
}

/* rotate caret on hover */
.dropdown-menu > li > a:hover:after {
  text-decoration: underline;
  transform: rotate(-90deg);
}
</style>