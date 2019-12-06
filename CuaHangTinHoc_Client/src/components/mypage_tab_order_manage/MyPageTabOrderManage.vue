<template>
  <div>
    <h3 class="text-left">Đơn hàng của tôi</h3>
    <b-table
      small
      style="font-size:13px;"
      sticky-header
      head-variant="light"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="fields"
      :busy="customerOrderLoading"
      :items="customerOrderList"
    >
      <template v-slot:cell(total_price)="data">{{fixFormatVND(data.item.total_price)}}đ</template>
      <template v-slot:cell(status)="data">{{fixFormatVND(data.item.status.name)}}</template>
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template v-slot:cell(action)="row">
        <button
          class="btn btn-success btn-sm"
          style="margin-right:1rem"
          @click="setUpdate(row.item)"
          data-toggle="modal"
          data-target="#order_modal"
        >Chi tiết</button>
        <button
          class="btn btn-danger btn-sm"
          :disabled="row.item.status.id!=2"
          @click="cancelOrder(row.item)"
        >Hủy</button>
      </template>
    </b-table>
    <b-pagination
      small
      :total-rows="customerOrderList.length"
      :per-page="perPage"
      v-model="currentPage"
      v-if="customerOrderList"
    ></b-pagination>
    <div
      v-if="loadSelected && loadSelected.status"
      ref="modal"
      class="modal fade"
      id="order_modal"
      tabindex="-1"
      role="dialog"
      style="margin-top:0;padding:0;"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Chi tiết đơn hàng</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label class="col-md-3">Mã đơn hàng: {{loadSelected.id}}</label>
            <label class="col-md-3">Ngày bán: {{loadSelected.created_at}}</label>
            <label class="col-md-3">Trạng thái: {{loadSelected.status.name}}</label>
            <b-table
              small
              bordered
              head-variant="light"
              :items="loadSelected.product_list"
              :fields="fieldsDetailProduct"
            >
              <template v-slot:cell(price)="data">{{fixFormatVND(data.item.price)}}đ</template>
              <template
                v-slot:cell(total_price)="data"
              >{{fixFormatVND(data.item.price * data.item.pivot.ProductCount)}}đ</template>
            </b-table>
            <div class="row">
              <div class="col-12 col-md-3">Tổng tiền: {{fixFormatVND(loadSelected.total_price)}}đ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { CommonService } from "../../service/common.service";
import { mapGetters } from "vuex";
var commonService = new CommonService();
export default {
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      selected: {},
      fields: [
        { key: "id", label: "Mã đơn hàng" },
        { key: "created_at", label: "Thời gian" },
        { key: "total_price", label: "Tổng tiền" },
        { key: "status", label: "Trạng thái" },
        { key: "action", label: "" }
      ],
      fieldsDetailProduct: [
        { key: "id", label: "Mã sản phẩm" },
        { key: "name", label: "Sản phẩm" },
        { key: "pivot.ProductCount", label: "Số lượng" },
        { key: "price", label: "Giá" },
        { key: "total_price", label: "Thành tiền" }
      ]
    };
  },
  methods: {
    setUpdate(order) {
      console.log(order);
      this.selected = order;
    },
    fixFormatVND(str) {
      return commonService.fixFormatVND(str);
    },
    cancelOrder(order) {
      let vm = this;
      this.$swal({
        title: "Thông báo",
        text: "Bạn muốn hủy đơn hàng ?",
        showCancelButton: true
      }).then(result => vm.handleCancelOrder(result, order));
    },
    handleCancelOrder(result, order) {
      if (result.value) {
        var vm = this;
        this.$store.dispatch("cancelCustomerOrder", order).then(response => {
          if (response.data.msg) {
            vm.$swal({
              title: "Thông báo",
              text: response.data.msg
            });
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      customerOrderList: "customerOrderList",
      customerOrderLoading: "customerOrderLoading"
    }),
    loadSelected() {
      return this.selected;
    }
  },
  created() {
    let vm = this;
    this.$store.dispatch("getCustomerOrder").then(() => {
      console.log(vm.customerOrderList, "vinh ơi");
    });
  }
};
</script>
<style scoped>
</style>