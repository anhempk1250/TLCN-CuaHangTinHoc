<template>
  <div id="rightMenu">
    <div class="customerContainer myfont">
      <div class="row">
        <div class="col-md-4">
          <b>Khách hàng</b>
        </div>
        <div class="col-md-8">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Tìm khách hàng"
              aria-describedby="button-addon2"
            />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" id="button-addon2">Thêm</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <b>Ngày bán</b>
        </div>
        <div class="col-md-8">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Hôm nay"
              aria-describedby="button-addon2"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <b>Ghi chú</b>
        </div>
        <div class="col-md-8">
          <textarea class="form-control"></textarea>
        </div>
      </div>
    </div>
    <div class="infoPayment myfont">
      <h5>
        <i class="fa fa-info-circle blue"></i> Thông tin thanh toán
      </h5>
      <hr />
      <div class="row">
        <div class="col-md-4">
          <b>Hình thức</b>
        </div>
        <div class="col-md-8">
          <div class="row">
            <div class="col">
              <label>
                <input type="radio" name="payment" /> Tiền mặt
              </label>
            </div>
            <div class="col">
              <label>
                <input type="radio" name="payment" /> Thẻ
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <b>Tiền hàng</b>
        </div>
        <div class="col-md-8">
          <label>0</label>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <b>Mã giảm giá</b>
        </div>
        <div class="col-md-8">
          <input class="form-control" type="number" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <b>Tổng tiền</b>
        </div>
        <div class="col-md-8">
          <label>0</label>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <b>Khách đưa</b>
        </div>
        <div class="col-md-8">
          <input class="form-control" type="number" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-4"><b>Tiền thừa</b></div>
        <div class="col-md-8">0</div>
      </div>
      <div class="row">
        <div class="col">
          <button class="btn btn-primary save"><i class="fa fa-check"></i> Lưu</button>
          <button class="btn btn-danger cancel"><i class="fa fa-arrow-left"></i> Trở về</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.myfont {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
}
.col-md-4 {
  b {
    margin-left: 0.5rem;
  }
}

.customerContainer {
  margin-bottom: 2rem;
}
.infoPayment {
  h5 {
    color: blue;
  }
  .row {
    margin-bottom: 0.5rem;
  }
  button {
    position: absolute;
    margin-top: 1rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .save {
    right: 6rem;
  }
  .cancel {
    right: 0;
  }
}
</style>