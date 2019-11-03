<template>
  <div>
    <div class="dropdown1">
      <div class="dropbtn1" style="cursor: pointer">
        <i class="fa fa-bars"></i> Danh Mục Sản Phẩm
      </div>
      <br />
      <div class="dropdown-content1" style="padding: 0 3rem">
        <div class="row1">
          <div class="column1">
              <div class="row" v-for="(category,index) in productCategoryList" :key="index">
                <div class="col-3">
                    {{category.name}}
                </div>
                <div class="col-9">
                    <div v-for="(type,indexType) in category.product_types" :key="indexType">
                        {{type.name}}
                    </div>
                </div>
              </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: {
    productCategoryList: []
  }
};
</script>
<style lang="scss" scoped>
a:hover .row {
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
  width: 100%;
  height: 10rem;
  background-color: white;
}

.column1 a {
  float: none;
  color: black;
  text-decoration: none;
  display: block;
  text-align: left;
  padding: 0 5rem;
}

.column1 a:hover {
  background-color: #e9ebea;
}

/* Clear floats after the columns */
.row1:after {
  position: absolute;
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