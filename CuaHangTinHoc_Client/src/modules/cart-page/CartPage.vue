<template>
  <div>
    <div class="row">
        <div class="alert alert-success col-12 col-md-12" role="alert">Mã discount hợp lệ</div>
        <div class="alert alert-danger col-12 col-md-12" role="alert">Mã discount không hợp lệ</div>
    </div>
    <div class="row">
      <div class="col col-md-9">
        <div class="row product-item" style="background-color: white;">
          <div class="col col-md-2">Image</div>
          <div class="col col-md-10">
            <div class="row">
              <div class="col-6 col-md-7 text-left">
                <div>Product Name</div>
                <div>
                  <button class="btn btn-danger btn-sm">Xóa</button>
                </div>
              </div>
              <div class="col-6 col-md-5 text-right">
                <div class="row">
                  <div class="col col-md-7">
                    <div>39.000đ</div>
                    <div>% discount</div>
                  </div>
                  <div class="col col-md-4">
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-secondary">-</button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        style="background-color:white;color:black"
                      >5</button>
                      <button type="button" class="btn btn-secondary">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row product-item" style="background-color: white;">
          <div class="col-12 col-md-2">Image</div>
          <div class="col-12 col-md-10">
            <div class="row">
              <div class="col-6 col-md-7 text-left">
                <div>Product Name</div>
                <div>
                  <button class="btn btn-danger btn-sm">Xóa</button>
                </div>
              </div>
              <div class="col-6 col-md-5 text-right">
                <div class="row">
                  <div class="col col-md-7">
                    <div>39.000đ</div>
                    <div>% discount</div>
                  </div>
                  <div class="col col-md-4">
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-secondary">-</button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        style="background-color:white;color:black"
                      >5</button>
                      <button type="button" class="btn btn-secondary">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row product-item" style="background-color: white;">
          <div class="col-12 col-md-2">Image</div>
          <div class="col-12 col-md-10">
            <div class="row">
              <div class="col-6 col-md-7 text-left">
                <div>Product Name</div>
                <div>
                  <button class="btn btn-danger btn-sm">Xóa</button>
                </div>
              </div>
              <div class="col-6 col-md-5 text-right">
                <div class="row">
                  <div class="col col-md-7">
                    <div>39.000đ</div>
                    <div>% discount</div>
                  </div>
                  <div class="col col-md-4">
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-secondary">-</button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        style="background-color:white;color:black"
                      >5</button>
                      <button type="button" class="btn btn-secondary">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row product-item" style="background-color: white;">
          <div class="col-12 col-md-2">Image</div>
          <div class="col-12 col-md-10">
            <div class="row">
              <div class="col-6 col-md-7 text-left">
                <div>Product Name</div>
                <div>
                  <button class="btn btn-danger btn-sm">Xóa</button>
                </div>
              </div>
              <div class="col-6 col-md-5 text-right">
                <div class="row">
                  <div class="col col-md-7">
                    <div>39.000đ</div>
                    <div>% discount</div>
                  </div>
                  <div class="col col-md-4">
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-secondary">-</button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        style="background-color:white;color:black"
                      >5</button>
                      <button type="button" class="btn btn-secondary">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col col-md-3">
        <div class="row" style="background-color: #e9ebea;">
          <div class="col-12 col-md-11 offset-md-1" style="background-color: white;">
            <div class="row">
              <div class="col-12 col-md-12">
                <div class="row">
                  <div
                    class="col-12 col-md-12 text-left price-item"
                    style="border-bottom: 1px solid #333333;"
                  >
                    <span>Tạm tính :</span>
                    <span style="position: absolute;right: 1rem;">39.000đ</span>
                  </div>

                  <div class="col-12 col-md-12 text-left price-item">
                    <span>Thành tiền :</span>
                    <span style="position: absolute;right: 1rem;margin-top: -0.3rem;">
                      <h6 class="total-price">39.000đ</h6>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" style="margin-top: 1rem;">
          <div class="col-12 col-md-11 offset-md-1" style="padding:0;">
            <button class="btn btn-danger btn-order" style="width: 100%;">Tiến hành đặt hàng</button>
          </div>
        </div>

        <div class="row" style="margin-top: 1rem;">
          <div class="col-12 col-md-6 offset-md-1" style="padding:0;">
            <input class="form-control" placeholder="Mã giảm giá" />
          </div>
          <div class="col-12 col-md-5" style="padding:0;">
            <button class="btn btn-warning">Kiểm tra mã</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.price-item {
  padding: 1rem;
  .total-price {
    font-size: 20px;
    color: red;
  }
}
.btn-order {
  width: 100%;
}
.product-item {
  margin-bottom: 1rem;
}
</style>