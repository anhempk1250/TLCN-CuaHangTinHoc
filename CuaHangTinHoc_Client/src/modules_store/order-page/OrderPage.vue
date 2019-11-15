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

      <table class="table" id="categoryTable">
        <thead class="thead-light" style="font-size: 14px;">
          <tr class="text-center">
            <th style="width: 15%;">Mã đơn hàng</th>
            <th style="width: 15%;">Ngày bán</th>
            <th style="width: 10%;">Nhân viên</th>
            <th style="width: 15%">Khách hàng</th>
            <th style="width: 15%;">Trạng thái</th>
            <th style="width: 15%">Tổng tiền</th>
            <th style="width: 15%"></th>
          </tr>
        </thead>
        <tbody style="font-size: 14px;">
          <tr class="text-center">
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>
              <i
                title="Sửa"
                data-toggle="modal"
                data-target="#model_category"
                @click="setUpdate()"
                class="fas fa-edit"
                style="margin-right: 1rem;"
              ></i>
              <i title="Xóa" class="fas fa-trash"></i>
            </td>
          </tr>
        </tbody>
      </table>

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
              placeholder="thuộc tính sản phẩm"
              v-model="inputProperty"
              v-on:keyup.enter="AddProperty()"
              id="property"
            />
          </div>
          <table class="table fixed_header" style="width: 100%;">
            <thead class="thead-light"></thead>
            <tbody id="myTbody" style="width: 100%;">
              <tr class="text-center thead-light">
                <th style="width: 10%;">STT</th>
                <th style="width: 18%;">Mã sản phẩm</th>
                <th style="width: 25%;">Tên sản phẩm</th>
                <th style="width: 10%">Số lượng</th>
                <th style="width: 10%">Giá bán</th>
                <th style="width: 12%">Thành tiền</th>
                <th style="width: 10%;"></th>
              </tr>
              <tr class="text-center">
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
              </tr>
            </tbody>
          </table>
          <div
            class="alert alert-success"
            role="alert"
          >Gõ mã hoặc tên sản phẩm vào hộp tìm kiếm để thêm hàng vào đơn hàng</div>
        </div>

        <div class="col-md-4">
          <RightMenu />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import DatePick from "../../../node_modules/vue-date-pick/src/vueDatePick.vue";
import RightMenu from "../../components/store_order_right_menu/StoreOrderRightMenu.vue";
export default {
  data() {
    return {
      control: false,
      insert: true,
      currentPage: 1,
      selected: [],
      inputSearch: "",
      selectedForUpdate: {},
      dateFrom: "2019.01.01",
      dateTo: "2019.01.01",
      productList: []
    };
  },
  components: { DatePick, RightMenu },
  props: {},
  watch: {},
  methods: {
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
    save() {
      // save
      this.back();
    },
    back() {
      this.control = false;
    },
    clearDate() {
      this.date = "";
    },
    AddProperty() {
      if (this.checkSpecialCharacter()) {
        for (let i = 0; i < this.category.propertyList.length; i++) {
          if (this.category.propertyList[i] == this.inputProperty) {
            alert("Thuộc tính này đã được thêm vào");
            return 0;
          }
        }
        this.category.propertyList.push(this.inputProperty);
        this.inputProperty = "";
        let myTbody = document.getElementById("myTbody");
        myTbody.scrollTop = myTbody.scrollHeight;
        //console.log(myTbody.scrollHeight);
      } else {
        alert("Thuộc tính không được chứa ký tự đặt biệt hoặc rỗng");
        return "";
      }
    },
    DeleteProperty(property) {
      for (let i = 0; i < this.category.propertyList.length; i++) {
        if (this.category.propertyList[i] == property) {
          this.category.propertyList.splice(i, 1);
          break;
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      storeProductList: "storeProductList",
      storeProductLoading: "storeProductLoading"
    }),
    loadProductList() {
      return this.productList;
    }
  },
  created() {
    this.$store.dispatch("getStoreProductList");
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
</style>