<template>
  <div style="background-color: #e9ebea">
    <div class="row">
      <div class="col-md-5">
        <div class="row">
          <div class="col-md-2">
            <div class="row" v-for="(image,index) in product.imageList" :key="index">
              <div class="col">
                <span>
                  <img :src="image.url" v-on:click="changeImage(index)" />
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
            <br/>
            <h4 style="text-align: left;font-weight: 450;">
              Laptop HP Probook 440 G6 (Intel Core I3 - 8145U/ 4GB RAM DDR4/ 256GB SSD/ 14"
              FHD/WIN10 HOME/Pike silver aluminum-8GV28PA) - Hàng Chính Hãng
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <hr />
            <h4 style="text-align: left;font-weight: 450;">
              Giá :
              <span style="color: red;">13.290.000 ₫</span>
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
                <button style="margin-top:0.8rem;" class="btn btn-danger btn-lg">Cho vào giỏ hàng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top: 5rem">
      <div class="col">
        <div class="container">
          <table class="table table-bordered ">
            <thead>
              <tr>
                <th style="width: 20%;">Properties</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Property 1</td>
                <td>abc</td>
              </tr>
              <tr>
                <td>Property 2</td>
                <td>abc</td>
              </tr>
              <tr>
                <td>Property 3</td>
                <td>abc</td>
              </tr>
              <tr>
                <td>Property 4</td>
                <td>abc</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      indexImage: 1,
      productCount: 1,
      product: {
        imageList: [
          {
            id: 1,
            url:
              "https://salt.tikicdn.com/cache/w1200/ts/product/b9/d1/18/53066712cb49c0af219e351d4feb89e5.jpg"
          },
          {
            id: 2,
            url:
              "https://salt.tikicdn.com/cache/w1200/ts/product/f3/a1/2f/daef43879134e1a0ed37dfa76f102aca.jpg"
          },
          {
            id: 3,
            url:
              "https://salt.tikicdn.com/cache/w1200/ts/product/51/bb/73/abd969aa4d140c2f8709c329a484c752.jpg"
          },
          {
            id: 4,
            url:
              "https://salt.tikicdn.com/cache/w1200/ts/product/f6/61/5e/f9604f2af419c78003a93aee7f2e1586.jpg"
          }
        ],
        count: 3
      }
    };
  },
  methods: {
    changeImage(index) {
      this.indexImage = index;
    },
    plusProduct() {
      if (this.productCount == this.product.count)
        alert(
          "Số lượng sản phẩm còn lại " +
            this.product.count +
            " không thểm tăng thêm !"
        );
      else this.productCount = this.productCount + 1;
    },
    minusProduct() {
      if (this.productCount == 1)
        alert("Số lượng sản phẩm không được phép nhỏ hơn 1 !");
      else this.productCount = this.productCount - 1;
    }
  },
  computed: {
    loadImage() {
      return this.product.imageList[this.indexImage].url;
    },
    loadProductCount() {
      return this.productCount;
    }
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
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.activeImage {
  border-color: orange;
}

.container {
  background-color: #e9ebea;
}
</style>