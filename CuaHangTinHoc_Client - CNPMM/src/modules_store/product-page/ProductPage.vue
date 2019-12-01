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
        <div class="col-md-2">
          <button class="btn btn-primary">
            <i class="fa fa-search"></i> Tìm kiếm
          </button>
        </div>
        <div class="col-md-4">
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
          <p style="width:100%;word-break: break-word;">{{formatName(row.item.name)}}</p>
        </template>
        <template v-slot:cell(Description)="row">
          <p
            style="width:100%;word-break: break-word;"
            v-html="formatDescription(row.item.Description)"
          ></p>
        </template>
        <template v-slot:cell(price)="row">{{fixFormatVND(row.item.price)}}đ</template>
        <template v-slot:cell(cost_price)="row">{{fixFormatVND(row.item.cost_price)}}đ</template>
        <template v-slot:cell(control)="data">
          <i title="Chi tiết" class="fa fa-eye" style="margin-right: 1rem;" @click="setView(data.item)"></i>
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
      <form
        ref="form"
        id="formData"
        action="http://localhost:8000/storeProduct"
        method="post"
        enctype="multipart/form-data"
      >
        <div class="row" style="margin: 1rem 0;">
          <div class="col-md-4">
            <div class="input">
              <div>
                <label for="dm">Chọn danh mục:</label>
                <select
                  @change="updateTempList()"
                  v-model="categoryIdSelected"
                  ref="selectCetegory"
                  class="form-control"
                  :disabled="view"
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
                  v-model="selected.id"
                  class="form-control"
                  :disabled="!insert || view"
                  placeholder="Nhập mã sản phẩm"
                  
                />
              </div>

              <div>
                <label for="name">Tên sản phẩm:</label>
                <input v-model="selected.name" class="form-control" :disabled="view" placeholder="Nhập tên sản phẩm" />
              </div>

              <div>
                <label for="count">Số lượng:</label>
                <input
                  type="number"
                  v-model="selected.productCount"
                  class="form-control"
                  placeholder="Nhập số lượng sản phẩm"
                  :disabled="view"
                />
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="input">
              <div>
                <label for="nxs">Nhà sản xuất:</label>
                <select :disabled="view" v-model="producerIdSelected" class="form-control">
                  <option
                    v-for="(producer,index) in storeProducerList"
                    selected
                    :key="index"
                    :value="producer.id"
                    :disabled="view"
                  >{{producer.name}}</option>
                </select>
              </div>
              <div class="row">
                <div class="col-md-6" style="margin:0;padding-left:0;">
                  <label>Giá vốn :</label>
                  <input
                    v-model="selected.price"
                    type="number"
                    class="form-control"
                    placeholder="Giá vốn"
                    :disabled="view"
                  />
                </div>
                <div class="col-md-6" style="margin:0;padding-right:0;">
                  <label>Giá bán :</label>
                  <input
                    v-model="selected.cost_price"
                    type="number"
                    class="form-control"
                    placeholder="Giá bán"
                    :disabled="view"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!insert || view" class="row containerImg">
          <div class="col-md-3">
            <img :src="imgLink + selected.id+'/1.png'" alt="image" />
          </div>
          <div class="col-md-3">
            <img :src="imgLink + selected.id+'/2.png'" alt="image" />
          </div>
          <div class="col-md-3">
            <img :src="imgLink + selected.id+'/3.png'" alt="image" />
          </div>
          <div class="col-md-3">
            <img :src="imgLink + selected.id+'/4.png'" alt="image" />
          </div>
        </div>
        <div v-if="!view">
          <div>
            <p>Chọn 4 tấm hình :</p>
          </div>
          <div style="margin: 1rem 0;">
            <input
              ref="inputFile"
              id="inputFile"
              name="inputFile"
              @change="upload"
              type="file"
              multiple
            />
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
                      <input
                        v-if="selected.property"
                        :id="'prop'+index"
                        :disabled="view"
                        :value="selected.property[index]"
                        class="form-control"
                      />
                      <input v-else :id="'prop'+index" class="form-control" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="control" style="position: absolute;right: 2rem;">
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="save()"
                  style="margin-right:0.1rem;"
                >
                  <i class="fa fa-check"></i> Lưu
                </button>
                <button class="btn btn-danger" @click="back()">
                  <i class="fa fa-arrow-left"></i> Trở về
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import $ from "jquery";
export default {
  data() {
    return {
      imgLink: "http://localhost:8000/images/",
      images: ["", "", "", ""],
      imagesNewTech: [],
      propertyCount: 0,
      tempList: [],
      categoryIdSelected: -1,
      producerIdSelected: -1,
      typeProductIdSelected: -1,
      typeListSelected: [],
      status: 1,
      control: false,
      insert: true,
      view: false,
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
        { key: "price", label: "Giá tiền" },
        { key: "cost_price", label: "Giá gốc" },
        { key: "control", label: "" }
      ],
      product: {}
    };
  },
  props: {},
  watch: {},
  methods: {
    upload(event) {
      let files = event.target.files;
      if (files) {
        this.imagesNewTech = files;
        for (let i = 0; i < 4; i++) {
          if (files[i]) {
            this.images[i] = files[i];
            let reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = event => {
              $("#img" + (i + 1)).attr("src", event.target.result);
            };
          }
        }
      }
    },
    updateTempList() {
      if (!this.control) {
        this.updateActiveTempList();
      }
    },
    updateActiveTempList() {
      let arr = [];
      let productList = this.storeProductList;
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].status == this.status) {
          arr.push(productList[i]);
        }
      }
      this.updateForCategoryTempList(arr);
    },
    updateForCategoryTempList(productList) {
      console.log("her", productList);
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
        this.tempList = productList;
        this.typeProductIdSelected = -1;
      }
    },
    updateForTypeTempList(productList) {
      if (this.typeProductIdSelected != -1) {
        let arr = [];
        for (let i = 0; i < this.typeListSelected.length; i++) {
          if (this.typeListSelected[i].id == this.typeProductIdSelected) {
            arr = this.typeListSelected[i].product_list_with_type;
          }
        }
        this.updateForProducerTempList(arr);
      } else this.updateForProducerTempList(productList);
    },
    checkProductType(typeList) {
      if (typeList) {
        for (let i = 0; i < typeList.length; i++) {
          if (typeList[i].id == this.typeProductIdSelected) {
            return true;
          }
        }
        return false;
      } else return false;
    },
    updateTypeListSelected() {
      if (this.categoryIdSelected == -1) this.typeListSelected = [];
      else {
        let categories = this.categoryList;
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].id == this.categoryIdSelected) {
            this.typeListSelected = categories[i].product_types;
            console.log("type ", this.typeListSelected);
          }
        }
      }
    },
    updateForProducerTempList(productList) {
      console.log("producer", productList);
      if (this.producerIdSelected != -1) {
        let arr = [];
        for (let i = 0; i < productList.length; i++) {
          console.log(
            productList[i].producer,
            this.producerIdSelected,
            "here ne vinh"
          );
          if (productList[i].producer == this.producerIdSelected) {
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
      console.log(category);
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
      this.selected.property = product.description.split("___");
      this.categoryIdSelected = product.product_category_id;
      this.producerIdSelected = product.producer;
    },
    setView(product) {
      this.view = true;
      this.control = true;
      this.selected = product;
      this.selected.property = product.description.split("___");
      this.categoryIdSelected = product.product_category_id;
      this.producerIdSelected = product.producer;
    },
    checkImage() {
      for (let i = 0; i < 4; i++) {
        if (!this.images[i]) {
          console.log(this.images[i]);
          return true;
        }
      }
      return false;
    },
    checkProp() {
      for (let i = 0; i < this.propertyCount; i++) {
        console.log($("#prop" + i));
        if ($("#prop" + i).val() == "") return true;
      }
      return false;
    },
    checkEmpty() {
      if (
        this.selected.id == "" ||
        this.selected.name == "" ||
        this.selected.productCount == "" ||
        this.selected.price == "" ||
        this.selected.cost_price == "" ||
        this.categoryIdSelected == -1 ||
        this.producerIdSelected == -1 ||
        this.checkImage() ||
        this.checkProp()
      ) {
        return true;
      } else return false;
    },
    save() {
      if (!this.checkEmpty()) {
        this.selected.product_category_id = this.categoryIdSelected;
        this.selected.producer_id = this.producerIdSelected;
        this.selected.images = this.images;
        let str = "";
        for (let i = 0; i < this.propertyCount; i++) {
          if (i == this.propertyCount - 1) {
            str += $("#prop" + i).val();
          } else {
            str += $("#prop" + i).val() + "___";
          }
        }
        this.selected.propertyString = str;
        this.selected.imagesNewTech = this.$refs.inputFile.files;
        (this.selected.form = this.$refs.form), $("#formData");
        console.log(this.$refs.form, $("#formData"));
        if (this.insert) {
          this.$store
            .dispatch("insertStoreProduct", this.selected)
            .then(response => this.handleSubmit(response));
        } else {
          this.$store
            .dispatch("updateStoreProduct", this.selected)
            .then(response => this.handleSubmit(response));
        }
      } else {
        this.$swal({
          title: "Thông báo",
          text: "Thông tin nhập thiếu !!!"
        });
      }
    },
    handleSubmit(response) {
      if (response.data.msg) {
        this.$swal({
          text: response.data.msg
        });
      }
      if (response.data.RequestSuccess) {
        //this.back();
        location.reload();
      }
    },
    back() {
      this.control = false;
      this.typeProductIdSelected = -1;
      this.categoryIdSelected = -1;
      this.producerIdSelected = -1;
      this.view = false;
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
      if (this.categoryIdSelected != -1) {
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
      this.$store.dispatch("getStoreProducerFromProductPage");
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