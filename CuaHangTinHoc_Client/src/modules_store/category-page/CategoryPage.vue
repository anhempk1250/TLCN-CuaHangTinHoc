
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
        <button class="btn btn-primary">
          <i class="fa fa-search"></i> Tìm kiếm
        </button>
      </div>
      <div class="col-md-3">
        <b-pagination
          v-model="currentPage"
          :total-rows="categoryList.length"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </div>
    </div>

    <!--
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
      <tbody v-if="!categoryLoading" style="font-size: 14px;">
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
            class="text-center"
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
    -->
    <b-table
      selectable
      fixed
      select-mode="multi"
      @row-selected="selectRow"
      style="font-size: 14px;"
      head-variant="light"
      :busy="categoryLoading"
      :items="categoryList"
      :current-page="currentPage"
      :per-page="perPage"
      :fields="fields"
    >
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Loading...</strong>
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

      <template v-slot:cell(control)="data">
        <i
          title="Sửa"
          data-toggle="modal"
          data-target="#model_category"
          @click="setUpdate(data.item)"
          class="fas fa-edit"
          style="margin-right: 1rem;"
        ></i>
        <i title="Xóa" class="fas fa-trash"></i>
      </template>
    </b-table>

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
      perPage: 2,
      insert: true,
      selected: [],
      inputSearch: "",
      selectedForUpdate: {},
      items: [
        {
          isActive: true,
          age: 40,
          name: { first: "Dickerson", last: "Macdonald" }
        },
        { isActive: false, age: 21, name: { first: "Larsen", last: "Shaw" } },
        {
          isActive: false,
          age: 9,
          name: { first: "Mini", last: "Navarro" },
          _rowVariant: "success"
        },
        { isActive: false, age: 89, name: { first: "Geneva", last: "Wilson" } },
        { isActive: true, age: 38, name: { first: "Jami", last: "Carney" } },
        { isActive: false, age: 27, name: { first: "Essie", last: "Dunlap" } },
        { isActive: true, age: 40, name: { first: "Thor", last: "Macdonald" } },
        {
          isActive: true,
          age: 87,
          name: { first: "Larsen", last: "Shaw" },
          _cellVariants: { age: "danger", isActive: "warning" }
        },
        { isActive: false, age: 26, name: { first: "Mitzi", last: "Navarro" } },
        {
          isActive: false,
          age: 22,
          name: { first: "Genevieve", last: "Wilson" }
        },
        { isActive: true, age: 38, name: { first: "John", last: "Carney" } },
        { isActive: false, age: 29, name: { first: "Dick", last: "Dunlap" } }
      ],
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
    }
  },
  methods: {
    formatProperty(property) {
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
    selectAll() {
      this.selected = this.categoryList;
    },
    selectRow(items) {
      this.selected = items;
    },
    loadCategoryList() {
      this.$store.dispatch("getStoreCategory", localStorage.token);
    }
  },
  created() {
    console.log('created');
    this.loadCategoryList();
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