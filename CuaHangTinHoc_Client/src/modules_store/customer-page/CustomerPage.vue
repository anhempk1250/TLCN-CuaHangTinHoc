<template>
  <div>
    <div class="row" style="background-color: #e9ebea;margin:0;padding: 1rem;">
      <h5 class="text-left" style="margin-top:0.5rem;color:#307ECC">
        <p>{{loadCurrentTabName}}</p>
      </h5>
      <button
        v-if="!control"
        class="btn btn-primary"
        style="position: absolute;right: 2rem;"
        data-toggle="modal"
        data-target="#login_modal"
      >
        <i class="fas fa-plus"></i>
        Thêm {{loadCurrentTabName}}
      </button>
      <registerModel :store="true"></registerModel>
      <div v-if="control" style="position: absolute;right: 2rem;">
        <button class="btn btn-primary" @click="save()" style="margin-right:0.1rem;">
          <i class="fa fa-check"></i> Lưu
        </button>
        <button class="btn btn-danger" @click="back()">
          <i class="fa fa-arrow-left"></i> Trở về
        </button>
      </div>
    </div>
    <div class="row" style="margin-top:1rem;">
      <div class="col">
        <b-tabs content-class="mt-3">
          <b-tab title="Khách hàng" active @click="customerTab()">
            <template v-slot:title>
              <i class="fa fa-user"></i> Khách hàng
            </template>
            <customerTab></customerTab>
          </b-tab>
          <b-tab title="Nhà cung cấp" @click="supplierTab()">
            <template v-slot:title>
              <i class="fa fa-truck"></i> Nhà cung cấp
            </template>
            <supplierTab></supplierTab>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import customerTab from "../../components/store_customerpage/CustomerTab";
import supplierTab from "../../components/store_customerpage/SupplierTab";
import registerModel from "../../components/login_modal/Login_modal";

export default {
  components: {
    customerTab,
    supplierTab,
    registerModel
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