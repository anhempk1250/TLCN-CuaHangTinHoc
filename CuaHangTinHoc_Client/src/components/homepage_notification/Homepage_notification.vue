<template>
  <div id class="row" style="width: 101%;">
    <div class="col-md-2 category_container">
      <ul class="list-group">
        <li
          class="list-group-item dropdown dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <a href="#">Tivi - Màn hình TV</a>
          <div class="dropdown-menu" style="margin-left: 13rem;margin-top: -2rem;">
            <table class="table">
              <tr>
                <th>1</th>
                <th>1</th>
                <th>1</th>
              </tr>
              <tr>
                <th>1</th>
                <th>1</th>
                <th>1</th>
              </tr>
              <tr>
                <th>1</th>
                <th>1</th>
                <th>1</th>
              </tr>
              <tr>
                <th>1</th>
                <th>1</th>
                <th>1</th>
              </tr>
            </table>
          </div>
        </li>
        <li class="list-group-item">
          <a href="#">Điện thoại & máy tính bản</a>
        </li>

        <li class="list-group-item">
          <a href="#">Laptop & Macbook</a>
        </li>
        <li class="list-group-item">
          <a href="#">Loa & Thiết bị âm thanh</a>
        </li>
        <li class="list-group-item">
          <a href="#">Máy lạnh - Máy điều hòa</a>
        </li>
        <li class="list-group-item">
          <a href="#">Tủ lạnh</a>
        </li>
        <li class="list-group-item">
          <a href="#">PC - Máy tính bộ</a>
        </li>
        <li class="list-group-item">
          <a href="#">Linh kiện máy tính</a>
        </li>
      </ul>
    </div>
    <div class="col-md-7">
      <Carousel />
    </div>
    <div class="col-md-3">
      <div class="row">
        <img
          style="width: 100%;height:7.8rem;margin-bottom: 0.5rem;"
          src="https://img1.phongvu.vn/media/banner/pv-banner-390x190-2f883.jpg"
          alt="image"
        />
      </div>
      <div class="row">
        <img
          style="width: 100%;height:7.8rem;margin-bottom: 0.5rem;"
          src="https://img1.phongvu.vn/media/banner/pv-banner-390x190-e6fa7.jpg"
          alt="image"
        />
      </div>
      <div class="row">
        <img
          style="width: 100%;height:7.8rem;margin-bottom:0rem;"
          src="https://img1.phongvu.vn/media/banner/pv-banner-390x190-025bd.jpg"
          alt="image"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Carousel from "../../components/homepage_carousel/Homepage_carousel.vue";
export default {
  data() {
    return {};
  },
  components: { Carousel }
};
</script>
<style scoped lang="scss">
.dropdown-toggle::after {
  display: none;
}
.category_container {
  width: 100%;
  height: 100%;
  padding: 0; //list-group-item
  .list-group {
    padding: 0;
    width: 105%;
    .list-group-item {
      width: 100%;
      height: 2rem;
      padding: 0;
      padding-top: 0.2rem;
      padding-left: 1rem;
      border: 0;
      text-align: left;
      a {
        position: relative;
        text-align: left;
        width: 100%;
        font-size: 0.9rem;
        font-weight: 500;
        color: #474f4b;
        text-decoration: none;
      }
    }
    .list-group-item:hover {
      background-color: aqua;
      cursor: pointer;
    }
    a ul {
      display: block;
    }
  }
}
</style>