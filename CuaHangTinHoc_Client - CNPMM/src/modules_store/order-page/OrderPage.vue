<template>
  <div id="orderPage">
    <div class="row" style="background-color: #e9ebea;margin:0;padding: 1rem;">
      <h5 class="text-left" style="margin-top:0.5rem;color:#307ECC">
        <p v-if="!control">Danh sách đơn hàng</p>
        <p v-if="control && insert">Tạo đơn hàng</p>
        <p v-else-if="control && !insert">Chỉnh sửa đơn hàng</p>
      </h5>
      <button
        v-if="!control"
        class="btn btn-primary"
        style="position: absolute;right: 2rem;"
        @click="setInsert()"
      >
        <i class="fas fa-plus"></i> Thêm mới đơn hàng
      </button>
      <div v-if="control" style="position: absolute;right: 2rem;">
        <button class="btn btn-primary" @click="save()" style="margin-right:0.1rem;">
          <i class="fa fa-check"></i> Lưu
        </button>
        <button class="btn btn-danger" @click="back()">
          <i class="fa fa-arrow-left"></i> Trở về
        </button>
      </div>
    </div>

    <div v-if="!control" id="manageContainer">
      <div class="row" style="margin: 1rem 0;">
        <div class="col-md-6" style="padding: 0;">
          <input
            id="categoryInputSearch"
            class="form-control row"
            style="width: 100%;margin:0;margin-bottom: 0.5rem;"
            placeholder="Tìm Kiếm"
            v-model="inputSearch"
          />
          <div class="row">
            <div class="col-md-4">
              <select style="font-size: 14px;" class="form-control">
                <option>Thành công</option>
                <option>Chờ xác nhận</option>
                <option>Trả lại</option>
              </select>
            </div>
            <div class="col-md-8">
              <div class="row">
                <div class="col-md-5">
                  <date-pick v-model="dateFrom" :format="'YYYY.MM.DD'" style="font-size:14px;"></date-pick>
                </div>
                <div class="col-md-1" style="padding: 0.5rem 0 0.5rem 0.6rem;">to</div>
                <div class="col-md-5">
                  <date-pick v-model="dateTo" :format="'YYYY.MM.DD'" style="font-size:14px;"></date-pick>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <button class="btn btn-primary">
            <i class="fa fa-search"></i> Tìm kiếm
          </button>
        </div>
        <div class="col-md-3">
          <b-pagination
            style="right:1rem;bottom: -1rem;position:absolute;"
            v-model="currentPage"
            :total-rows="2"
            :per-page="1"
            aria-controls="my-table"
          ></b-pagination>
        </div>
      </div>

      <b-table :busy="storeOrderLoading" :fields="fields" :items="storeOrderList">
        <template v-slot:cell(_id)="row">{{formatID(row.item._id)}}</template>
      </b-table>

      <div id="control">
        <button class="btn btn-danger">
          <i class="fas fa-trash"></i> Xóa
        </button>
        <button class="btn btn-info">Chọn tất cả</button>
        <button class="btn btn-dark">
          <i class="fas fa-window-close"></i> Hủy
        </button>
      </div>
    </div>

    <div v-if="control" id="controlContainer">
      <div class="row" style="margin: 1rem 0;">
        <div class="col-md-8" style="padding:0;">
          <div>
            <input
              class="form-control"
              style="margin-bottom: 0.5rem;"
              placeholder="Nhập mã sản phẩm"
              v-model="productId"
              v-on:keyup.enter="chooseProduct"
              id="property"
            />
          </div>
          <b-table :fields="fieldsProduct" :items="loadProductList">
            <template v-slot:cell(name)="row">{{formatName(row.item.name)}}</template>

            <template v-slot:cell(price)="row">{{fixFormatVND(row.item.price)}}đ</template>

            <template v-slot:cell(productCounts)="row">
              <input class="form-control" type="number" v-model="row.item.productCounts" />
            </template>

            <template v-slot:cell(total_price)="row">
              <p
                v-if="row.item.productCounts"
              >{{fixFormatVND(row.item.productCounts * row.item.price)}}đ</p>
              <p v-else>{{fixFormatVND(row.item.price)}}đ</p>
            </template>
            <template v-slot:cell(action)>
              <i title="Chi tiết" class="fa fa-eye" aria-hidden="true" style="margin-right: 1rem;"></i>
              <i title="Xóa" class="fa fa-trash" aria-hidden="true"></i>
            </template>
          </b-table>
          <div
            class="alert alert-success"
            role="alert"
          >Gõ mã hoặc tên sản phẩm vào hộp tìm kiếm để thêm hàng vào đơn hàng</div>
        </div>

        <div class="col-md-4">
          <div id="rightMenu">
            <div class="customerContainer myfont">
              <div class="row">
                <div class="col-md-4">
                  <b>Khách hàng</b>
                </div>
                <div class="col-md-8">
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Tìm khách hàng"
                      aria-describedby="button-addon2"
                      v-model="customerEmail"
                      @keyup.enter="findCustomer()"
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        @click="findCustomer()"
                      >Thêm</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <b>Ghi chú</b>
                </div>
                <div class="col-md-8">
                  <textarea class="form-control"></textarea>
                </div>
              </div>
            </div>
            <div class="infoPayment myfont">
              <h5>
                <i class="fa fa-info-circle blue"></i> Thông tin thanh toán
              </h5>
              <hr />
              <div class="row">
                <div class="col-md-4">
                  <b>Hình thức</b>
                </div>
                <div class="col-md-8">
                  <div class="row">
                    <div class="col">
                      <label>
                        <input type="radio" name="payment" /> Tiền mặt
                      </label>
                    </div>
                    <div class="col">
                      <label>
                        <input type="radio" name="payment" /> Thẻ
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <button
                    style="position: relative;width:100%;"
                    @click="total_price"
                    class="btn btn-warning"
                  >Tính tiền</button>
                </div>
              </div>
              <div v-if="false" class="row">
                <div class="col-md-4">
                  <b>Tiền hàng</b>
                </div>
                <div class="col-md-8">
                  <label>0</label>
                </div>
              </div>

              <div v-if="false" class="row">
                <div class="col-md-4">
                  <b>Mã giảm giá</b>
                </div>
                <div class="col-md-8">
                  <input class="form-control" type="number" />
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <b>Tổng tiền</b>
                </div>
                <div class="col-md-8">
                  <label>{{fixFormatVND(loadTotalPrice)}}đ</label>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <b>Khách đưa</b>
                </div>
                <div class="col-md-8">
                  <input v-model="customer_give" class="form-control" type="number" />
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <b>Tiền thừa</b>
                </div>
                <div class="col-md-8">{{fixFormatVND(customer_give - loadTotalPrice)}}đ</div>
              </div>
              <div class="row">
                <div class="col">
                  <button class="btn btn-primary save">
                    <i class="fa fa-check"></i> Lưu
                  </button>
                  <button class="btn btn-danger cancel">
                    <i class="fa fa-arrow-left"></i> Trở về
                  </button>
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
import { mapGetters } from "vuex";
import DatePick from "../../../node_modules/vue-date-pick/src/vueDatePick.vue";
export default {
  data() {
    return {
      order_total_price: 0,
      customer_give: 0,
      customerEmail: "",
      customerObId: "",
      productId: "",
      control: false,
      insert: true,
      currentPage: 1,
      selected: [],
      inputSearch: "",
      selectedForUpdate: {},
      dateFrom: "2019.01.01",
      dateTo: "2019.01.01",
      productList: [],
      fields: [
        { key: "_id", label: "Mã đơn hàng" },
        { key: "time", label: "Thời gian" },
        { key: "employee.name", label: "Nhân viên" },
        { key: "customer.name", label: "Khách hàng" },
        { key: "order_status_id.name", label: "Trạng thái" },
        { key: "total_price", label: "Tổng tiền" },
        { key: "action", label: "" }
      ],
      fieldsProduct: [
        { key: "id", label: "Mã sản phẩm" },
        { key: "name", label: "Tên sản phẩm" },
        { key: "productCounts", label: "Số lượng" },
        { key: "price", label: "Giá tiền" },
        { key: "total_price", label: "Tổng tiền" },
        { key: "action", label: "" }
      ]
    };
  },
  components: { DatePick },
  props: {},
  watch: {},
  methods: {
    formatID(id) {
      return "order_" + id.slice(id.length - 6, id.length);
    },
    save() {
      if (
        this.productList.length == 0 ||
        this.order_total_price <= 0 ||
        this.customer_give <= 0 ||
        this.customerEmail == ""
      ) {
        this.$swal.fire({
          title: "Error",
          text: "Thông tin điều vào sai"
        });
      } else {
        let order = {
          customer: this.customerObId,
          total_price: this.order_total_price,
          product_order: this.productListToString(this.productList)
        };
        this.$store.dispatch("insertStoreOrder", order);
      }
    },
    productListToString(productList) {
      let str = "";
      for (let i = 0; i < productList.length; i++) {
        if (i != productList.length - 1) {
          str += productList[i]._id + "___";
        } else str += productList[i]._id;
      }
      return str;
    },
    total_price() {
      this.order_total_price = 0;
      for (let i = 0; i < this.productList.length; i++) {
        this.order_total_price +=
          this.productList[i].productCounts * this.productList[i].price;
      }
    },
    findCustomer() {
      for (let i = 0; i < this.storeCustomerList.length; i++) {
        if (this.customerEmail == this.storeCustomerList[i].email) {
          this.$swal.fire({
            title: "Thông báo",
            text: "Xác thực thành công"
          });
          this.customerObId = this.storeCustomerList[i]._id;
          return 0;
        }
      }
      this.$swal.fire({
        title: "Thông báo",
        text: "Không tìm thấy khách hàng"
      });
      this.customerEmail = "";
      this.customerObId = "";
    },
    chooseProduct() {
      for (let i = 0; i < this.storeProductList.length; i++) {
        if (this.productId == this.storeProductList[i].id) {
          this.productList.push(this.storeProductList[i]);
          this.productId = "";
          return 0;
        }
      }
      this.$swal.fire({
        title: "Thông báo",
        text: "Không tìm thấy sản phẩm"
      });
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
    formatName(name) {
      if (name) {
        if (name.length >= 30) {
          return (name = name.slice(0, 30)) + "...";
        } else {
          return name;
        }
      }
    },
    checkItem(category) {
      let index = this.selected.indexOf(category);
      if (index > -1) this.selected.splice(index, 1);
      else this.selected.push(category);
    },
    formatForSearch(category, inputSearch) {
      let arr = Object.values(category);
      //console.log(arr, "arr");
      let string = "";
      for (let i = 0; i < arr.length; i++) {
        string += arr[i].toString().toLowerCase();
      }
      if (!string.includes(inputSearch.toLowerCase())) return "display: none;";
      return "";
    },
    cancel() {
      this.selected = [];
    },
    setInsert() {
      this.insert = true;
      this.control = true;
    },
    setUpdate() {
      this.insert = false;
      this.control = true;
    },
    selectAll() {
      this.selected = this.categoryList;
    },
    back() {
      this.control = false;
    },
    clearDate() {
      this.date = "";
    }
  },
  computed: {
    ...mapGetters({
      storeProductList: "storeProductList",
      storeProductLoading: "storeProductLoading",
      storeOrderList: "storeOrderList",
      storeOrderLoading: "storeOrderLoading",
      storeCustomerList: "storeCustomerList"
    }),
    loadProductList() {
      console.log(this.productList);
      return this.productList;
    },
    loadTotalPrice() {
      return this.order_total_price;
    }
  },
  created() {
    this.$store.dispatch("getStoreProductList");
    this.$store.dispatch("getStoreOrderList");
    this.$store.dispatch("getStoreCustomerList");
  }
};
</script>
<style lang="scss" scoped>
.active {
  background-color: #95d305;
}
td {
  i {
    cursor: pointer;
  }
}
#control {
  button {
    margin: 0 0.1rem;
  }
}
.input {
  div {
    margin: 1rem 0;
  }
}
img {
  width: 150px;
  height: 150px;
}

#controlContainer {
  .fixed_header {
    width: 100%;
  }

  .fixed_header tbody {
    display: block;
    width: 100%;
    overflow: auto;
    height: 350px;
    word-break: break-word;
  }

  .fixed_header thead tr {
    display: block;
    width: 100%;
    background-color: yellowgreen;
    th {
      width: 100%;
      background-color: yellow;
    }
  }

  .fixed_header thead {
    width: 100%;
  }

  .fixed_header th,
  .fixed_header td {
    padding: 5px;
  }
}
#orderPage {
  font-family: sans-serif;
  font-size: 14px;
}

.myfont {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
}
.col-md-4 {
  b {
    margin-left: 0.5rem;
  }
}

.customerContainer {
  margin-bottom: 2rem;
}
.infoPayment {
  h5 {
    color: blue;
  }
  .row {
    margin-bottom: 0.5rem;
  }
  button {
    position: absolute;
    margin-top: 1rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .save {
    right: 6rem;
  }
  .cancel {
    right: 0;
  }
}
</style>