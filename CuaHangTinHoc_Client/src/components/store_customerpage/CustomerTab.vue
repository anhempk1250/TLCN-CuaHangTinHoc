<template>
  <div>
    <div class="row" style="margin: 1rem 0;">
      <div class="col-md-3" style="padding: 0;">
        <input
          class="form-control row"
          style="width: 100%;margin:0;margin-bottom: 0.5rem;"
          placeholder="Nhập tên hoặc mã khách hàng"
          v-model="inputSearch"
        />
      </div>
      <div class="col-md-3">
        <select style="font-size: 14px;" class="form-control">
          <option selected>Tất cả</option>
          <option>Khách hàng đã mua hàng</option>
          <option>Khách hàng chưa mua hàng</option>
        </select>
      </div>
      <div class="col-md-3">
        <button class="btn btn-primary">
          <i class="fa fa-search"></i> Tìm kiếm
        </button>
      </div>
      <div class="col-md-3">
        <b-pagination
          style="right:1rem;position:absolute;"
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
          <th style="width: 15%;">Mã khách hàng</th>
          <th style="width: 20%;">Tên khách hàng</th>
          <th style="width: 10%;">Điện thoại</th>
          <th style="width: 15%">Địa chỉ</th>
          <th style="width: 15%;">Lần cuối mua hàng</th>
          <th style="width: 15%">Tổng tiền hàng</th>
          <th style="width: 10%"></th>
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
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#control {
  button {
    margin: 0 0.1rem;
  }
}
</style>