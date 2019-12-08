<template>
  <div>
    <div class="row" style="background-color: #e9ebea;margin:0;padding: 1rem;">
      <h5 class="text-left" style="margin-top:0.5rem;color:#307ECC">Danh Mục Sản Phẩm</h5>
      <button
        class="btn btn-primary"
        style="position: absolute;right: 2rem;"
        data-toggle="modal"
        data-target="#model_category"
        @click="setInsert()"
      >
        <i class="fas fa-plus"></i> Thêm mới danh mục
      </button>
    </div>

    <div class="row" style="margin: 1rem 0;">
      <div class="col-md-3" style="padding: 0;">
        <input
          id="categoryInputSearch"
          class="form-control"
          style="width: 100%;"
          placeholder="Tìm Kiếm"
          v-model="inputSearch"
        />
      </div>
      <div class="col-md-3">
        <select @change="updateTempList()" v-model="status" class="form-control">
          <option selected value="1">Còn kinh doanh</option>
          <option value="0">Đã xóa</option>
        </select>
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
          size="sm"
          class="my-0"
        ></b-pagination>
      </div>
    </div>

    <b-table
      v-if="loadTempList"
      select-mode="multi"
      @row-selected="selectRow"
      style="font-size: 14px;"
      head-variant="light"
      :busy="categoryLoading"
      :items="loadTempList"
      :current-page="currentPage"
      :per-page="perPage"
      :fields="fields"
      :filter="inputSearch"
      sort-desc.sync="true"
      sort-by="id"
      :class="{'activeSelectAll': loadFlagSelectAll}"
    >
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template v-slot:cell(id)="row">
        <p style="width:100%;word-break: break-word;">{{row.item.id}}</p>
      </template>

      <template v-slot:cell(name)="row">
        <p style="width:100%;word-break: break-word;">{{row.item.name}}</p>
      </template>

      <template v-slot:cell(property)="row">
        <p style="width:100%;word-break: break-word;">{{formatProperty(row.item.property)}}</p>
      </template>

      <template v-slot:cell(summaryName)="row">
        <p style="width:100%;word-break: break-word;">{{row.item.summaryName}}</p>
      </template>

      <template v-slot:cell(employeeName)="row">
        <p style="width:100%;word-break: break-word;">{{row.item.employeeName}}</p>
      </template>

      <template v-slot:cell(numberOfProduct)="row">
        <p style="width:100%;word-break: break-word;">{{row.item.numberOfProduct}}</p>
      </template>

      <template v-slot:cell(control)="row">
        <div v-if="status==1 && row.item.id!=1">
          <i
            id="1"
            title="Sửa"
            data-toggle="modal"
            data-target="#model_category"
            @click="setUpdate(row.item)"
            class="fa fa-edit"
            style="margin-right: 1rem;"
            disable="disable"
          ></i>
          <i title="Xóa" class="fa fa-trash" @click="deleteCategory(row.item)"></i>
        </div>
        <div v-else-if="status==0 && row.item.id!=1">
          <i
            id="1"
            title="Bỏ xóa"
            @click="setUpdate(row.item)"
            class="fa fa-edit"
            style="margin-right: 1rem;"
            disable="disable"
          ></i>
        </div>
      </template>
    </b-table>

    <div id="control">
      <button class="btn btn-danger">
        <i class="fa fa-trash"></i> Xóa
      </button>
      <button class="btn btn-info" @click="selectAll()">Chọn tất cả</button>
      <button class="btn btn-dark" v-on:click="cancel()">
        <i class="fa fa-window-close"></i> Hủy
      </button>
      <ModalCategory
        :insert="insert"
        v-on:reLoad="loadCategoryList"
        :categorySelected="loadSelectedForUpdate"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ModalCategory from "../../components/category_modal/CategoryModal.vue";
