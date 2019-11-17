<template>
  <div style="background-color: #e9ebea" v-if="!productDetailsLoading">
    <div class="row">
      <div class="col-md-5">
        <div class="row">
          <div class="col-md-2">
            <div class="row" v-for="(image,index) in productDetailsObject.images" :key="index">
              <div class="col">
                <span>
                  <img :src="image.image_link" v-on:click="changeImage(index)" />
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-10">
            <span>
              <img :src="loadImage" alt="image" />
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="row">
          <div class="col">
            <br />
            <h4 style="text-align: left;font-weight: 450;">{{productDetailsObject.Name}}</h4>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <hr />
            <h4 style="text-align: left;font-weight: 450;">
              Giá :
              <span style="color: red;">{{fixFormatVND(productDetailsObject.Price)}} đ</span>
            </h4>
          </div>
        </div>
        <div class="row" style="background-color:white">
          <div class="col">
            <hr />
            <h4 style="text-align: left;font-weight: 450;">Detail</h4>
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
                  style="margin-top:0.8rem;"
                  class="btn btn-danger btn-lg"
                  v-on:click="test()"
                >Cho vào giỏ hàng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top: 3rem">
      <div class="col">
        <div class="container">
          <table class="table text-left">
            <thead>
              <tr style="font-size: 20px">
                <th class="text-center" style="width: 10%">STT</th>
                <th>Mô tả sản phẩm</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(des,index) in formatDescription" :key="index">
                <td class="text-center"><strong>{{index +1 }}</strong></td>
                <td>{{des}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      indexImage: 0,
      productCount: 1
    };
  },
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
    }
  },
  computed: {
    loadImage() {
      if (this.productDetailsObject != null && this.productDetailsObject != {})
        return this.productDetailsObject.image_link; //this.productDetailsObject.images[this.indexImage].image_link;
      return 0;
    },
    loadProductCount() {
      return this.productCount;
    },
    ...mapGetters({
      productDetailsObject: "productDetailsObject",
      productDetailsLoading: "productDetailsLoading"
    }),
    formatDescription() {
      let arr = this.productDetailsObject.Description.split("___");
      return arr;
    }
  },
  created() {
    this.$store.dispatch("getProductDetail", this.$route.params.id);
    console.log(this.productDetailsObject, "here");
  }
};
</script>
<style lang="scss" scoped>
.row {
  background-color: white;
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
          height: 23rem;
        }
      }
    }
  }
}
.activeImage {
  border-color: orange;
}
</style>