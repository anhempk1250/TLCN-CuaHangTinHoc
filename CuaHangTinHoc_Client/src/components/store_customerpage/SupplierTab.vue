<template>
  <div>
    <div class="row" style="margin: 1rem 0;">
      <div class="col-md-3" style="padding: 0;">
        <input
          class="form-control row"
          style="width: 100%;margin:0;margin-bottom: 0.5rem;"
          placeholder="Nhập tên hoặc nhân viên"
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
          :total-rows="storeEmployeeList.length"
          :per-page="perPage"
          v-model="currentPage"
          aria-controls="employeeTable"
        ></b-pagination>
      </div>
    </div>

    <b-table
      id="employeeTable"
      :fields="fields"
      :items="storeEmployeeList"
      :busy="storeEmployeeLoading"
      :current-page="currentPage"
      :per-page="perPage"
      small
      head-variant="light"
    ></b-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      fields: [
        { key: "id", label: "Tài khoản" },
        { key: "name", label: "Nhân viên" },
        { key: "phone", label: "Điện thoại" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      storeEmployeeList: "storeEmployeeList",
      storeEmployeeLoading: "storeEmployeeLoading"
    })
  },
  created() {
    this.$store.dispatch("getEmployeeAccountList");
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