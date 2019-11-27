<template>
  <div style="background-color:skyblue;overflow: hidden">
    <div
      class="alert alert-danger text-center"
      style="margin:0"
      role="alert"
      v-if="error!=''"
    >{{error}}</div>
    <div
      class="alert alert-danger text-center"
      style="margin:0"
      role="alert"
      v-if="storeAuthenMsg !=''"
    >{{storeAuthenMsg}}</div>
    <div id="login-page">
      <div class="login-form">
        <h5>Cửa Hàng Tin Học</h5>
        <div>
          <div class="login-item">
            <label for="tk">Tài khoản</label>
            <input
              v-model="employeeAccount.id"
              v-on:keyup.enter="checkLogin()"
              id="tk"
              class="form-control"
            />
          </div>
          <div class="login-item">
            <label for="mk">Mật khẩu</label>
            <input
              v-model="employeeAccount.password"
              v-on:keyup.enter="checkLogin()"
              id="mk"
              type="password"
              class="form-control"
            />
          </div>
          <div class="login-item ml-auto">
            <button class="btn btn-info" @click="checkLogin()">Đăng nhập</button>
          </div>
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
      error: "",
      employeeAccount: {
        id: "",
        password: ""
      }
    };
  },
  methods: {
    checkLogin() {
      this.error = "";
      if (this.employeeAccount.id == "") {
        this.$swal({
          title: "Thông báo",
          text: "Chưa nhập tài khoản"
        });
        return -1;
      }
      if (this.employeeAccount.password == "") {
        this.$swal({
          title: "Thông báo",
          text: "Chưa nhập mật khẩu"
        });
        return -1;
      }
      this.$store
        .dispatch("storeLogin", this.employeeAccount)
        .then(response => this.affterLogin(response));
    },
    affterLogin(response) {
      if (response.data.msg && response.data.msg != "") {
        this.$swal({
          title: response.data.msg.title,
          text: response.data.msg.msg
        });
      } else {
        if (response.data.token != null)
          localStorage.token = response.data.token;
        this.$router.push({ name: "overview" });
      }
    }
    
  },
  computed: {
    ...mapGetters({
      storeAuthenMsg: "storeAuthenMsg",
      storeEmployeeAccount: "storeEmployeeAccount",
      customerAccountObject: 'customerAccountObject'
    })
  }
};
</script>
<style lang="scss" scoped>
#login-page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: skyblue;
  padding-top: 15%;
  overflow: hidden;
  .login-form {
    width: 30%;
    margin: 0 35%;
    padding: 1rem;
    background-color: #e9ebea;
    border-radius: 5px;
    .login-item {
      margin: 1rem 0;
    }
  }
}
</style>