<template>
  <div>
    <div
      class="modal fade bd-comment-modal-xl"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myExtraLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content" style="padding: 2rem 2.5rem;">
          <div class="row">
            <div class="col text-left">
              <div class="row">
                <div class="col">
                  <h3>GỬI NHẬN XÉT CỦA BẠN</h3>
                </div>
              </div>
              <div class="row">
                <h5 style="margin-left: 15px;">1. Đánh giá của bản về sản phẩm này :</h5>
                <StarsRating
                  style="margin-top: -0.8rem;margin-left:1rem;"
                  :star-size="30"
                  :show-rating="false"
                  :rating="5"
                />
              </div>
              <div class="row">
                <div class="col">
                  <h5>2. Tiểu đề nhận xét</h5>
                  <input class="form-control" />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <h5>3. Nhận xét của bạn</h5>
                  <textarea class="form-control"></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <button class="btn btn-warning ml-auto">Gửi nhận xét</button>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="row">
                <div class="col">
                  <h3>Product Name</h3>
                </div>
              </div>
              <div class="row">
                <div class="col-8">
                  <img style="width:15rem;height: 14rem" src="https://salt.tikicdn.com/cache/550x550/ts/product/b7/16/37/b68d0775f476602fe7144c9ce0e1af0c.jpg" alt="image" />
                </div>
                <div class="col-4">
                  <StarsRating
                    style="margin-top: -0.8rem;margin-left:1rem;"
                    :star-size="30"
                    :show-rating="false"
                    :increment="0.5"
                    :rating="3.5"
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
  components: {
    StarsRating
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