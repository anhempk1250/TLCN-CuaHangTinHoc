<template>
  <div>
    <h3 class="text-left">Đơn hàng của tôi</h3>
    <b-table>
        <template v-slot:cell(action)="row">
          <button class="btn btn-danger btn-sm">Hủy</button>
        </template>
    </b-table>
    <table class="table">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày mua</th>
            <th>Sản phẩm</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>27/10/2019</td>
            <td>abc</td>
            <td>45646546546</td>
            <td>Giao hàng thành công</td>
          </tr>
        </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      feild: [
        {key: 'id', label: 'Mã đơn hàng'},
        {key: 'time', label: 'Mã đơn hàng'},
        {key: 'productName', label: 'Mã đơn hàng'},
        {key: 'totalPrice', label: 'Mã đơn hàng'},
        {key: 'status', label: 'Mã đơn hàng'},
        {key: 'action'},
      ]
    }
  }
};
</script>
<style scoped>
</style>