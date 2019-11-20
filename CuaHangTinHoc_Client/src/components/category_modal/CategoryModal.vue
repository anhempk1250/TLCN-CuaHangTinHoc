<template>
  <div>
    <div
      ref="modal"
      class="modal fade"
      id="model_category"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
      style="margin-top:0;padding:0;"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="exampleModalCenterTitle">
              <span v-if="insert">Thêm Category</span>
              <span v-else>Sửa Category : {{category.id}}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <div class="container">
                  <label for="name">Tên Danh Mục :</label>
                  <input
                    id="name"
                    class="form-control"
                    v-model="loadCategory.name"
                    placeholder="Tên Danh Mục"
                  />
                </div>
                <div class="container">
                  <label for="bm">Biểu Mẩu : (dùng để tạo mã cho các sản phẩm thuộc danh mục)</label>
                  <input
                    id="bm"
                    class="form-control"
                    v-model="loadCategory.summaryName"
                    placeholder="Biểu Mẩu"
                  />
                </div>
                <div class="container">
                  <button
                    type="button"
                    @click="InsertOrUpdateCategory()"
                    class="btn btn-primary"
                  >Lưu</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                </div>
              </div>
              <div class="col-md-8">
                <div class="container row">
                  <label
                    for="property"
                    class="col-md-3"
                    style="margin-top: 0.5rem;"
                  >Tên thuộc tính :</label>
                  <input
                    class="form-control col-md-6"
                    placeholder="thuộc tính sản phẩm"
                    style="margin-left: -2.5rem;"
                    v-model="inputProperty"
                    v-on:keyup.enter="AddProperty()"
                    id="property"
                  />
                  <button
                    v-on:click="AddProperty()"
                    class="btn btn-primary btn-sm col-md-1"
                    style="margin-left: 0.5rem"
                  >Thêm</button>
                </div>
                <div class="container">
                  <table class="table fixed_header" style="width: 100%;">
                    <thead class="thead-light"></thead>
                    <tbody id="myTbody" style="width: 100%;">
                      <tr class="text-center thead-light" style="width: 100px;">
                        <th style="width: 10rem;">STT</th>
                        <th style="width: 40rem;">Tên thuộc tính</th>
                        <th style="width: 15rem;">Control</th>
                      </tr>
                      <tr
                        v-if="!loadCategory.propertyList || loadCategory.propertyList.length == 0"
                      >
                        <td></td>
                        <td class="text-center">Chưa có thuộc tính</td>
                      </tr>
                      <tr
                        class="text-center"
                        v-else
                        v-for="(prop, index) in loadCategory.propertyList"
                        :key="index"
                      >
                        <td>{{index+1}}</td>
                        <td v-if="!insert">{{prop}}</td>
                        <td v-if="insert">{{prop}}</td>
                        <td>
                          <button v-on:click="DeleteProperty(prop)" class="btn btn-danger">Xóa</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
export default {
  data() {
    return {
      category: {
        _id: "",
        id: "",
        name: "",
        summaryName: "",
        propertyList: []
      },
      inputProperty: ""
    };
  },
  props: ["insert", "categorySelected"],
  watch: {
    insert(NewVal) {
      this.insert = NewVal;
      if (NewVal) {
        this.category = {};
      }
      console.log(NewVal);
    },
    categorySelected(NewVal) {
      console.log("he 2", NewVal);
      let myCategory = {};
      this.categorySelected = NewVal;
      myCategory._id = NewVal._id;
      myCategory.id = NewVal.id;
      myCategory.name = NewVal.name;
      myCategory.summaryName = NewVal.summaryName;
      myCategory.propertyList = NewVal.propertyList;

      this.category = myCategory;
    }
  },
  computed: {
    ...mapGetters({
      storeCategory: "storeCategory"
    }),
    loadInsert() {
      return this.insert;
    },
    loadCategory() {
      return this.category;
    }
  },
  methods: {
    notification(title, text) {
      this.$swal({
        title: title,
        text: text
      });
    },
    AddProperty() {
      if (this.checkSpecialCharacter()) {
        for (let i = 0; i < this.category.propertyList.length; i++) {
          if (this.category.propertyList[i] == this.inputProperty) {
            this.notification("Thông báo", "Thuộc tính này đã được thêm vào");
            return 0;
          }
        }
        this.category.propertyList.push(this.inputProperty);
        this.inputProperty = "";
        let myTbody = document.getElementById("myTbody");
        myTbody.scrollTop = myTbody.scrollHeight;
      } else {
        this.notification(
          "Thông báo",
          "Thuộc tính không được chứa ký tự đặt biệt hoặc rỗng"
        );
        return "";
      }
    },
    DeleteProperty(property) {
      if (this.category.propertyList.length == 1) {
        this.notification(
          "Thông báo",
          "Phải có tối thiểu một thuộc tính, Không thể xóa !"
        );
      } else {
        for (let i = 0; i < this.category.propertyList.length; i++) {
          if (this.category.propertyList[i] == property) {
            this.category.propertyList.splice(i, 1);
            break;
          }
        }
      }
    },
    checkSpecialCharacter() {
      let regex = /[*|/":<>[\]{}`\\()';@&$]/;
      if (!regex.test(this.inputProperty)) {
        return true;
      }
      return false;
    },
    checkInputCategory() {
      if (this.category.name == "") {
        this.notification("Thông báo", "Chưa Nhập Tên Category");
        return false;
      }
      if (this.category.summaryName == "") {
        this.notification("Thông báo", "Chưa Nhập Biểu Mẫu");
        return false;
      }
      if (this.category.propertyList.length == 0) {
        this.notification("Thông báo", "Chưa nhập Property");
        return false;
      }
      return true;
    },
    InsertOrUpdateCategory() {
      if (this.checkInputCategory()) {
        if (this.insert) {
          this.category.propertyString = this.formatProperty();
          this.$store
            .dispatch("insertStoreCategory", this.category)
            .then(respone => {
              this.handleRespone(respone);
            });
        } else {
          this.category.propertyString = this.formatProperty();
          this.$store
            .dispatch("updateStoreCategory", this.category, 0)
            .then(respone => {
              this.handleRespone(respone);
            });
        }
      }
    },
    handleRespone(respone) {
      if (respone.data.msg) {
        this.$swal({
          title: "Thông báo",
          text: respone.data.msg
        });
        if (respone.data.RequestSuccess) {
          window.location.reload();
        }
      }
    },
    formatProperty() {
      let string = "";
      for (let i = 0; i < this.category.propertyList.length; i++) {
        if (i == 0) {
          string += "" + (i + 1) + "_" + this.category.propertyList[i];
        } else {
          string += "___" + (i + 1) + "_" + this.category.propertyList[i];
        }
      }
      return string;
    }
  }
};
</script>
<style lang="scss" scoped>
.col-md-4 {
  .container {
    margin-bottom: 1rem;
    button {
      margin-right: 1rem;
    }
  }
}

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
</style>