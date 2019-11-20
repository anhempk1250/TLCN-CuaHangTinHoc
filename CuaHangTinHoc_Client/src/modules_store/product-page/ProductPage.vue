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
        </div>
        <div class="col-md-3">
          <button class="btn btn-primary">
            <i class="fa fa-search"></i> Tìm kiếm
          </button>
        </div>
        <div class="col-md-3">
          <b-pagination
            v-if="loadTempList"
            v-model="currentPage"
            :total-rows="loadTempList.length"
            :per-page="perPage"
            align="fill"
            class="my-0"
          ></b-pagination>
        </div>
      </div>
      <div class="row" style="margin-bottom: 1rem;">
        <div class="col-12 col-md-2">
          <select
            @change="updateTempList()"
            v-model="status"
            style="font-size: 14px;"
            class="form-control"
          >
            <option selected value="1">Đang kinh doanh</option>
            <option value="0">Đã xóa</option>
          </select>
        </div>
        <div class="col-12 col-md-2">
          <select
            name="category"
            @change="updateTempList()"
            v-model="categoryIdSelected"
            class="form-control"
          >
            <option selected value="-1">-- Danh Mục --</option>

            <option v-for="(category,index) in categoryList" :key="index" :value="category.id">
              <p>{{category.name}}</p>
            </option>
          </select>
        </div>
        <div class="col-12 col-md-2">
          <select @change="updateTempList()" v-model="typeProductIdSelected" class="form-control">
            <option value="-1">Loại sản phẩm</option>
            <option v-for="(type,index) in loadTypeList" :key="index" :value="type.id">{{type.name}}</option>
          </select>
        </div>
        <div class="col-12 col-md-2">
          <select @change="updateTempList()" v-model="producerIdSelected" class="form-control">
            <option value="-1" selected>-- Nhà Sản Xuất --</option>
            <option
              v-for="(producer,index) in storeProducerList"
              :key="index"
              :value="producer.id"
            >{{producer.name}}</option>
          </select>
        </div>
      </div>
      <b-table
        v-if="loadTempList"
        select-mode="multi"
        style="font-size: 14px;"
        head-variant="light"
        :busy="storeProductLoading"
        :items="loadTempList"
        :current-page="currentPage"
        :per-page="perPage"
        :fields="fields"
        :filter="inputSearch"
        sort-desc.sync="true"
        sort-by="name"
      >
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template v-slot:cell(id)="row">
          <p style="width:100%;word-break: break-word;">{{row.item.id + "abcyxz"}}</p>
        </template>
        <template v-slot:cell(Name)="row">
          <p style="width:100%;word-break: break-word;">{{formatName(row.item.Name)}}</p>
        </template>
        <template v-slot:cell(Description)="row">
          <p
            style="width:100%;word-break: break-word;"
            v-html="formatDescription(row.item.Description)"
          ></p>
        </template>
        <template v-slot:cell(Price)="row">{{fixFormatVND(row.item.Price)}}đ</template>
        <template v-slot:cell(CostPrice)="row">{{fixFormatVND(row.item.CostPrice)}}đ</template>
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
              <select
                @change="updateTempList()"
                v-model="categoryIdSelected"
                id="dm"
                ref="selectCetegory"
                class="form-control"
              >
                <option value="-1" selected>-- Danh Mục --</option>
                <option
                  v-for="(category,index) in categoryList"
                  :key="index"
                  :value="category.id"
                >{{category.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="input">
            <div>
              <label for="id">Mã sản phẩm:</label>
              <input
                id="id"
                v-model="selected.id"
                class="form-control"
                placeholder="Nhập mã sản phẩm"
              />
            </div>

            <div>
              <label for="name">Tên sản phẩm:</label>
              <input
                id="name"
                v-model="selected.name"
                class="form-control"
                placeholder="Nhập tên sản phẩm"
              />
            </div>

            <div>
              <label for="count">Số lượng:</label>
              <input
                id="count"
                v-model="selected.productCount"
                class="form-control"
                placeholder="Nhập tên sản phẩm"
              />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="input">
            <div>
              <label for="nxs">Nhà sản xuất:</label>
              <select v-model="producerIdSelected" id="nxs" class="form-control">
                <option
                  v-for="(producer,index) in storeProducerList"
                  selected
                  :key="index"
                  :value="producer.id"
                >{{producer.name}}</option>
              </select>
            </div>
            <div class="row">
              <div class="col-md-6" style="margin:0;padding-left:0;">
                <label>Giá vốn :</label>
                <input v-model="selected.price" class="form-control" placeholder="Giá vốn" />
              </div>
              <div class="col-md-6" style="margin:0;padding-right:0;">
                <label>Giá bán :</label>
                <input v-model="selected.costPrice" class="form-control" placeholder="Giá bán" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>Chọn tối đa 4 tấm hình :</p>
        </div>
        <div style="margin: 1rem 0;">
          <input ref="inputFile" id="inputFile" @change="upload()" type="file" multiple />
        </div>
        <div class="row containerImg">
          <div class="col-md-3">
            <img id="img1" src="#" alt="image" />
          </div>
          <div class="col-md-3">
            <img id="img2" src="#" alt="image" />
          </div>
          <div class="col-md-3">
            <img id="img3" src="#" alt="image" />
          </div>
          <div class="col-md-3">
            <img id="img4" src="#" alt="image" />
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
                <tr v-for="(prop,index) in formatProperty(loadSelectCategory)" :key="index">
                  <td style="padding-top:1.1rem">{{index+1}}</td>
                  <td style="padding-top:1.1rem">{{prop}}</td>
                  <td>
                    <input :id="'prop'+index" class="form-control" />
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
import $ from "jquery";
export default {
  data() {
    return {
      images: ["", "", "", ""],
      propertyCount: 0,
      tempList: [],
      categoryIdSelected: -1,
      producerIdSelected: -1,
      typeProductIdSelected: -1,
      typeListSelected: [],
      status: 1,
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
        { key: "productCount", label: "Số lượng" },
        { key: "Price", label: "Giá tiền" },
        { key: "CostPrice", label: "Giá gốc" },
        { key: "control", label: "" }
      ],
      product: {}
    };
  },
  props: {},
  watch: {},
  methods: {
    upload() {
      let input = this.$refs.inputFile;
      if (input && input.files) {
        for (let i = 0; i < 4; i++) {
          if (input.files[i]) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = e => {
              console.log(this.images);
              vm.images[i] = e.target.result;
              $("#img" + (i + 1)).attr("src", e.target.result);
            };
            reader.readAsDataURL(input.files[i]);
          }
        }
      }
    },
    updateTempList() {
      if (!this.control) {
        this.updateActiveTempList();
      } else {
        if (this.categoryIdSelected != -1) {
          for (let i = 0; i < this.categoryList.length; i++) {
            if (this.categoryList[i].id == this.categoryIdSelected) {
              this.typeListSelected = this.categoryList[i].product_types;
            }
          }
        }
      }
    },
    updateActiveTempList() {
      if (this.categoryIdSelected != -1) {
        let arr = [];
        let productList = this.storeProductList;
        for (let i = 0; i < productList.length; i++) {
          if (productList[i].status == this.status) {
            arr.push(productList[i]);
          }
        }
        this.updateForCategoryTempList(arr);
      } else {
        this.tempList = this.storeProductList;
      }
    },
    updateForCategoryTempList(productList) {
      if (this.categoryIdSelected != -1) {
        let arr = [];
        for (let i = 0; i < productList.length; i++) {
          if (productList[i].product_category_id == this.categoryIdSelected) {
            arr.push(productList[i]);
          }
        }
        this.updateTypeListSelected();
        this.updateForTypeTempList(arr);
      } else {
        this.typeProductIdSelected = -1;
      }
    },
    updateForTypeTempList(productList) {
      if (this.typeProductIdSelected != -1) {
        let arr = [];
        for (let i = 0; i < productList.length; i++) {
          if (this.checkProductType(productList[i].product_type_list)) {
            arr.push(productList[i]);
          }
        }
        this.updateForProducerTempList(arr);
      } else this.updateForProducerTempList(productList);
    },
    checkProductType(typeList) {
      console.log(typeList, "type ne");
      for (let i = 0; i < typeList.length; i++) {
        if (typeList[i].id == this.typeProductIdSelected) {
          return true;
        }
      }
      return false;
    },
    updateTypeListSelected() {
      if (this.categoryIdSelected == -1) this.typeListSelected = [];
      else {
        let categories = this.categoryList;
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].id == this.categoryIdSelected) {
            this.typeListSelected = categories[i].product_types;
          }
        }
      }
    },
    updateForProducerTempList(productList) {
      console.log("producer", productList);
      if (this.producerIdSelected != -1) {
        let arr = [];
        for (let i = 0; i < productList.length; i++) {
          if (productList[i].producer.id == this.producerIdSelected) {
            arr.push(productList[i]);
          }
        }
        this.tempList = arr;
      } else this.tempList = productList;
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
    formatDescription(property) {
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
    formatProperty(category) {
      let property = category.property;
      if (property) {
        let arr = property.split("___");
        this.propertyCount = arr.length;
        for (let i = 0; i < arr.length; i++) {
          arr[i] = arr[i].split("_")[1];
        }
        return arr;
      } else return "";
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
      this.selected = {};
      this.categoryIdSelected = -1;
      this.producerIdSelected = -1;
    },
    setUpdate(product) {
      this.insert = false;
      this.control = true;
      this.selected = product;
      this.categoryIdSelected = product.product_category_id;
      this.producerIdSelected = product.producer_id;
    },
    save() {
      let propertyString = "";
      for (let i = 0; i < this.propertyCount; i++) {
        let id = "prop" + i;
        if (i == this.propertyCount - 1) propertyString += $("#" + id).val();
        else propertyString += $("#" + id).val() + "___";
      }
      this.selected.propertyString = propertyString;
      this.selected.image1 = this.images[0];
      this.selected.image2 = this.images[1];
      this.selected.image3 = this.images[2];
      this.selected.image4 = this.images[3];
      if (this.insert) {
        this.$store
          .dispatch("insertStoreProduct", this.selected)
          .then(response => this.handleSubmit(response));
      }
      this.back();
    },
    handleSubmit(response) {
      console.log(response.data,'kajsdjasdjkashdkj');
    },
    back() {
      this.control = false;
      this.typeProductIdSelected = -1;
      this.categoryIdSelected = -1;
      this.producerIdSelected = -1;
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
      storeProductTypeList: "storeProductTypeList",
      storeProducerList: "storeProducerList"
    }),
    loadTempList() {
      return this.tempList;
    },
    loadTypeList() {
      return this.typeListSelected;
    },
    loadSelectCategory() {
      let temp = {};
      if (this.categoryIdSelected) {
        for (let i = 0; i < this.categoryList.length; i++) {
          if (this.categoryList[i].id == this.categoryIdSelected) {
            temp = this.categoryList[i];
            break;
          }
        }
      }
      // console.log(temp);
      return temp;
    }
  },
  created() {
    if (localStorage.token) {
      this.$store
        .dispatch("getStoreProductList")
        .then(() => this.updateTempList());
      this.$store.dispatch("getStoreCategoryFromProductPage").then(() => {
        console.log("create", this.categoryList);
      });
      this.$store.dispatch("getStoreProducer");
    }
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
  margin-bottom: 1rem;
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
  width: 100%;
  height: 150px;
  margin-bottom: -0.5rem;
}
.plus-typeProduct {
  position: absolute;
  right: 1rem;
  top: 0;
  width: 2.5rem;
  height: 2.1rem;
}
select {
  cursor: pointer;
  font-size: 14px;
}
.containerImg {
  padding: 1rem;
  margin-bottom: 2rem;
  height: 180px;
  background-color: rgb(233, 235, 234);
}
</style>