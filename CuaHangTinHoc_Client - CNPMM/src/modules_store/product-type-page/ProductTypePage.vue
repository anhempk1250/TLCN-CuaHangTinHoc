<template>
  <div>
    <div class="row" style="background-color: #e9ebea;margin:0;padding: 1rem;">
      <h5 class="text-left" style="margin-top:0.5rem;color:#307ECC">Danh sách loại sản phẩm</h5>
    </div>
    <b-tabs style="margin-top:1rem">
      <b-tab title="Quản lý loại sẩn phẩm" active>
        <ManageTab></ManageTab>
      </b-tab>
      <b-tab title="Loại và sản phẩm">
        <ProductTab></ProductTab>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import ProductTab from '../../components/store_product_type_tab_product/StoreProductTypeTabProduct'
import ManageTab from '../../components/store_product_tab_manage/StoreProductTypeTabManage'
export default {
  components: {
    ProductTab, ManageTab
  },
  data() {
    return {
      fieldsProductType: [
        { key: "STT", label: "STT" },
        { key: "id", label: "Mã loại sản phẩm" },
        { key: "name", label: "Tên loại sản phẩm" },
        { key: "control", label: "" }
      ],
      fieldsProductOfType: [
        { key: "STT", label: "STT" },
        { key: "id", label: "Mã sản phẩm" },
        { key: "name", label: "Tên sản phẩm" },
        { key: "control", label: "" }
      ]
    };
  },
  methods: {}
};
</script>
<style scoped>
</style>