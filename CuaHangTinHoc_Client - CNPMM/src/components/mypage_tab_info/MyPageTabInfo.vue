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
            <select title="Ngày" class="form-control">
              <option selected value="-1">Ngày</option>
              <option v-for="index in 31" :key="index" :value="index">{{index}}</option>
            </select>
          </div>
          <div class="col">
            <select title="Tháng" class="form-control">
              <option selected value="-1">Tháng</option>
              <option v-for="index in 12" :key="index" :value="index">{{index}}</option>
            </select>
          </div>
          <div class="col">
            <select title="Năm" class="form-control">
              <option selected value="-1">Năm</option>
              <option
                v-for="index in (new Date().getFullYear() - 1981)"
                :key="index"
                :value="index"
              >{{1980 + index}}</option>
            </select>
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

    <div v-if="false">
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
  props: ["customer"],
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