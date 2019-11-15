<template>
  <div>
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
            <button style="width: 100%;" class="btn btn-primary">Đăng nhập với Facebook</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
</style>