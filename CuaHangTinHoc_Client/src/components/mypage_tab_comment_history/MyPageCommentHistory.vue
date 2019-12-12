<template>
  <div>
    <div class="row">
      <div class="col">
        <h3 class="text-left">Nhận xét của tôi</h3>
      </div>
    </div>
    <div v-if="customerOrderCommentLoading">
      <b-spinner variant="primary" type="grow" style="width: 100px;height:100px;"></b-spinner>
      <b-spinner variant="primary" type="grow" style="width: 100px;height:100px;"></b-spinner>
      <b-spinner variant="primary" type="grow" style="width: 100px;height:100px;"></b-spinner>
    </div>
    <div v-if="!customerOrderCommentLoading">
      <div
        v-for="(product,index) in customerOrderCommentList"
        :key="index"
        class="container"
        style="background-color: #e9ebea;margin: 1rem 0;"
      >
        <div class="row">
          <div class="col">
            <div class="row" style="padding: 1rem">
              <div class="col-2" style="background-color:white">
                <router-link :to="{name: 'product', params: {id: product.id}}">
                  <img
                    alt="image"
                    :src="'http://localhost:8000/storage/images/'+product.id+'/1.png'"
                  />
                </router-link>
              </div>
              <div class="col-10">
                <div class="row text-left" style="margin-bottom: 1rem">
                  <div class="col">
                    <b>Tên sản phẩm:</b>
                    {{product.name}}
                  </div>
                </div>
                <div class="row text-left" style="margin-bottom: 1rem">
                  <div class="col">
                    <b>Nhận xét:</b>
                    {{product.comment}}
                  </div>
                </div>
                <div class="row text-left" style="margin-bottom: 1rem">
                  <div class="col-2">
                    <b>Đánh giá:</b>
                  </div>
                  <div class="col-9" style="padding:0;">
                    <StarsRating
                      style="margin-top: -0.25rem;margin-left: -1.5rem;"
                      :star-size="20"
                      :show-rating="false"
                      :read-only="true"
                      :rating="product.stars"
                    />
                  </div>
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
import { mapGetters } from "vuex";
export default {
  components: { StarsRating },
  computed: {
    ...mapGetters({
      customerOrderCommentList: "customerOrderCommentList",
      customerOrderCommentLoading: "customerOrderCommentLoading"
    })
  },
  created() {
    this.$store.dispatch("getCustomerOrderComment");
  }
};
</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
  background-color: transparent;
}
</style>