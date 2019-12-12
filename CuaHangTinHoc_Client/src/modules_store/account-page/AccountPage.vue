<template>
  <div>
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
          <input v-model="storeEmployeeObject.name" type="text" class="form-control" />
        </div>
      </div>

      <div class="row">
        <div class="col-2">
          <label for="email">Điện thoại</label>
        </div>
        <div class="col-5">
          <input v-model="storeEmployeeObject.phone" class="form-control" type="number" />
        </div>
      </div>

      <div class="row">
        <div class="col-2">
          <label for="email">Địa chỉ</label>
        </div>
        <div class="col-5">
          <input v-model="storeEmployeeObject.address" class="form-control" type="text" />
        </div>
      </div>

      <div>
        <div class="row">
          <div class="col-5 offset-2 text-left">
            <label>
              <input v-model="changePassword" type="checkbox" data-toggle="collapse" data-target="#changePassword" /> Thay đổi mật khẩu
            </label>
          </div>
        </div>

        <div class="collapse" id="changePassword">
          <div class="row">
            <div class="col-2">Mật khẩu củ</div>
            <div class="col-5">
              <input type="password" placeholder="Nhập mật khẩu củ" class="form-control" />
            </div>
          </div>

          <div class="row">
            <div class="col-2">Mật khẩu mới</div>
            <div class="col-5">
              <input
                v-model="newPassword"
                type="password"
                placeholder="Nhập mật khẩu mới"
                class="form-control"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-2">Nhập lại</div>
            <div class="col-5">
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="Nhập lại"
                class="form-control"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-5 offset-2">
          <button class="btn btn-warning" @click="updateEmployee">Cập nhật</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      changePassword: false,
      newPassword: "",
      confirmPassword: "",
      employee: {
        name: '',
        phone: '',
        address: '',
        password: '',
      }
    };
  },
  created() {
    if (!localStorage.token) {
      this.$swal.fire({
        title: "Lỗi",
        text: "Lỗi đăng nhập, vui lòng đăng nhập lại"
      });
      this.$router.push({ name: "storeLoginPage" });
    } else {
      let vm = this
      this.$store
        .dispatch("getInfoEmployee")
        .then(() => {
          vm.employee = this.storeEmployeeObject
        });
    }
  },
  computed: {
    ...mapGetters({
      storeEmployeeObject: "storeEmployeeObject",
      storeEmployeeLoading: "storeEmployeeLoading"
    })
  },
  methods: {
    updateEmployee() {
      if (this.changePassword == true && this.newPassword != this.confirmPassword) {
        this.$swal({
          type: "error",
          text: "Mật khẩu không trùng khớp"
        });
      } else {
        let vm = this;
        this.$swal({
          type: "question",
          text: "Bạn muốn thay đổi thông tin",
          showCancelButton: true
        }).then(result => {
          if (result.value) {
            vm.$swal.showLoading();
            vm.employee.password = vm.newPassword;
            vm.employee.changePassword = vm.changePassword;
            vm.$store.dispatch("updateAccountEmployee", vm.employee).then(response => {
              let type = "error";
              if (response.data.RequestSuccess == true) {
                type = "success";
              }
              if (response.data.msg) {
                vm.$swal({
                  type: type,
                  text: response.data.msg
                });
              }
            });
          }
        });
      }
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