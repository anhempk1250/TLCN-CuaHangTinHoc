<template>
  <div>
    <div class="row" style="background-color: #e9ebea;margin:0;padding: 1rem;">
      <h5 class="text-left" style="margin-top:0.5rem;">
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
        <i class="fas fa-plus"></i> Thêm mới sản phẩm
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
            <th style="width: 15%;">Mã sản phẩm</th>
            <th style="width: 30%;">Tên sản phẩm</th>
            <th style="width: 10%;">Số lượng</th>
            <th style="width: 15%">Giá bán</th>
            <th style="width: 15%;">Danh mục</th>
            <th style="width: 15%"></th>
          </tr>
        </thead>
        <tbody style="font-size: 14px;">
          <tr class="text-center" v-for="(product,index) in loadProductList" :key="index">
            <td>{{product.id}}</td>
            <td>{{product.Name}}</td>
            <td>{{product.productCount}}</td>
            <td>{{product.Price}}</td>
            <td>{{product.category.name}}</td>
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
        <div class="col-md-4">
          <div class="input">
            <div>
              <label for="dm">Chọn danh mục:</label>
              <select id="dm" class="form-control">
                <option>ABC</option>
                <option>123</option>
              </select>
            </div>

            <div>
              <label for="name">Tên sản phẩm:</label>
              <input id="name" class="form-control" placeholder="Nhập tên sản phẩm" />
            </div>

            <div>
              <label for="count">Số lượng:</label>
              <input id="count" class="form-control" placeholder="Nhập tên sản phẩm" />
            </div>
            <div class="row">
              <div class="col-md-6" style="padding-left:0;">
                <label>Giá vốn :</label>
                <input class="form-control" placeholder="Giá vốn" />
              </div>
              <div class="col-md-6" style="padding-right:0;">
                <label>Giá bán :</label>
                <input class="form-control" placeholder="Giá bán" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="input">
            <div>
              <label for="lsp">Loại sản phẩm:</label>
              <br />
              <button
                id="lsp"
                class="btn btn-primary"
                onclick="alert('Mở modal làm sau')"
              >Chọn loại sản phẩm</button>
            </div>

            <div>
              <label for="nxs">Nhà sản xuất:</label>
              <select id="nxs" class="form-control">
                <option>ABC</option>
                <option>123</option>
              </select>
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
      selected: [],
      inputSearch: "",
      selectedForUpdate: {}
    };
  },
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
    }
  },
  computed: {
    ...mapGetters({
      storeProductList: "storeProductList",
      storeProductLoading: "storeProductLoading"
    }),
    loadProductList() {
      console.log(this.storeProductList);
      return this.storeProductList;
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
</style>