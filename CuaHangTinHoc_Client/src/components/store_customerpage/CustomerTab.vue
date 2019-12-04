<template>
  <div>
    <div class="row" style="margin: 1rem 0;">
      <div class="col-md-3" style="padding: 0;">
        <input
          class="form-control row"
          style="width: 100%;margin:0;margin-bottom: 0.5rem;"
          placeholder="Nhập tên hoặc mã khách hàng"
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
          :total-rows="2"
          :per-page="1"
          aria-controls="my-table"
        ></b-pagination>
      </div>
    </div>

    <b-table
      stickyHeader
      :fields="fields"
      :items="storeCustomerList"
      head-variant="light"
      :busy="storeCustomerLoading"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :tbody-transition-props="transProps"
      primary-key="id"
    >
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </b-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { CommonService } from "../../service/common.service";
var commonService = new CommonService();
export default {
  data() {
    return {
      transProps: {
        // Transition name
        name: "flip-list"
      },
      sortBy: "total_price",
      sortDesc: true,
      customer: {
        id: "",
        name: "",
        address: ""
      },
      fields: [
        { key: "id", label: "Mã khách hàng" },
        { key: "name", label: "Tên khách hàng" },
        { key: "address", label: "Địa chỉ" },
        {
          key: "total_price",
          label: "Tổng số tiền mua",
          formatter: (value, key, item) => {
            return this.calculateTotalPrice(item.orders) + "đ";
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          key: "lastDeal",
          label: "Lần cuối mua hàng",
          formatter: (value, key, item) => {
            return this.getLastDeal(item.orders);
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      storeCustomerList: "storeCustomerList",
      storeCustomerLoading: "storeCustomerLoading"
    })
  },
  methods: {
    calculateTotalPrice(orders) {
      let price = 0;
      for (let i = 0; i < orders.length; i++) {
        price += orders[i].total_price;
      }
      return price * 1000;
    },
    getLastDeal(orders) {
      if (orders.length > 0) {
        let last = orders[0].created_at;
        for (let i = 0; i < orders.length; i++) {
          console.log(
            "1",
            new Date(last).getTime(),
            "2",
            new Date(orders[i].created_at).getTime()
          );
          if (
            new Date(last).getTime() < new Date(orders[i].created_at).getTime()
          ) {
            last = orders[i].created_at;
          }
        }
        return last;
      } else return "";
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
    }
  },
  created() {
    this.$store.dispatch("getCustomerList").then(response => {
      commonService.checkErrorToken(response, this);
    });
  }
};
</script>
<style lang="scss" scoped>
#control {
  button {
    margin: 0 0.1rem;
  }
}
</style>