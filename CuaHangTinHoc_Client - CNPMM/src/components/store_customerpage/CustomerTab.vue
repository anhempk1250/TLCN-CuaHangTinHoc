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
        <button class="btn btn-primary">
          <i class="fa fa-search"></i> Tìm kiếm
        </button>
      </div>
      <div class="col-md-3 offset-md-3">
        <b-pagination
          style="right:1rem;position:absolute;"
          v-if="storeCustomerList"
          v-model="currentPage"
          :total-rows="storeCustomerList.length"
          :per-page="perPage"
        ></b-pagination>
      </div>
    </div>

    <b-table
      id="cusTable"
      small
      :fields="fields"
      :per-page="perPage"
      :items="storeCustomerList"
      :filter="inputSearch"
    ></b-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      inputSearch: "",
      fields: [
        { key: "id", label: "Mã khách hàng" },
        { key: "name", label: "Tên khách hàng" },
        { key: 'phone', label: 'Điện thoại'},
        { key: "address", label: "Địa chỉ" },
        { key: "email", label: "Email" },
        { key: "control", label: "" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      storeCustomerList: "storeCustomerList",
      storeCustomerLoading: "storeCustomerLoading"
    })
  },
  created() {
    this.$store.dispatch("getStoreCustomerList");
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