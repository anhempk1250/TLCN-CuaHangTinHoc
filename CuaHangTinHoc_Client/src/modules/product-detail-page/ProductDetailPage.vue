<template>
  <div style="background-color: #e9ebea;">
    <div v-if="productDetailsLoading">
      <b-spinner variant="primary" type="grow" style="width: 100px;height:100px;"></b-spinner>
      <b-spinner variant="primary" type="grow" style="width: 100px;height:100px;"></b-spinner>
      <b-spinner variant="primary" type="grow" style="width: 100px;height:100px;"></b-spinner>
    </div>
    <div class="row" style="background-color: white;" v-if="!productDetailsLoading">
      <div class="col-md-5" style="margin-bottom: 2rem">
        <div class="row">
          <div class="col-md-2">
            <div class="row" v-for="(index) in 4" :key="index">
              <div class="col">
                <span>
                  <img
                    :src="image_link + productDetailsObject.id + '/'+(index)+'.png'"
                    v-on:click="changeImage(index)"
                  />
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-10">
            <zoom :url="loadImage" :scale="2"></zoom>
          </div>
        </div>
      </div>
      <div class="col-md-7" style="margin-bottom: 2rem">
        <div class="row">
          <div class="col">
            <br />
            <h4 style="text-align: left;font-weight: 450;">{{productDetailsObject.name}}</h4>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <hr />
            <h4 style="text-align: left;font-weight: 450;">
              Giá :
              <span style="color: red;">{{fixFormatVND(productDetailsObject.price)}} đ</span>
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <hr />
            <div class="row">
              <div class="col-2" style="text-align: left;">
                <span>Số lượng :</span>
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                  <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-secondary" v-on:click="minusProduct()">-</button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      style="background-color: white;color:black;cursor:auto"
                    >{{loadProductCount}}</button>
                    <button type="button" class="btn btn-secondary" v-on:click="plusProduct()">+</button>
                  </div>
                </div>
              </div>
              <div class="col-10" style="text-align: left;">
                <button
                  style="margin-top:0.8rem;position: absolute; right: 0;"
                  class="btn btn-danger btn-lg"
                  v-on:click="test()"
                  @click="insertCart()"
                >Cho vào giỏ hàng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 class="text-left" style="margin-top: 3rem" v-if="!productDetailsLoading">Thông tin chi tiết</h3>
    <div class="row" v-if="!productDetailsLoading 
      && productDetailsObject">
      <div class="col-md-8" style="padding:1rem 1rem 0 1rem;background-color: white;">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th style="width: 30%;">Thuộc tính sản phẩm</th>
              <th>Mô tả tính sản phẩm</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(prop, index) in formatDescription()" :key="index">
              <td>{{(productDetailsObject.category.property.split("___")[index]).split("_")[1]}}</td>
              <td class="text-left">{{prop}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-4" style="padding:1rem 1rem 0 1rem;">
        <img
          style="width:100%;height:300px;"
          src="https://salt.tikicdn.com/ts/banner/13/39/08/b5f8665c5ef6577d4886013f693d1458.jpg"
        />
      </div>
    </div>

    <div v-if="!productDetailsLoading" style="margin-top: 2rem">
      <h3 class="text-left">Chấm điểm & đánh giá từ người mua</h3>
      <div class="row" v-if="productDetailsObject" style="background-color:white">
        <div class="col-md-3" style="border: 1px solid #e9ebea;padding: 1rem">
          <ProductItem :product="productDetailsObject"></ProductItem>
          <div class="row" style="margin-top: 1rem;">
            <div class="col">
              <StarsRating
              :star-size="20"
              :show-rating="false"
              :read-only="true"
              :increment="0.5"
              :rating="loadAvgStar"
            ></StarsRating>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="comment" v-for="(comment,index) in commentProductList" :key="index">
            <p>{{comment.order.customer.name}}</p>
            <p>
              <b>{{comment.comment}}</b>
            </p>
            <p>
              <StarsRating
                :star-size="20"
                :show-rating="false"
                :read-only="true"
                :rating="comment.stars"
              ></StarsRating>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import StarsRating from "vue-star-rating";
import ProductItem from "../../components/product_item/ProductItem.vue";
import zoom from "vue-piczoom";
export default {
  data() {
    return {
      tempID: "",
      indexImage: 1,
      productCount: 1,
      image_link: "http://localhost:8000/storage/images/",
      avgStar: 0
    };
  },
  components: { zoom, StarsRating, ProductItem },
  methods: {
    test() {
      console.log(this.productDetailsObject);
    },
    changeImage(index) {
      this.indexImage = index;
    },
    plusProduct() {
      if (this.productCount == this.productDetailsObject.productCount)
        alert(
          "Số lượng sản phẩm còn lại " +
            this.productDetailsObject.productCount +
            " không thểm tăng thêm !"
        );
      else this.productCount = this.productCount + 1;
    },
    fixFormatVND(nStr) {
      nStr = nStr + "";
      let x = nStr.split(".");
      let x1 = x[0];
      let x2 = x.length > 1 ? "." + x[1] : "";
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
      }
      return x1 + x2;
    },
    minusProduct() {
      if (this.productCount == 1)
        alert("Số lượng sản phẩm không được phép nhỏ hơn 1 !");
      else this.productCount = this.productCount - 1;
    },
    formatDescription() {
      let arr = this.productDetailsObject.description.split("___");
      console.log(arr);
      return arr;
    },
    insertCart() {
      let temp = [];
      if (!localStorage.cart) {
        localStorage.cart = "";
      } else {
        temp = JSON.parse(localStorage.cart);
      }
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id == this.productDetailsObject.id) {
          this.$swal({
            type: "info",
            title: "Thông báo",
            html:
              '<p style="color: red">Sản phẩn đã có trong giỏ hàng</p>(Bạn có thể tăng số lượng tại giỏ hàng)'
          });
          return -1;
        }
      }
      temp.push({
        id: this.productDetailsObject.id,
        name: this.productDetailsObject.name,
        count: this.productCount,
        price: this.productDetailsObject.price,
        productCount: this.productDetailsObject.productCount
      });
      this.$swal({
        type: "success",
        title: "Thông báo",
        text: "Thêm vào giỏ hàng thành công"
      });
      localStorage.cart = JSON.stringify(temp);
      this.$store.dispatch("updateProductCountInCart");
    }
  },
  computed: {
    refresh() {
      console.log(this.$route.params.id);
      return this.$route.params.id;
    },
    loadAvgStar() {
      return this.avgStar;
    },
    loadImage() {
      return (
        this.image_link +
        this.productDetailsObject.id +
        "/" +
        this.indexImage +
        ".png"
      );
    },
    loadProductCount() {
      return this.productCount;
    },
    ...mapGetters({
      productDetailsObject: "productDetailsObject",
      productDetailsLoading: "productDetailsLoading",
      commentProductList: "commentProductList",
      commentProductLoading: "commentProductLoading"
    })
  },
  created() {
    let vm = this;
    this.tempID = this.$route.params.id;
    this.$store.dispatch("getProductDetail", this.$route.params.id).then(() => {
      if (this.productDetailsObject && this.productDetailsObject != {})
        this.$store.dispatch("addProductHistory", this.productDetailsObject);
      this.formatDescription();
    });
    this.$store
      .dispatch("getCommentProductList", this.$route.params.id)
      .then(response => {
        if (response.data.list) {
          let total = 0;
          for (let i = 0; i < response.data.list.length; i++) {
            total += response.data.list[i].stars;
          }
          vm.avgStar = total / response.data.list.length / 1;
        }
      });
  },
  watch: {
    refresh() {
      console.log("ahihi");
    }
  }
};
</script>
<style lang="scss" scoped>
.row {
  margin: 0;
  .col-md-5 {
    .row {
      .col-md-2 {
        padding: 0;
        .row {
          margin: 1rem 0;
          .col {
            padding: 0;
            img {
              width: 4rem;
              height: 4rem;
              border: 1px solid #e9ebea;
              cursor: pointer;
            }
          }
        }
      }
      .col-md-10 {
        padding: 0;
        background-color: aqua;
        height: 100%;
        img {
          width: 100%;
          height: 10rem;
        }
      }
    }
  }
}
.activeImage {
  border-color: orange;
}
table {
  width: 100%;
  border-left: none;
  border-right: none;
}
.comment {
  width: 100%;
  text-align: left;
  border-bottom: 1px solid #e9ebea;
  padding: 1rem;
}
</style>