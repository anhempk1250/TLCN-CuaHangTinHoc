<template>
  <div>
    <div class="row" style="background-color: #e9ebea;margin:0;padding: 1rem;">
      <h5 class="text-left" style="margin-top:0.5rem;color:#307ECC">
        <p v-if="!control">Danh sách sản phẩm</p>
        <p v-if="control && insert">Tạo sản phẩm</p>
        <p v-else-if="control && !insert">Chỉnh sửa sản phẩm</p>
      </h5>
      <button
        v-if="!control"
        class="btn btn-primary"
        style="position: absolute;right: 2rem;"
        @click="setInsert()"
      >
        <i class="fa fa-plus"></i> Thêm mới sản phẩm
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
                <option>Đang kinh doanh</option>
                <option>Ngừng kinh doanh</option>
                <option>Đã xóa</option>
              </select>
            </div>
            <div class="col-md-4">
              <select style="font-size: 14px;" class="form-control">
                <option>-- Danh Mục --</option>
                <option>ABC</option>
                <option>XYZ</option>
              </select>
            </div>

            <div class="col-md-4">
              <select style="font-size: 14px;" class="form-control">
                <option>-- Nhà Sản Xuất --</option>
                <option>ABC</option>
                <option>XYZ</option>
              </select>
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
            v-if="storeProductList"
            v-model="currentPage"
            :total-rows="storeProductList.length"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </div>
      </div>

      <b-table
        v-if="storeProductList"
        select-mode="multi"
        style="font-size: 14px;"
        head-variant="light"
        :busy="storeProductLoading"
        :items="storeProductList"
        :current-page="currentPage"
        :per-page="perPage"
        :fields="fields"
        :filter="inputSearch"
        sort-desc.sync="true"
        sort-by="name"
      >
        <template v-slot:cell(id)="row">
          <p style="width:100%;word-break: break-word;">{{row.item.id + "abcyxz"}}</p>
        </template>
        <template v-slot:cell(Name)="row">
          <p style="width:100%;word-break: break-word;">{{formatName(row.item.Name)}}</p>
        </template>
        <template v-slot:cell(Description)="row">
          <p
            style="width:100%;word-break: break-word;"
            v-html="formatProperty(row.item.Description)"
          ></p>
        </template>
        <template v-slot:cell(Price)="row">{{fixFormatVND(row.item.Price)}}đ</template>
        <template v-slot:cell(control)="data">
          <i title="Chi tiết" class="fa fa-eye" style="margin-right: 1rem;"></i>
          <i
            title="Sửa"
            @click="setUpdate(data.item)"
            class="fa fa-edit"
            style="margin-right: 1rem;"
          ></i>
          <i title="Xóa" class="fa fa-trash" @click="deleteProduct(data.item)"></i>
        </template>
      </b-table>

      <div id="control">
        <button class="btn btn-danger">
          <i class="fa fa-trash"></i> Xóa
        </button>
        <button class="btn btn-info">Chọn tất cả</button>
        <button class="btn btn-dark">
          <i class="fa fa-window-close"></i> Hủy
        </button>
      </div>
    </div>

    <div v-if="control" id="controlContainer">
      <div class="row" style="margin: 1rem 0;">
        <div class="col-md-4">
          <div class="input">
            <div>
              <label for="dm">Chọn danh mục:</label>
              <select id="dm" ref="selectCetegory" class="form-control">
                <option v-for="(category,index) in categoryList" :key="index">{{category.name}}</option>
              </select>
            </div>

            <div>
              <label for="id">Mã sản phẩm:</label>
              <input id="id" v-model="selected.id" class="form-control" placeholder="Nhập mã sản phẩm" />
            </div>

            <div>
              <label for="name">Tên sản phẩm:</label>
              <input id="name" v-model="selected.Name" class="form-control" placeholder="Nhập tên sản phẩm" />
            </div>

            <div>
              <label for="count">Số lượng:</label>
              <input id="count" v-model="selected.productCount" class="form-control" placeholder="Nhập tên sản phẩm" />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="input">
            <div>
              <label for="lsp">Loại sản phẩm:</label>
              <br />
              <select class="form-control">
                <option v-for="(type, index) in storeProductTypeList" :key="index">{{type.name}}</option>
              </select>
            </div>

            <div>
              <label for="nxs">Nhà sản xuất:</label>
              <select id="nxs" class="form-control">
                <option>ABC</option>
                <option>123</option>
              </select>
            </div>
            <div class="row">
              <div class="col-md-6" style="margin:0;padding-left:0;">
                <label>Giá vốn :</label>
                <input class="form-control" placeholder="Giá vốn" />
              </div>
              <div class="col-md-6" style="margin:0;padding-right:0;">
                <label>Giá bán :</label>
                <input class="form-control" placeholder="Giá bán" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="input">
            <div class="row">
              <p>Chọn tối đa 4 tấm hình :</p>
              <input type="file" />
            </div>
            <div class="row">
              <div class="col-md-6">
                <img src="#" alt="image" />
              </div>
              <div class="col-md-6">
                <img src="#" alt="image" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <img src="#" alt="image" />
              </div>
              <div class="col-md-6">
                <img src="#" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin:0;">
        <div class="input col-md-12">
          <div>
            <label>
              <h3>Các thuộc tính của sản phẩm</h3>
            </label>
            <table class="table" style="background-color: white;">
              <thead class="thead-dark text-center">
                <tr>
                  <th style="width:10%;">STT</th>
                  <th style="width:35%;">Tên thuộc tính</th>
                  <th style="width:55%;">Giá trị</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="(index) in 10" :key="index">
                  <td style="padding-top:1.1rem">1</td>
                  <td style="padding-top:1.1rem">abc</td>
                  <td>
                    <input class="form-control" />
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="control" style="position: absolute;right: 2rem;">
              <button class="btn btn-primary" @click="save()" style="margin-right:0.1rem;">
                <i class="fa fa-check"></i> Lưu
              </button>
              <button class="btn btn-danger" @click="back()">
                <i class="fa fa-arrow-left"></i> Trở về
              </button>
            </div>
          </div>
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
      control: false,
      insert: true,
      currentPage: 1,
      selected: {},
      inputSearch: "",
      perPage: 5,
      fields: [
        {
          key: "id",
          label: "Mã sản phẩm",
          formatter: value => {
            return "abc" + value;
          }
        },
        { key: "Name", label: "Tên sản phẩm" },
        { key: "Description", label: "Mô tả" },
        { key: "product_category_id.name", label: "Danh mục" },
        { key: "productCount", label: "Số lượng" },
        { key: "Price", label: "Giá tiền" },
        { key: "control", label: "" }
      ],
      product: {}
    };
  },
  props: {},
  watch: {},
  methods: {
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
    formatProperty(property) {
      if (property) {
        let temp = property;
        let arr = temp.split("___");
        let str = "";
        arr.forEach(function(item) {
          if (item.length >= 30) {
            item = "_ " + item.slice(0, 30) + "..." + "<br><br>";
          } else {
            item = "_ " + item + "<br><br>";
          }
          str += item;
        });
        return str;
      }
    },
    formatName(name) {
      if (name.length >= 30) {
        return (name = name.slice(0, 30)) + "...";
      } else {
        return name;
      }
    },
    checkItem(category) {
      let index = this.selected.indexOf(category);
      if (index > -1) this.selected.splice(index, 1);
      else this.selected.push(category);
    },
    cancel() {
      this.selected = [];
    },
    setInsert() {
      this.insert = true;
      this.control = true;
    },
    setUpdate(product) {
      this.insert = false;
      this.control = true;
      this.selected = product;
    },
    save() {
      // save
      this.back();
    },
    back() {
      this.control = false;
    },
    deleteProduct() {
      console.log("delete");
    }
  },
  computed: {
    ...mapGetters({
      storeProductList: "storeProductList",
      storeProductLoading: "storeProductLoading",
      categoryList: "storeCategoryList",
      storeProduct: "storeProduct",
      storeProductTypeList: "storeProductTypeList"
    }),
    loadProductList() {
      console.log(this.storeProductList);
      return this.storeProductList;
    }
  },
  created() {
    this.$store.dispatch("getStoreProductList");
    this.$store.dispatch("getStoreCategory", localStorage.token);
    this.$store.dispatch("getStoreProductType")
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
</style>