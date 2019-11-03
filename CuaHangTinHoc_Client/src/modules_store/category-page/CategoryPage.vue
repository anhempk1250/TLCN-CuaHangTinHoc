
<template>
  <div>
    <div class="row" style="background-color: #e9ebea;margin:0;padding: 1rem;">
      <h5 class="text-left" style="margin-top:0.5rem;">Danh Mục Sản Phẩm</h5>
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
      <div class="col-md-6" style="padding: 0;">
        <input
          id="categoryInputSearch"
          class="form-control"
          style="width: 100%;"
          placeholder="Tìm Kiếm"
          v-model="inputSearch"
        />
      </div>
      <div class="col-md-3">
        <button class="btn btn-primary"><i class="fa fa-search"></i> Tìm kiếm</button>
      </div>
      <div class="col-md-3">
        <b-pagination
          style="right:15px;position:absolute;"
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
          <th style="width: 15%;">Mã Danh Mục</th>
          <th style="width: 15%;">Tên Danh Mục</th>
          <th style="width: 30%;">Thuộc Tính Sản Phẩm</th>
          <th style="width: 10%">Số Lượng</th>
          <th style="width: 15%;">Người Nhập</th>
          <th style="width: 15%"></th>
        </tr>
      </thead>
      <tbody style="font-size: 14px;">
        <tr
          v-for="(category,index) in categoryList"
          :key="index"
          style="word-break: break-word;"
          class="text-center"
          :class="{'table-success' :  loadSelected.includes(category)}"
          :style="formatForSearch(category,loadInputSearch)"
        >
          <td v-on:click="checkItem(category)">ABCDS{{category.id}}</td>
          <td v-on:click="checkItem(category)">{{category.name}}</td>
          <td
            v-on:click="checkItem(category)"
            class="text-left"
          >{{formatProperty(category.property)}}</td>
          <td v-on:click="checkItem(category)">{{category.numberOfProduct}}</td>
          <td v-on:click="checkItem(category)">{{category.employeeName}}</td>
          <td>
            <i
              title="Sửa"
              data-toggle="modal"
              data-target="#model_category"
              @click="setUpdate(category)"
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
      <button class="btn btn-info" @click="selectAll()">Chọn tất cả</button>
      <button class="btn btn-dark" v-on:click="cancel()">
        <i class="fas fa-window-close"></i> Hủy
      </button>
      <ModalCategory :insert="insert" :categorySelected="loadSelectedForUpdate" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ModalCategory from "../../components/category_modal/CategoryModal.vue";
export default {
  data() {
    return {
      currentPage: 1,
      insert: true,
      selected: [],
      inputSearch: "",
      selectedForUpdate: {}
    };
  },
  components: { ModalCategory },
  computed: {
    ...mapGetters({
      categoryList: "categoryList"
    }),
    loadSelected() {
      return this.selected;
    },
    loadInputSearch() {
      return this.inputSearch;
    },
    loadSelectedForUpdate() {
      return this.selectedForUpdate;
    }
  },
  methods: {
    formatProperty(property) {
      let temp = property;
      while (temp.includes("___")) {
        temp = temp.replace("___", ", ");
      }
      return temp;
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
    },
    setUpdate(category) {
      this.selectedForUpdate = category;
      this.selectedForUpdate.propertyList = [];
      this.selectedForUpdate.propertyList = this.selectedForUpdate.property.split(
        "___"
      );
      this.insert = false;
    },
    selectAll(){
      this.selected = this.categoryList;
    }
  },
  created() {
    this.$store.dispatch("getCategoryList");
  }
};
</script>
<style lang="scss" scoped>
#control {
  margin-top: 1rem;
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
</style>