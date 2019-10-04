<template>
  <div>
    <div
      class="modal fade"
      id="login_modal"
      tabindex="0"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="exampleModalCenterTitle">Sign in</h2>
          </div>
          <div class="modal-body">
            <form action="#" method="post">
              <div class="form-group">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    name="username"
                    placeholder="Username"
                    required="required"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="Password"
                    required="required"
                  />
                </div>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary login-btn btn-block">Sign in</button>
              </div>
              <div class="clearfix">
                <label class="pull-left checkbox-inline">
                  <input type="checkbox"/> Remember me
                </label>
                <a href="#" class="pull-right">Forgot Password?</a>
              </div>
              <div class="or-seperator">
                <i>or</i>
              </div>
              <p class="text-center">Login with your social media account</p>
              <div class="text-center social-btn">
                <a href="#" class="btn btn-primary">
                  <i class="fa fa-facebook"></i>&nbsp; Facebook
                </a>
                <a href="#" class="btn btn-info">
                  <i class="fa fa-twitter"></i>&nbsp; Twitter
                </a>
                <a href="#" class="btn btn-danger">
                  <i class="fa fa-google"></i>&nbsp; Google
                </a>
              </div>
            </form>
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
  }
}
</style>