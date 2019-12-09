<template>
  <div>
    <h1 style="margin-bottom: 2rem;">Đăng nhập tài khoản để thực hiện đặt hàng</h1>
    <b-tabs pills card vertical style="background-color:white">
      <b-tab title="Đăng Nhập">
        <h3 class="text-left">Đăng Nhập</h3>
        <div class="row">
          <div class="col-7">
            <div class="row">
              <input
                v-model="customer.id"
                class="col form-control"
                v-on:keyup.enter="login(0)"
                placeholder="Tài khoản"
              />
            </div>
            <div class="row">
              <input
                v-model="customer.password"
                class="col form-control"
                v-on:keyup.enter="login(0)"
                type="password"
                placeholder="Mật Khẩu"
              />
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
                <a
                  data-dismiss="modal"
                  v-on:click="login(0)"
                  class="btn btn-primary"
                  style="width: 100%;"
                >Đăng Nhập</a>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="row">
              <div class="col" style="padding: 0;">
                <a
                  style="width: 100%;margin-bottom:1rem"
                  href="https://localhost:8001/auth/facebook"
                  class="btn btn-primary loginBtn loginBtn--facebook"
                >Đăng nhập Facebook</a>
                <a
                  style="width: 100%;"
                  class="btn loginBtn loginBtn--google"
                  href="https://localhost:8001/auth/google"
                >Đăng nhập Google</a>
              </div>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab title="Đăng Ký">
        <div class="row">
          <div class="col">
            <input
              id="firstName"
              type="text"
              class="form-control"
              placeholder="Họ tên"
              v-model="customer.name"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <input
              class="form-control"
              placeholder="Số điện thoại"
              v-model="customer.id"
              type="number"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="customer.password"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <input
              id="confirm-password"
              type="password"
              class="form-control"
              placeholder="Nhập lại mật khẩu"
              v-model="confirm"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <input
              id="address"
              type="text"
              class="form-control"
              placeholder="Địa chỉ"
              v-model="customer.address"
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <button
              class="btn btn-primary"
              style="width: 100%"
              data-dismiss="modal"
              @click="createAccount()"
            >Tạo tài khoản</button>
          </div>
        </div>
      </b-tab>
    </b-tabs>
    <div class="container">
      {{studentName}}
      <input v-model="studentName">
      <button @click="changeName">đổi tên</button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      studentName: 'Đào Lê Văn Vinh',
      confirm: "",
      customer: {
        id: "",
        name: "",
        password: "",
        address: ""
      }
    };
  },
  methods: {
    changeName(){
      this.studentName = "Tăng Anh Hào";
    },
    checkBox() {
      this.checked = !this.checked;
    },
    checkInfo() {
      if (this.customer.password != this.confirm) {
        this.$swal.fire({
          icon: "error",
          title: "Thông báo",
          text: "Mật khẩu không trùng khớp"
        });
        return false;
      }

      if (
        this.customer.id == "" ||
        this.customer.name == "" ||
        this.customer.address == "" ||
        this.customer.password == ""
      ) {
        this.$swal.fire({
          icon: "error",
          title: "Thông báo",
          text: "Nhập thiếu thông tin"
        });
        return false;
      }
      return true;
    },
    createAccount() {
      if (this.checkInfo()) {
        this.$store
          .dispatch("insertAccountCustomer", this.customer)
          .then(response => this.afterRegister(response));
      }
    },
    afterRegister(response) {
      if (response.data.msg) {
        this.$swal({
          icon: "error",
          title: "Thông báo",
          text: response.data.msg
        });
      }
      if (response.data.RequestSuccess) {
        this.customer = {};
      }
    },
    login() {
      this.$store
        .dispatch("customerLogin", this.customer)
        .then(respone => this.affterLogin(respone));
    },
    affterLogin(respone) {
      if (respone.data.msg && respone.data.msg != "") {
        this.$swal.fire({
          title: respone.data.title,
          text: respone.data.msg
        });
      }
      if (respone.data.token) {
        localStorage.ctoken = respone.data.token;
        this.$router.push({ name: "mypage" });
      }
    }
  },
  computed: {
    ...mapGetters({
      customerAccountMessage: "customerAccountMessage",
      customerAccountObject: "customerAccountObject"
    }),
    loadShowModal() {
      return this.studentName;
    }
  }
};
</script>
<style lang="scss" scoped>
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

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 38px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #fff;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
}
/* Facebook */
.loginBtn--facebook {
  background-color: #4c69ba;
  background-image: linear-gradient(#4c69ba, #3b55a0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354c8c;
}
.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png")
    6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5b7bd5;
  background-image: linear-gradient(#5b7bd5, #4864b1);
}

/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #dd4b39;
}
.loginBtn--google:before {
  border-right: #bb3f30 1px solid;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
    6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #e74b37;
}
</style>