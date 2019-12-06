<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target=".bd-comment-modal-xl"
    >Product</button>
    <div v-for="(order,index) in customerOrderList" :key="index">
      <div v-for="(product,index2) in order.productList" :key="index2">
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target=".bd-comment-modal-xl"
        >{{product.name}}</button>
      </div>
    </div>
    <CommentModal />
  </div>
</template>
<script>
import CommentModal from "../comment_modal/CommetModal.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: { CommentModal },
  methods: {},
  computed: {
    ...mapGetters({
      customerOrderList: "customerOrderList",
      customerOrderLoading: "customerOrderLoading"
    })
  },
  created() {
    //this.$store.dispatch('getCustomerOrderSuccess');
  }
};
</script>
<style scoped>
</style>