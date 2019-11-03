<template>
  <div id="login-page">
    <div class="login-form">
      <h5>Cửa Hàng Tin Học</h5>
      <div>
        <div class="login-item">
          <label for="tk">Tài khoản</label>
          <input id="tk" class="form-control" />
        </div>
        <div class="login-item">
          <label for="mk">Mật khẩu</label>
          <input id="mk" type="password" class="form-control" />
        </div>
        <div class="login-item ml-auto">
          <button class="btn btn-info">Đăng nhập</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#login-page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #e9ebea;
  padding-top: 15%;
  overflow: hidden;
  .login-form {
    width: 30%;
    margin: 0 35%;
    padding: 1rem;
    background-color: white;
    border-radius: 5px;
    .login-item {
      margin: 1rem 0;
    }
  }
}
</style>