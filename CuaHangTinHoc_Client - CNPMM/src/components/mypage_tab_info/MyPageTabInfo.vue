<template>
  <div style="font-family: Roboto, sans-serif;">
    <div class="row">
      <div class="col-5 offset-2">
        <h3>Thông tin tài khoản</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <label for="latName">Tên</label>
      </div>
      <div class="col-5">
        <input v-model="customer.name" type="text" class="form-control" />
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <label for="email">Email</label>
      </div>
      <div class="col-5">
        <input v-model="customer.email" class="form-control" type="email" />
      </div>
    </div>

    <div class="row">
      <div class="col-2">Ngày Sinh</div>
      <div class="col-5">
        <div class="row" style="padding:0;">
          <div class="col">
            <div class="dropdown">
              <button
                class="btn btn-default dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Ngày</button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="dropdown">
              <button
                class="btn btn-default dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Tháng</button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="dropdown">
              <button
                class="btn btn-default dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >Năm</button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-2" style="margin-top: 0;">
        <label for="sex">Giới tính</label>
      </div>
      <div class="col-5">
        <div class="row" style="padding:0;">
          <div class="col-4 text-left">
            <label for="nam">
              <input type="radio" id="nam" name="sex" checked /> Nam
            </label>
          </div>
          <div class="col-4 text-left">
            <label for="nu">
              <input type="radio" id="nu" name="sex" /> Nữ
            </label>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!customer.facebook_id">
      <div class="row">
      <div class="col-5 offset-2 text-left">
        <label>
          <input type="checkbox" data-toggle="collapse" data-target="#changePassword" /> Thay đổi mật khẩu
        </label>
      </div>
    </div>

    <div class="collapse" id="changePassword">
      <div class="row">
        <div class="col-2">Mật khẩu củ</div>
        <div class="col-5">
          <input type="text" placeholder="Nhập mật khẩu củ" class="form-control" />
        </div>
      </div>

      <div class="row">
        <div class="col-2">Mật khẩu củ</div>
        <div class="col-5">
          <input type="text" placeholder="Nhập mật khẩu mới" class="form-control" />
        </div>
      </div>

      <div class="row">
        <div class="col-2">Mật khẩu củ</div>
        <div class="col-5">
          <input type="text" placeholder="Nhập lại" class="form-control" />
        </div>
      </div>
    </div>
    </div>

    <div class="row">
      <div class="col-5 offset-2">
        <button class="btn btn-warning">Cập nhật</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      changePassword: false
    };
  },
  methods: {
    handleChangePassword() {
      this.changePassword = !this.changePassword;
    }
  },
  props: ['customer'],
  computed: {
    loadChangePassword() {
      return this.changePassword;
    }
  }
};
</script>
<style lang="scss" scoped>
.row {
  padding: 1rem 4rem;
  .col-2 {
    margin-top: 0.5rem;
    text-align: left;
  }
  .col-5 {
    text-align: left;
    .offset-2 {
      button {
        width: 50%;
      }
    }
  }
}
.dropdown {
  width: 100%;
  button {
    border: 1px solid silver;
    width: 100%;
  }
}
</style>