<template>
  <div>
    <div class="row" style="background-color: #e9ebea;margin:0;padding: 1rem;">
      <h5 class="text-left" style="margin-top:0.5rem;color:#307ECC">
        <p>Tài khoản</p>
      </h5>
      <button
        v-if="!control"
        class="btn btn-primary"
        style="position: absolute;right: 2rem;"
        data-toggle="modal"
        data-target="#login_modal"
      >
        <i class="fas fa-plus"></i>
        Thêm mới tài khoản
      </button>
      <registerModel :store="true"></registerModel>
    </div>
    <b-tabs style="margin-top: 1rem">
      <b-tab title="Khách hàng">
        <customerTab></customerTab>
      </b-tab>
      <b-tab title="Nhân viên">
        <employeeTab></employeeTab>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import customerTab from "../../components/store_customerpage/CustomerTab";
import registerModel from "../../components/login_modal/Login_modal";
import employeeTab from '../../components/store_customerpage/SupplierTab';
export default {
  components: {
    customerTab,
    registerModel,
    employeeTab
  },
  data() {
    return {
      isCustomer: true,
      control: false,
      object: [{ name: "Khách hàng" }, { name: "Nhà cung cấp" }],
      currentTabName: "Khách hàng"
    };
  },
  methods: {
    customerTab() {
      this.currentTabName = this.object[0].name;
      this.isCustomer = true;
      this.control = false;
    },
    supplierTab() {
      this.currentTabName = this.object[1].name;
      this.isCustomer = false;
      this.control = false;
    }
  },
  computed: {
    loadCurrentTabName() {
      return this.currentTabName;
    }
  }
};
</script>
<style scoped>
</style>