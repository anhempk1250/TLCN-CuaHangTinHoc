<template>
  <div style="padding: 1rem 0;">

    
    <div class="row" style="margin-bottom: 1rem">
      <div class="col-12 col-md-5">
        <input class="form-control" placeholder="Nhập mã loại" />
      </div>
      <div class="col-12 col-md-3">
        <select class="form-control">
          <option selected>Còn kinh doanh</option>
          <option>Đã xóa</option>
        </select>
      </div>
      <div class="col-12 col-md-3 offset-md-1">
        <b-pagination></b-pagination>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-4">
        <button
          class="btn btn-primary"
          data-toggle="collapse"
          data-target="#insertType"
        >Thêm loại sản phẩm</button>
      </div>
    </div>
    <div class="row collapse" id="insertType">
      <div class="col-12 col-md-4">
        <input class="form-control" placeholder="Nhập tên loại sản phẩm" />
      </div>
    </div>
    <b-table :fields="feilds" :items="items">
      <template v-slot:cell(index)="data">{{data.index+1}}</template>
      <template v-slot:cell(action)="row">
        <i title="Chi tiết" class="fa fa-eye" aria-hidden="true" style="margin-right: 1rem;"></i>
        <i title="Sửa" class="fa fa-edit" aria-hidden="true" style="margin-right: 1rem;"></i>
        <i title="Xóa" class="fa fa-trash" aria-hidden="true"></i>
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      feilds: [
        { key: "index", label: "Số thứ tự" },
        { key: "id", label: "Mã loại" },
        { key: "name", label: "Tên loại" },
        { key: "productCount", label: "Số lượng sản phẩm" },
        { key: "action", label: "" }
      ],
      items: [
        { id: 1, name: "loại 1", productCount: 10 },
        { id: 2, name: "loại 2", productCount: 10 },
        { id: 3, name: "loại 3", productCount: 10 }
      ]
    };
  }
};
</script>
<style scoped>
i {
  cursor: pointer;
}
</style>