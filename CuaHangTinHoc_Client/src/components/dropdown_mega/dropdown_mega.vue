<template>
  <div>
    <div class="dropdown1">
      <div class="dropbtn1">
        <i class="fa fa-chevron-down"></i> Sản phẩm vừa xem
      </div>
      <br />
      <div class="dropdown-content1">
        <div class="row1">
          <div class="column1" v-for="i in 9" :key="i">
            <a href="#">
              <div class="row">
                <div class="col">
                  <img src="https://img1.phongvu.vn/media/catalog/product/1/_/1_45_29.jpg" alt />
                </div>
              </div>
              <div class="row">
                <div class="col" style="word-break: break-all;">May Tinh ABC</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
a:hover .row{
  background-color: white;
}
.row {
  text-align: center;
  .col {
    img {
      width: 90%;
      height: 90%;
    }
    p {
      word-break: break-all;
      text-decoration: underline;
      color: red;
    }
  }
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.dropdown1 {
  float: left;
  overflow: hidden;
}

.dropdown1 .dropbtn1 {
  font-size: medium;
  height: 1rem;
}

.dropdown-content1 {
  display: none;
  position: absolute;
  background-color: white;
  z-index: 0;
  width: 100%;
  left: 0;
  z-index: 1;
}

.dropdown-content1 .header1 {
  background-color: white;
}

.dropdown1:hover .dropdown-content1 {
  display: block;
}

/* Create three equal columns that floats next to each other */
.column1 {
  float: left;
  width: 10%;
  height: 10rem;
  background-color: white;
}

.column1 a {
  float: none;
  color: black;
  text-decoration: none;
  display: block;
  text-align: left;
}

.column1 a:hover {
  background-color: #e9ebea;
}

/* Clear floats after the columns */
.row1:after {
  content: "";
  display: block;
  clear: both;
}

/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column1 {
    width: 100%;
    height: auto;
  }
}
</style>