import { CommonService } from "../../service/common.service";
var commonService = new CommonService();
export default {
  data() {
    return {
      tempList: [],
      status: 1,
      flagSelectAll: false,
      currentPage: 1,
      perPage: 5,
      insert: true,
      selected: [],
      inputSearch: "",
      selectedForUpdate: {},
      fields: [
        { key: "id", label: "Mã Danh Mục" },
        { key: "name", label: "Tên Danh Mục" },
        {
          key: "property",
          label: "Thuộc Tính",
          formatter: value => {
            return this.formatProperty(value);
          }
        },
        { key: "summaryName", label: "Viết Tắt" },
        { key: "employeeName", label: "Tên Nhân Viên" },
        { key: "numberOfProduct", label: "Số Lượng" },
        { key: "control", label: "" }
      ]
    };
  },
  components: { ModalCategory },
  computed: {
    ...mapGetters({
      categoryList: "storeCategoryList",
      categoryLoading: "storeCategoryLoading"
    }),
    loadSelected() {
      return this.selected;
    },
    loadInputSearch() {
      return this.inputSearch;
    },
    loadSelectedForUpdate() {
      return this.selectedForUpdate;
    },
    checkSelectMulti() {
      if (this.selected.length > 1) return true;
      else return false;
    },
    loadFlagSelectAll() {
      return this.flagSelectAll;
    },
    loadTempList() {
      return this.tempList;
    }
  },
  methods: {
    updateTempList() {
      let arr = [];
      console.log(this.categoryList.length);
      for (let i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i].status == this.status) {
          if (!this.categoryList[i].employeeName)
            this.categoryList[i].employeeName = this.categoryList[
              i
            ].employee.name;
          arr.push(this.categoryList[i]);
        }
      }
      this.tempList = arr;
    },
    formatProperty(property) {
      if (property) {
        let temp = property;
        while (temp.includes("___")) {
          temp = temp.replace("___", ", ");
        }
        let index = 1;
        while (temp.includes("_")) {
          temp = temp.replace(index + "_", "");
          index += 1;
        }
        return temp;
      }
    },
    checkItem(category) {
      let index = this.selected.indexOf(category);
      if (index > -1) this.selected.splice(index, 1);
      else this.selected.push(category);
    },
    cancel() {
      this.selected = [];
      this.flagSelectAll = false;
    },
    setInsert() {
      this.insert = true;
    },
    setUpdate(category) {
      if (category) {
        this.selectedForUpdate = category;
        this.selectedForUpdate.propertyList = [];
        if (this.selectedForUpdate.property) {
          this.selectedForUpdate.propertyList = this.selectedForUpdate.property.split(
            "___"
          );
        }
      }
      this.insert = false;
    },
    selectAll() {
      this.selected = this.categoryList;
      this.flagSelectAll = true;
    },
    selectRow(items) {
      this.selected = items;
    },
    loadCategoryList() {
      this.$store.dispatch("getStoreCategory").then(response => {
        if (commonService.checkErrorToken(response, this))
          this.updateTempList();
      });
    },
    deleteCategory(category) {
      this.$swal({
        title: "Thông báo",
        text:
          "Các sản phẩm của danh mục sẽ bị xóa theo,  Bạn chắc chắn muốn xóa ?",
        showCancelButton: true
      }).then(result => this.handleDelete(result, category));
    },
    handleDelete(result, category) {
      if (result.value) {
        this.$swal.showLoading();
        this.$store
          .dispatch("deleteStoreCategory", category)
          .then(response => this.affterDelete(response));
      }
    },
    affterDelete(response) {
      if (commonService.checkErrorToken(response, this)) {
        if (response.data.msg && response.data.msg.msg) {
          this.$swal({
            title: "Thông báo",
            text: response.data.msg.msg
          });
        }
        if (response.data.msg.RequestSuccess) {
          this.loadCategoryList();
        }
      }
      /**
       * if (respone.data.msg && respone.data.msg.msg) {
          this.$swal({
            title: "Thông báo",
            text: respone.data.msg.msg
          });
        }
        if (respone.data.msg.RequestSuccess) {
          this.loadCategoryList();
        }
       */
    }
    /*handleCheckLogin(respone) {
      if (respone.data.errorToken) {
        this.$swal({
          title: "Error",
          text: respone.data.errorToken
        }).then(() => this.affterCheckLogin());
      } else {
        this.loadCategoryList();
      }
    },/*
    /*affterCheckLogin() {
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      this.$router.push({ name: "storeLoginPage" });
    }*/
  },
  created() {
    this.loadCategoryList();
    /*if (!localStorage.token) {
      this.$swal.fire({
        title: "Lỗi",
        text: "Lỗi đăng nhập, vui lòng đăng nhập lại"
      });
      this.$router.push({ name: "storeLoginPage" });
    } else {
      this.$store
        .dispatch("storeCheckToken")
        .then(respone => this.handleCheckLogin(respone));
    }*/
  }
};
</script>
<style lang="scss" scoped>
.not-allowed {
  cursor: not-allowed;
}
#control {
  margin-top: 1rem;
  margin-bottom: 1rem;
  button {
    margin: 0 0.1rem;
  }
}
.active {
  background-color: #95d305;
}
.not-allowed {
  cursor: not-allowed;
}
*:focus {
  outline: 0 !important;
}
td {
  i {
    cursor: pointer;
  }
}
.activeSelectAll {
  background-color: #17a2b8;
  color: white;
}
</style>