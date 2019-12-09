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
        <button class="btn btn-primary" @click="insertOrder" style="margin-right:0.1rem;">
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
              <select
                @change="updateTempList"
                v-model="orderStatus"
                style="font-size: 14px;"
                class="form-control"
              >
                <option
                  v-for="(status,index) in storeOrderStatusList"
                  :key="index"
                  :value="status.id"
                >{{status.name}}</option>
              </select>
            </div>
            <div class="col-md-8">
              <div class="row">
                <div class="col-md-5">
                  <date-pick v-model="dateFrom" :format="'MM/DD/YYYY'" style="font-size:14px;"></date-pick>
                </div>
                <div class="col-md-1" style="padding: 0.5rem 0 0.5rem 0.6rem;">to</div>
                <div class="col-md-5">
                  <date-pick v-model="dateTo" :format="'MM/DD/YYYY'" style="font-size:14px;"></date-pick>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <button class="btn btn-primary" @click="updateTempList(1)">
            <i class="fa fa-search"></i> Tìm kiếm theo ngày
          </button>
        </div>
        <div class="col-md-3">
          <b-pagination
            style="right:1rem;bottom: -1rem;position:absolute;"
            v-model="currentPage"
            :total-rows="loadTempList.length"
            :per-page="perPage"
            aria-controls="orderTalbe"
          ></b-pagination>
        </div>
      </div>

      <b-table
        id="orderTalbe"
        :busy="storeOrderLoading"
        head-variant="light"
        :filter="inputSearch"
        :fields="fields"
        :items="loadTempList"
        :current-page="currentPage"
        :per-page="perPage"
      >
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>

        <template v-slot:cell(customer)="data">
          <div v-if="data.item.customer">{{data.item.customer.name}}</div>
        </template>

        <template v-slot:cell(employee)="data">
          <div v-if="data.item.employee">{{data.item.employee.name}}</div>
        </template>

        <template v-slot:cell(status)="data">{{data.item.status.name}}</template>

        <template v-slot:cell(total_price)="data">{{fixFormatVND(data.item.total_price)}}đ</template>

        <template v-slot:cell(control)="data">
          <i
            title="Sửa"
            data-toggle="modal"
            data-target="#order_modal"
            @click="setUpdate(data.item)"
            class="fa fa-edit"
            style="margin-right: 1rem;"
          ></i>
        </template>
      </b-table>
      <div
        ref="modal"
        class="modal fade"
        id="order_modal"
        tabindex="-1"
        role="dialog"
        style="margin-top:0;padding:0;"
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Chi tiết đơn hàng</h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div v-if="loadSelected!= {}" class="row">
                <label class="col-md-3">Mã đơn hàng: {{loadSelected.id}}</label>
                <label class="col-md-3">Khách hàng: {{loadSelected.customer.name}}</label>
                <label class="col-md-3">Ngày bán: {{loadSelected.created_at}}</label>
                <label class="col-md-3">Trạng thái: {{loadSelected.status.name}}</label>
              </div>
              <b-table
                small
                bordered
                head-variant="light"
                :items="loadSelected.product_list"
                :fields="fieldsDetailProduct"
              >
                <template v-slot:cell(price)="data">{{fixFormatVND(data.item.price)}}đ</template>
                <template
                  v-slot:cell(total_price)="data"
                >{{fixFormatVND(data.item.price * data.item.pivot.ProductCount)}}đ</template>
              </b-table>

              <label>
                <b>
                  Tổng tiền:
                  <label style="color: red;">{{fixFormatVND(loadSelected.total_price)}}đ</label>
                </b>
              </label>
              <button
                style="margin-left: 1rem"
                class="btn btn-danger"
                v-if="loadSelected.status.id != 1 && loadSelected.status.id != 3"
                data-toggle="collapse"
                data-target="#cancelOrder"
              >Hủy đơn hàng</button>
              <button
                style="position:absolute;right:1rem;"
                v-if="loadSelected.status.id != 1 && loadSelected.status.id != 3"
                class="btn btn-primary"
                @click="confirmOrder"
              >Xác nhận đơn hàng</button>
              <div class="row collapse" id="cancelOrder" style="margin-top: 1rem">
                <div class="col-md-1">
                  <p>
                    <b>Lý do:</b>
                  </p>
                </div>
                <div class="col-md-4">
                  <textarea class="form-control" placeholder="Nhập lý do hủy"></textarea>
                </div>
                <div class="col-md-2">
                  <button @click="cancelOrder" class="btn btn-danger">Xác nhận</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="control" id="controlContainer">
      <div class="row" style="margin: 1rem 0;">
        <div class="col-md-8" style="padding:0;">
          <div>
            <input
              class="form-control"
              style="margin-bottom: 0.5rem;"
              placeholder="thuộc tính sản phẩm"
              v-model="product_id"
              v-on:keyup.enter="addProduct()"
              id="property"
            />
          </div>
          <b-table
            :fields="fieldsOfProduct"
            head-variant="light"
            :items="loadProductList"
            responsive="sm"
            fixed
          >
            <template v-slot:cell(name)="data">{{formatName(data.item.name)}}</template>

            <template v-slot:cell(control)="data">
              <i title="Chi tiết" class="fa fa-eye" aria-hidden="true" style="margin-right: 1rem;"></i>
              <i class="fas fa-trash" @click="removeProduct(data.item)" title="Xóa"></i>
            </template>

            <template v-slot:cell(productCount)="data">
              <input
                @change="calculatePrice()"
                v-model="data.item.productCount"
                class="form-control"
                type="number"
              />
            </template>

            <template v-slot:cell(price)="data">{{fixFormatVND(data.item.price)}}đ</template>
            <template
              v-slot:cell(total_price)="data"
            >{{fixFormatVND(data.item.price * data.item.productCount)}}đ</template>
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
                      v-model="customer_id"
                      @change="checkCustomer"
                      @keyup.enter="checkCustomer"
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        data-toggle="modal"
                        data-target="#login_modal"
                      >Thêm</button>
                      <registerModal :store="true"></registerModal>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <b>Ghi chú</b>
                </div>
                <div class="col-md-8">
                  <textarea v-model="note" class="form-control"></textarea>
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
                  <b>Tổng tiền</b>
                </div>
                <div class="col-md-8" style="padding-left: 28px">
                  <label>{{fixFormatVND(loadTotalPrice)}}</label>đ
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <b>Khách đưa</b>
                </div>
                <div class="col-md-8">
                  <input v-model="customerGive" class="form-control" type="number" />
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <b>Tiền thừa</b>
                </div>
                <div
                  class="col-md-8"
                  style="padding-left: 28px"
                >{{fixFormatVND(customerGive - total_price)}}đ</div>
              </div>
              <div class="row">
                <div class="col">
                  <button class="btn btn-primary save" @click="insertOrder">
                    <i class="fa fa-check"></i> Lưu
                  </button>
                  <button class="btn btn-danger cancel" @click="back()">
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
import registerModal from "../../components/login_modal/Login_modal";
import { CommonService } from "../../service/common.service";
var commonService = new CommonService();
export default {
  data() {
    return {
      fields: [
        { key: "id", label: "Mã đơn hàng" },
        { key: "customer", label: "Tên khách hàng" },
        { key: "created_at", label: "Ngày bán", sortable: true },
        { key: "status", label: "Trạng thái" },
        { key: "total_price", label: "Tổng tiền" },
        { key: "employee.name", label: "Tên nhân viên" },
        { key: "note", label: "Ghi chú" },
        { key: "control", label: "" }
      ],
      fieldsOfProduct: [
        { key: "id", label: "Mã sản phẩm" },
        { key: "name", label: "Sản phẩm" },
        { key: "productCount", label: "Số lượng" },
        { key: "price", label: "Giá" },
        { key: "total_price", label: "Thành tiền" },
        { key: "control", label: "" }
      ],
      fieldsDetailProduct: [
        { key: "id", label: "Mã sản phẩm" },
        { key: "name", label: "Sản phẩm" },
        { key: "pivot.ProductCount", label: "Số lượng" },
        { key: "price", label: "Giá" },
        { key: "total_price", label: "Thành tiền" }
      ],
      note: "",
      customerGive: 0,
      customer_id: "",
      customer_check: false,
      control: false,
      insert: true,
      currentPage: 1,
      perPage: 5,
      inputSearch: "",
      selectedForUpdate: {},
      dateFrom: "",
      dateTo: "",
      product_id: "",
      productList: [],
      total_price: 0,
      orderStatus: "",
      tempList: [],
      selected: {
        customer: {},
        employee: {},
        status: {},
        product_list: []
      }
    };
  },
  components: { DatePick, registerModal },
  props: {},
  watch: {},
  methods: {
    confirmOrder() {
      let vm = this;
      this.$swal({
        type: "question",
        title: "Thông báo",
        text: "Bạn muốn xác nhận đơn hàng này ?",
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          vm.selected.productList = JSON.stringify(vm.selected.product_list);
          vm.$store
            .dispatch("confirmStoreOrder", vm.selected)
            .then(response => {
              if (response.data.msg) {
                let type = "error";
                vm.$store.dispatch("getStoreOrderList").then(response => {
                  commonService.checkErrorToken(response, this);
                });
                if (response.data.RequestSuccess) {
                  type = "success";
                  this.updateTempList();
                }
                this.$swal({
                  type: type,
                  title: "Thông báo",
                  text: response.data.msg
                });
              }
            });
        }
      });
    },
    cancelOrder() {
      let vm = this;
      this.$swal({
        type: "question",
        title: "Thông báo",
        text: "Bạn muốn hủy đơn hàng này ?",
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          vm.$store.dispatch("cancelStoreOrder", vm.selected).then(response => {
            if (response.data.msg) {
              let type = "error";
              vm.$store.dispatch("getStoreOrderList").then(response => {
                commonService.checkErrorToken(response, this);
              });
              if (response.data.RequestSuccess) {
                type = "success";
                this.updateTempList();
              }
              this.$swal({
                type: type,
                title: "Thông báo",
                text: response.data.msg
              });
            }
          });
        }
      });
    },
    removeProduct(product) {
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].id == product.id) {
          this.productList.splice(i, 1);
          return 0;
        }
      }
    },
    fixFormatVND(nStr) {
      return commonService.fixFormatVND(nStr);
    },
    setInsert() {
      this.insert = true;
      this.control = true;
    },
    setUpdate(order) {
      console.log(order);
      this.selected = order;
    },
    save() {
      this.back();
    },
    back() {
      this.control = false;
      this.productList = [];
      this.total_price = 0;
      this.customerGive = 0;
      this.customer_id = 0;
      this.customer_check = false;
    },
    clearDate() {
      this.date = "";
    },
    formatName(name) {
      if (name.length > 30) return name.slice(0, 30) + "...";
      else return name;
    },
    isExist(product_id) {
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].id == product_id) {
          return true;
        }
      }
      return false;
    },
    addProduct() {
      if (!this.isExist(this.product_id)) {
        let temp = this.storeProductList;
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].id == this.product_id) {
            temp[i].productCount = 1;
            this.productList.push(temp[i]);
            this.calculatePrice();
            return 0;
          }
        }
        this.$swal({
          title: "Thông báo",
          text: "Mã sản phẩm không tồn tại"
        });
      } else {
        this.$swal({
          title: "Thông báo",
          text: "Sản phẩm đã được thêm vào danh sách"
        });
      }
    },
    calculatePrice() {
      let price = 0;
      for (let i = 0; i < this.productList.length; i++) {
        price += this.productList[i].price * this.productList[i].productCount;
      }
      this.total_price = price;
    },
    checkCustomer() {
      for (let i = 0; i < this.storeCustomerList.length; i++) {
        if (this.storeCustomerList[i].id == this.customer_id) {
          this.$swal({
            title: "Thông báo",
            text: "Xác nhận khách hàng thành công"
          });
          this.customer_check = true;
          return 0;
        }
      }
      this.$swal({
        title: "Thông báo",
        text: "Không tìm thấy khách hàng"
      });
      this.customer_check = false;
    },
    insertOrder() {
      this.$swal({
        title: "Thông báo",
        text: "Bạn muốn nhập đơn hàng ?",
        showCancelButton: true
      }).then(result => this.handleInsertOrder(result));
    },
    handleInsertOrder(result) {
      if (result.value) {
        if (
          this.productList.length > 0 &&
          this.customerGive > 0 &&
          this.total_price > 0 &&
          this.customerGive >= this.total_price &&
          this.customer_check
        ) {
          let order = {
            total_price: this.total_price,
            customer_id: this.customer_id,
            note: this.note,
            productList: JSON.stringify(this.productList)
          };
          this.$store
            .dispatch("insertStoreOrder", order)
            .then(response => this.afterInsertOrder(response));
        } else {
          this.$swal({
            title: "Thông báo",
            text: "Nhập thông tin sai"
          });
        }
      }
    },
    afterInsertOrder(response) {
      if (commonService.checkErrorToken(response, this)) {
        this.$swal({
          title: "Thông báo",
          text: response.data.msg
        });
        if (response.data.RequestSuccess) {
          this.control = false;
          this.customer_id = "";
          this.customer_check = false;
          this.productList = [];
          this.total_price = 0;
          this.note = "";
        }
      }
      /* 
      if (response.data.errorToken) {
        this.$swal({
          title: "Error",
          text: response.data.errorToken
        });
      } else {
        this.$swal({
          title: "Thông báo",
          text: response.data.msg
        });
        if (response.data.RequestSuccess) {
          this.control = false;
          this.customer_id = "";
          this.customer_check = false;
          this.productList = [];
          this.total_price = 0;
          this.note = "";
        }
      }
      */
    },
    updateTempList(flag) {
      let temp = [];
      for (let i = 0; i < this.storeOrderList.length; i++) {
        if (this.storeOrderList[i].status.id == this.orderStatus) {
          temp.push(this.storeOrderList[i]);
        }
      }
      this.tempList = temp;
      console.log(this.tempList);
      if (flag == 1) this.updateForDate();
    },
    updateForDate() {
      let dateFrom = new Date(this.dateFrom).getTime();
      let dateTo = new Date(this.dateTo).getTime();
      if (dateFrom > dateTo) {
        this.$swal({
          title: "Thông báo",
          text: "Chọn ngày sai"
        });
      } else {
        let arr = [];
        for (let i = 0; i < this.tempList.length; i++) {
          let orderDate = new Date(this.tempList[i].created_at).getTime();
          if (dateFrom <= orderDate && dateTo >= orderDate) {
            arr.push(this.tempList[i]);
          }
        }
        this.tempList = arr;
      }
    }
  },
  computed: {
    ...mapGetters({
      storeProductList: "storeProductList",
      storeProductLoading: "storeProductLoading",
      storeOrderList: "storeOrderList",
      storeOrderLoading: "storeOrderLoading",
      storeCustomerList: "storeCustomerList",
      storeCustomerLoading: "storeCustomerLoading",
      storeOrderStatusList: "storeOrderStatusList"
    }),
    loadProductList() {
      return this.productList;
    },
    loadTotalPrice() {
      return this.total_price;
    },
    loadTempList() {
      console.log("change");
      return this.tempList;
    },
    loadSelected() {
      return this.selected;
    }
  },
  created() {
    this.$store
      .dispatch("getStoreProductListFromProductTypePage")
      .then(response => {
        commonService.checkErrorToken(response, this);
      });
    this.$store.dispatch("getStoreOrderList").then(response => {
      commonService.checkErrorToken(response, this);
    });
    this.$store.dispatch("getCustomerList").then(response => {
      commonService.checkErrorToken(response, this);
    });
    this.$store.dispatch("getOrderStatusList").then(response => {
      if (commonService.checkErrorToken(response, this)) {
        if (response.data.list) {
          this.orderStatus = response.data.list[0].id;
          this.updateTempList();
        }
      }
    });
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