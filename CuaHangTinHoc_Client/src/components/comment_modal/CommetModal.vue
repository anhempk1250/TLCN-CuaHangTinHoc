<template>
  <div>
    <div
      id="comment_modal"
      class="modal fade bd-comment-modal-xl"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myExtraLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content" style="padding: 2rem 2.5rem;">
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col">
                  <h5 class="text-left">{{product.name}}</h5>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <router-link
                    v-if="product.id"
                    :to="{name: 'product', params: {id: product.id}}"
                    data-dismiss="modal"
                  >
                    <img
                      style="width:15rem;height: 14rem"
                      :src="'http://localhost:8000/storage/images/'+product.id+'/1.png'"
                      alt="image"
                    />
                  </router-link>
                </div>
              </div>
            </div>
            <div class="col text-left">
              <div class="row">
                <div class="col">
                  <h3>GỬI NHẬN XÉT CỦA BẠN</h3>
                </div>
              </div>
              <div class="row">
                <h5 style="margin-left: 15px;">1. Đánh giá của bản về sản phẩm này :</h5>
                <div>
                  <StarsRating
                    style="margin-top: -0.8rem;margin-left:1rem;"
                    v-model="stars"
                    :star-size="30"
                    :show-rating="false"
                    :rating="5"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <h5>2. Nhận xét của bạn</h5>
                  <textarea v-model="comment" style="height: 10rem" class="form-control"></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <button
                    @click="insertComment"
                    data-dismiss="modal"
                    class="btn btn-warning ml-auto"
                  >Gửi nhận xét</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StarsRating from "vue-star-rating";
export default {
  data() {
    return {
      comment: "",
      stars: 5
    };
  },
  components: {
    StarsRating
  },
  props: ["product"],
  watch: {
    product(newVal) {
      this.product = newVal;
    }
  },
  methods: {
    insertComment() {
      let product_order = {
        product_id: this.product.id,
        order_id: this.product.order_id,
        comment: this.comment,
        stars: this.stars
      };
      //alert(this.stars)
      this.$store
        .dispatch("insertOrderComment", product_order)
        .then(response => {
          if (response.data.msg) {
            let type = "success";
            if (!response.data.RequestSuccess) {
              type = "error";
            }
            this.$swal({
              type: type,
              text: response.data.msg
            });
            this.comment = "";
            this.stars = 5;
          }
          if (response.data.RequestSuccess) {
            this.$store.dispatch("getCustomerOrderSuccess");
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.row {
  .col {
    .row {
      margin: 1rem 0rem;
    }
  }
}
</style>