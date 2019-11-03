<template>
  <div>
    <div class="modal fade" id="login_modal" tabindex="0" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div>
            <b-tabs
              active-nav-item-class="font-weight-bold text-uppercase text-danger"
              content-class="mt-3"
            >
              <b-tab title="Đăng Nhập">
                <div class="modal-header">
                  <h2 class="modal-title">Chọn Phương Thức Đăng Nhập</h2>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-7">
                      <div class="row">
                        <input class="col form-control" type="email" placeholder="Email" />
                      </div>
                      <div class="row">
                        <input class="col form-control" type="password" placeholder="Mật Khẩu" />
                      </div>
                      <div class="row">
                        <div class="col-6" style="padding: 0;color: black;">
                          <p class="text-left">
                            <label for="remember">
                              <input type="checkbox" id="remember" checked /> Ghi Nhớ ?
                            </label>
                          </p>
                        </div>
                        <div class="col-6" style="padding: 0;color: black;">
                          <a style="margin-right: -2.5rem;" href="#">Quên Mật Khẩu ?</a>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col" style="padding: 0;">
                          <a href="/mypage" class="btn btn-primary" style="width: 100%;">Đăng Nhập</a>
                        </div>
                      </div>
                    </div>
                    <div class="col-5">
                      <div class="row">
                        <div class="col" style="padding: 0;">
                          <button
                            style="width: 100%;"
                            class="btn btn-primary"
                          >Đăng nhập với Facebook</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Tạo Tài Khoản">
                <div class="row">
                  <div class="col">
                    <input
                      id="firstName"
                      type="text"
                      class="form-control"
                      placeholder="Họ và tên lót"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <input id="lastName" type="text" class="form-control" placeholder="Tên" />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <input id="email" type="email" class="form-control" placeholder="Email" />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <input
                      id="password"
                      type="password"
                      class="form-control"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div id="Privacy">
                      Company's Policy Privacy
                      <p>dlkfdsklfmklsdmfklsdmlfmdslkfmksdlmfklsdmfkldsmklfmsdlkfmsdkfdsf</p>
                      <p>dlkfdsklfmklsdmfklsdmlfmdslkfmksdlmfklsdmfkldsmklfmsdlkfmsdkfdsf</p>
                      <p>dlkfdsklfmklsdmfklsdmlfmdslkfmksdlmfklsdmfkldsmklfmsdlkfmsdkfdsfdlkfdsklfmklsdmfklsdmlfmdslkfmksdlmfklsdmfkldsmklfmsdlkfmsdkfdsfdlkfdsklfmklsdmfklsdmlfmdslkfmksdlmfklsdmfkldsmklfmsdlkfmsdkfdsf</p>
                      <p>dlkfdsklfmklsdmfklsdmlfmdslkfmksdlmfklsdmfkldsmklfmsdlkfmsdkfdsf</p>
                      <p>dlkfdsklfmklsdmfklsdmlfmdslkfmksdlmfklsdmfkldsmklfmsdlkfmsdkfdsf</p>
                      <p>dlkfdsklfmklsdmfklsdmlfmdslkfmksdlmfklsdmfkldsmklfmsdlkfmsdkfdsf</p>
                      <p>dlkfdsklfmklsdmfklsdmlfmdslkfmksdlmfklsdmfkldsmklfmsdlkfmsdkfdsf</p>
                      <p>dlkfdsklfmklsdmfklsdmlfmdslkfmksdlmfklsdmfkldsmklfmsdlkfmsdkfdsf</p>
                      <p>dlkfdsklfmklsdmfklsdmlfmdslkfmksdlmfklsdmfkldsmklfmsdlkfmsdkfdsf</p>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <label for="CheckPrivacy">
                      <input id="CheckPrivacy" class="text-left" type="checkbox" /> Tôi đồng ý với điều khoản của công ty
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <button class="btn btn-primary" style="width: 100%">Tạo tài khoản</button>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="scss">
.row {
  margin: 1rem 0;
}
#Privacy {
  width: 100%;
  height: 6rem;
  background-color: silver;
  overflow: scroll;
  overflow-x: hidden;
  padding: 0.5rem;
}
#login_modal {
  .modal-content {
    width: 80%;
    margin: 0 10%;
    .modal-header {
      .modal-title {
        width: 100%;
        text-align: center;
      }
    }
    .modal-body {
      padding: 0;
    }
  }
}
</style>