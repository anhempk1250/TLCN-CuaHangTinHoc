<template>
  <div>
    <h3 class="text-left" style="margin-bottom: 1rem;">Danh sách sản phẩm đã mua</h3>
    <b-table :busy="customerOrderLoading" style="font-size:14px" :items="customerOrderList" :fields="fields" small>
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template v-slot:cell(name)="data">{{fixName(data.item.name)}}</template>
      <template v-slot:cell(control)="data">
        <button
          type="button"
          class="btn btn-warning btn-sm"
          data-toggle="modal"
          data-target=".bd-comment-modal-xl"
          @click="setSelected(data.item)"
        >Nhận xét</button>
      </template>
    </b-table>
    <CommentModal :product="selected" />
  </div>
</template>
<script>
import CommentModal from "../comment_modal/CommetModal.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      fields: [
        { key: "order_id", label: "Mã đơn hàng" },
        { key: "id", label: "Mã sản phẩm" },
        { key: "name", label: "Tên sản phẩm" },
        { key: "control", label: "" }
      ],
      selected: {}
    };
  },
  components: { CommentModal },
  methods: {
    fixName(str) {
      if (str.length > 45) return str.slice(0, 45) + "...";
      else return str;
    },
    setSelected(product) {
      this.selected = product;
    }
  },
  computed: {
    ...mapGetters({
      customerOrderList: "customerOrderSSList",
      customerOrderLoading: "customerOrderSSLoading"
    })
  },
  created() {
    this.$store.dispatch("getCustomerOrderSuccess").then(response => {
      console.log(response.data.list);
    });
  }
};
</script>
<style scoped>
</style>