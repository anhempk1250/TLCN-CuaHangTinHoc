<template>
  <div>
    <div class="row">
      <div class="col">
        <h3 class="text-left">Nhận xét của tôi</h3>
      </div>
    </div>
    <div class="container" style="background-color: #e9ebea;margin: 1rem 0;">
      <div class="row">
      <div class="col">
        <div class="row">
          <div class="col-2">image</div>
          <div class="col-10">
            <div class="row text-left">
              <div class="col">Product Name</div>
            </div>
            <div class="row text-left">
              <div class="col">Time Comment</div>
            </div>
            <div class="row text-left">
              <div class="col-2">Đánh giá:</div>
              <div class="col-9" style="padding:0;">
                <StarsRating
                  style="margin-top: -0.25rem;margin-left: -1.5rem;"
                  :star-size="20"
                  :show-rating="false"
                  :read-only="true"
                  :rating="4"
                />
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
  components: { StarsRating }
};
</script>
<style scoped>
</style>