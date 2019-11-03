<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target=".bd-comment-modal-xl"
    >Product</button>
    <CommentModal />
  </div>
</template>
<script>
import CommentModal from "../comment_modal/CommetModal.vue";
export default {
  data() {
    return {};
  },
  components: { CommentModal },
  methods: {}
};
</script>
<style scoped>
</style>