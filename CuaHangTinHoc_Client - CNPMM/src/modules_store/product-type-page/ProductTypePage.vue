<template>
  <div>
    <div class="row" style="background-color: #e9ebea;margin:0;padding: 1rem;">
      <h5 class="text-left" style="margin-top:0.5rem;color:#307ECC">Danh sách loại sản phẩm</h5>
    </div>
    <div style="margin-top:1rem">
      <b-tabs>
        <b-tab title="Loại sản phẩm" @click="typeAndProduct = false">
          <div class="row">
            <div class="col-12 col-md-4">
              <input class="form-control" placeholder="Nhập tên hoặc mã loại sản phẩm" />
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-12">
              <button
                class="btn btn-primary"
                data-toggle="collapse"
                data-target="#insertType"
              >Thêm loại</button>
              <div class="row collapse" id="insertType">
                <div class="col-md-3" style="padding-left:0;">
                  <select v-model="type.product_category_id" class="form-control">
                    <option selected value="-1">-- Danh mục sản phẩm -</option>
                    <option
                      v-for="(cate,index) in storeCategoryList"
                      :value="cate.id"
                      :key="index"
                    >{{cate.name}}</option>
                  </select>
                </div>
                <div class="col-3">
                  <input v-model="type.name" class="form-control" placeholder="Nhập tên loại" />
                </div>
                <div class="col-2">
                  <label style="cursor:pointer">
                    <input v-model="type.HomePage" type="checkbox" checked /> Trang chủ ?
                  </label>
                </div>
                <div class="col-2">
                  <button class="btn btn-primary" @click="insertProductType">Thêm</button>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b-table
                style="font-size: 14px; height: 400px;"
                head-variant="light"
                sticky-header
                :fields="fieldsProductType"
                :items="storeProductTypeList"
                :busy="storeProductTypeLoading"
              >
                <template v-slot:table-busy>
                  <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </template>
                <template v-slot:cell(name)="data">
                  <div v-if="!edit || data.item.id != selected.id">{{data.item.name}}</div>
                  <div v-if="edit && data.item.id == selected.id">
                    <input class="form-control" v-model="selected.name" />
                  </div>
                </template>
                <template v-slot:cell(HomePage)="data">
                  <div v-if="!edit || data.item.id != selected.id">
                    <i v-if="data.item.HomePage" class="fas fa-check"></i>
                    <i v-else class="fas fa-window-close"></i>
                  </div>
                  <div v-if="edit && data.item.id == selected.id">
                    <input
                      v-model="selected.HomePage"
                      type="checkbox"
                      :checked="data.item.HomePage"
                    />
                  </div>
                </template>
                <template v-slot:cell(category.name)="data">
                  <p
                    v-if="data.item.category && (!edit || data.item.id != selected.id)"
                  >{{data.item.category.name}}</p>

                  <select
                    v-if="edit && data.item.id == selected.id"
                    v-model="selected.category.id"
                    class="form-control"
                  >
                    <option
                      v-for="(cate,index) in storeCategoryList"
                      :value="cate.id"
                      :key="index"
                    >{{cate.name}}</option>
                  </select>
                </template>
                <template v-slot:cell(control)="data">
                  <div v-if="!edit || data.item.id != selected.id">
                    <i
                      title="Chi tiết"
                      class="fa fa-eye"
                      @click="viewProductType(data.item)"
                      style="margin-right: 1rem;"
                    ></i>
                    <i
                      title="Sửa"
                      @click="editProductType(data.item)"
                      class="fa fa-edit"
                      style="margin-right: 1rem;"
                    ></i>
                    <i title="Xóa" class="fa fa-trash" @click="deleteProductType(data.item)"></i>
                  </div>
                  <div v-if="edit &&  data.item.id == selected.id">
                    <a href="#" style="margin-right: 1rem" @click="updateProductType">Lưu</a>
                    <a href="#" @click="edit = false">Hủy</a>
                  </div>
                </template>
              </b-table>
            </div>
          </div>
        </b-tab>
        <b-tab
          title="Loại & Sản phẩm"
          :active="typeAndProduct"
          @click="selected.id = -1;selected = {};"
        >
          <div class="row">
            <label>
              <h4 style="color:rgb(48, 126, 204)">Danh sách sản phẩm</h4>
            </label>
            <div class="col-md-12 container-productList">
              <input class="form-control" placeholder="Nhập mã sản phẩm" style="margin-bottom:1rem" />
              <b-table
                head-variant="light"
                style="font-size: 12px;height: 300px"
                sticky-header
                :fields="fieldsProductOfCategory"
                :items="storeProductList"
              >
                <template v-slot:cell(name)="data">{{fixName(data.item.name)}}</template>
                <template v-slot:table-busy>
                  <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </template>
                <template v-slot:cell(control)="data">
                  <i
                    title="Chi tiết"
                    class="fa fa-eye"
                    @click="alert('chi tiết')"
                    style="margin-right: 1rem;"
                  ></i>
                  <i title="Thêm" class="fa fa-plus" @click="addProductToType(data.item)"></i>
                </template>
              </b-table>
            </div>
          </div>
          <div class="row">
            <label>
              <h4 style="color: #307ECC;margin-top: 1.5rem">Danh sách sản phẩm theo loại</h4>
            </label>
            <div class="col-md-12 container-productList">
              <div class="row">
                <div class="col-md-12" style="padding: 0;padding-left:0;">
                  <div class="row" style="margin:0;">
                    <div class="col-md-2" style="padding:0">
                      <h5>Danh sách loại:</h5>
                    </div>
                    <div class="col-md-3" style="padding:0">
                      <select v-model="selectedID" class="form-control" @change="setSelected">
                        <option
                          v-for="(type,index) in storeProductTypeList"
                          :key="index"
                          :value="type.id"
                        >{{type.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <b-table
                head-variant="light"
                style="font-size: 12px;height: 300px"
                sticky-header
                :fields="fieldsProductOfType"
                :items="loadSelected.product_list_with_type"
              >
                <template v-slot:table-busy>
                  <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </template>
                <template v-slot:cell(control)="data">
                  <i
                    title="Chi tiết"
                    class="fa fa-eye"
                    @click="alert('chi tiết')"
                    style="margin-right: 1rem;"
                  ></i>
                  <i title="Thêm" class="fa fa-trash" @click="deleteProductFromType(data.item)"></i>
                </template>
                <template v-slot:cell(name)="data">{{fixName(data.item.name)}}</template>
              </b-table>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { CommonService } from "../../service/common.service";
var commonService = new CommonService();
export default {
  data() {
    return {
      type: {
        name: "",
        product_category_id: "",
        HomePage: true
      },
      typeAndProduct: false,
      selectedID: -1,
      selected: {},
      edit: false,
      fieldsProductType: [
        { key: "id", label: "Mã loại sản phẩm" },
        { key: "name", label: "Tên loại sản phẩm" },
        { key: "HomePage", label: "Trang chủ" },
        { key: "category.name", label: "Tên danh mục" },
        { key: "control", label: "" }
      ],
      fieldsProductOfType: [
        { key: "id", label: "Mã sản phẩm" },
        { key: "name", label: "Tên sản phẩm" },
        { key: "control", label: "" }
      ],
      fieldsProductOfCategory: [
        { key: "id", label: "Mã sản phẩm" },
        { key: "name", label: "Tên sản phẩm" },
        { key: "control", label: "" }
      ]
    };
  },
  methods: {
    fixName(name) {
      if (name.length > 100) {
        return name.slice(0, 100) + "...";
      } else return name;
    },
    addProductToType(product) {
      if (this.selected.name) {
        this.$swal({
          title: "Thông báo",
          text:
            "Bạn muốn thêm sản phẩm " +
            product.id +
            " vào loại " +
            this.selected.name +
            " ?",
          showCancelButton: true
        }).then(result => this.handleAddProductToType(result, product));
      } else {
        this.$swal({
          title: "Thông báo",
          text: "Bạn chưa chọn loại sản phẩm"
        });
      }
    },
    handleAddProductToType(result, product) {
      if (result.value) {
        if (this.selected != {} && this.selected.id != -1) {
          let pwt = {
            product_Object_id: product._id,
            product_id: product.id,
            product_name: product.name,
            product_type_id: this.selected.id,
            product_type_name: this.selected.name
          };
          this.$store
            .dispatch("addStoreProductToType", pwt)
            .then(response => this.afterAddPWT(response, product));
        } else {
          this.$swal({
            title: "Thông báo",
            text: "Bạn chưa chọn loại sản phẩm"
          });
        }
      }
    },
    deleteProductFromType(product) {
      this.$swal({
        title: "Thông báo",
        text:
          "Bạn muốn xóa sản phẩm " +
          product.id +
          " khỏi loại " +
          this.selected.name +
          " ?",
        showCancelButton: true
      }).then(result => this.handleDeleteProductToType(result, product));
    },
    handleDeleteProductToType(result, product) {
      if (result.value) {
        if (this.selected != {} && this.selected.id != -1) {
          let pwt = {
            product_Object_id: product._id,
            product_id: product.id,
            product_name: product.name,
            product_type_id: this.selected.id,
            product_type_name: this.selected.name
          };
          this.$store
            .dispatch("deleteStoreProductFromType", pwt)
            .then(response => this.afterDeletePWT(response, product));
        } else {
          this.$swal({
            title: "Thông báo",
            text: "Bạn chưa chọn loại sản phẩm"
          });
        }
      }
    },
    setSelected() {
      for (let i = 0; i < this.storeProductTypeList.length; i++) {
        if (this.storeProductTypeList[i].id == this.selectedID) {
          this.selected = this.storeProductTypeList[i];
          return "";
        }
      }
      return {};
    },
    viewProductType(type) {
      this.typeAndProduct = true;
      this.selectedID = type.id;
      this.selected = type;
    },
    editProductType(type) {
      //alert('asd')
      this.selected = type;
      this.selected.product_category_id = type.category.id;
      this.selectedID = type;
      this.edit = true;
    },
    checkEmpty(type) {
      if (type.name == "" || type.product_category_id == "") {
        this.$swal({
          title: "Thông báo",
          text: "Nhập thiếu thông tin"
        });
        return false;
      } else return true;
    },
    insertProductType() {
      this.$swal({
        title: "Thông báo",
        text: "Bạn chắc chắn muốn nhập ?",
        showCancelButton: true
      }).then(result => this.handleInsertProductType(result));
    },
    handleInsertProductType(result) {
      if (result.value && this.checkEmpty(this.type)) {
        this.$store
          .dispatch("insertStoreProductType", this.type)
          .then(response => this.afterSubmit(response));
      }
    },
    updateProductType() {
      this.$swal({
        title: "Thông báo",
        text: "Bạn chắc chắn muốn chỉnh sửa ?",
        showCancelButton: true
      }).then(result => this.handleUpdateProductType(result));
    },
    handleUpdateProductType(result) {
      if (result.value && this.checkEmpty(this.selected)) {
        if (this.selected.HomePage == true) this.selected.HomePage = 1;
        else this.selected.HomePage = 0;
        //alert(this.selected.category.id);
        this.selected.product_category_id = this.selected.category.id;
        this.$store
          .dispatch("updateStoreProductType", this.selected)
          .then(response => this.afterSubmit(response));
      }
    },
    deleteProductType(type) {
      this.$swal({
        title: "Thông báo",
        text: "Bạn chắc chắn muốn xóa ?",
        showCancelButton: true
      }).then(result => this.handleDeleteProductType(result, type));
    },
    handleDeleteProductType(result, type) {
      if (result.value) {
        type.product_category_id = type.category.id;
        this.$store
          .dispatch("deleteStoreProductType", type)
          .then(response => this.afterSubmit(response));
      }
    },
    afterSubmit(response) {
      if (commonService.checkErrorToken(response, this)) {
        this.$swal({
          title: "Thông báo",
          text: response.data.msg
        });
        if (response.data.RequestSuccess) {
          this.type = {};
          this.selected = {};
          this.edit = false;
          this.$store.dispatch("getStoreProductType").then(response => {
            commonService.checkErrorToken(response, this);
          });
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
          this.type = {};
          this.selected = {};
          this.edit = false;
          this.$store.dispatch("getStoreProductType");
        }
      }
      */
    },
    afterAddPWT(response, product) {
      if (commonService.checkErrorToken(response, this)) {
        this.$swal({
          title: "Thông báo",
          text: response.data.msg
        });
        if (response.data.RequestSuccess) {
          this.selected.product_list_with_type.push(product);
          this.$store.dispatch("getStoreProductType").then(response => {
            commonService.checkErrorToken(response);
          });
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
          this.selected.product_list_with_type.push(product);
          this.$store.dispatch("getStoreProductType");
        }
      }
      */
    },
    afterDeletePWT(response, product) {
      if (commonService.checkErrorToken(response, this)) {
        this.$swal({
          title: "Thông báo",
          text: response.data.msg
        });
        if (response.data.RequestSuccess) {
          for (
            let i = 0;
            i < this.selected.product_list_with_type.length;
            i++
          ) {
            if (this.selected.product_list_with_type[i].id == product.id) {
              this.selected.product_list_with_type.splice(i, 1);
              break;
            }
          }
          this.$store.dispatch("getStoreProductType").then(response => {
            commonService.checkErrorToken(response);
          });
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
          for (
            let i = 0;
            i < this.selected.product_list_with_type.length;
            i++
          ) {
            if (this.selected.product_list_with_type[i].id == product.id) {
              this.selected.product_list_with_type.splice(i, 1);
              break;
            }
          }
          this.$store.dispatch("getStoreProductType");
        }
      }
      */
    }
  },
  computed: {
    ...mapGetters({
      storeProductTypeList: "storeProductTypeList",
      storeProductTypeLoading: "storeProductTypeLoading",
      storeCategoryList: "storeCategoryList",
      storeProductList: "storeProductList"
    }),
    loadSelected() {
      return this.selected;
    }
  },
  created() {
    this.$store.dispatch("getStoreProductType").then(response => {
      commonService.checkErrorToken(response, this);
    });
    this.$store.dispatch("getStoreCategoryFromProductPage").then(response => {
      commonService.checkErrorToken(response, this);
    });
    this.$store
      .dispatch("getStoreProductListFromProductTypePage")
      .then(response => {
        commonService.checkErrorToken(response, this);
      });
  }
};
</script>
<style scoped>
.row {
  margin: 1rem 0;
}
i {
  cursor: pointer;
}
.container-productList {
  border: 5px solid rgb(233, 235, 234);
  padding: 1rem;
}
</style>