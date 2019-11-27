<template>
  <div>
    <div id="login_modal" v-if="loadShowModal" class="modal fade login_modal" tabindex="0" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div>
            <b-tabs
              active-nav-item-class="font-weight-bold text-uppercase text-danger"
              content-class="mt-3"
            >
              <b-tab title="Đăng Nhập" v-if="!store">
                <div class="modal-header">
                  <h2 class="modal-title">Chọn Phương Thức Đăng Nhập</h2>
                </div>
                <div class="modal-body">
                  <form class="row">
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
                            style="width: 100%;font-size: 18px;"
                            href="#"
                            class="btn btn-primary"
                             data-dismiss="modal"
                            @click="login(2)"
                          >Đăng nhập Facebook</a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </b-tab>
              <b-tab title="Tạo Tài Khoản">
                <form>
                  <div
                    v-if="customerAccountMessage!=''"
                    class="alert alert-danger"
                    role="alert"
                  >{{customerAccountMessage}}</div>
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
                        placeholder="Tài khoản"
                        v-model="customer.id"
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
                        id="phone"
                        type="text"
                        class="form-control"
                        placeholder="Điện thoại"
                        v-model="customer.phone"
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
                        <input
                          id="CheckPrivacy"
                          @click="checkBox()"
                          class="text-left"
                          type="checkbox"
                          checked
                        /> Tôi đồng ý với điều khoản của công ty
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <button
                        class="btn btn-primary"
                        style="width: 100%"
                        @click="createAccount()"
                      >Tạo tài khoản</button>
                    </div>
                  </div>
                </form>
              </b-tab>
            </b-tabs>
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
      showModal: true,
      checked: true,
      confirm: "",
      customer: {
        id: "",
        name: "",
        password: "",
        phone: "",
        address: ""
      }
    };
  },
  props: {
    store: Boolean
  },
  methods: {
    checkBox() {
      this.checked = !this.checked;
    },
    createAccount() {
      if (!this.checked) {
        alert("Vui lòng chọn đồng ý điều khoản");
      } else {
        this.$store.dispatch("insertAccountCustomer", this.customer);
      }
    },
    login(typeLogin) {
      this.$store
        .dispatch("customerLogin", this.customer,typeLogin)
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
        localStorage.token = respone.data.token;
        this.$router.push({name : 'mypage'});
      }
    }
  },
  computed: {
    ...mapGetters({
      customerAccountMessage: "customerAccountMessage",
      customerAccountObject: "customerAccountObject"
    }),
    loadShowModal(){
      return this.showModal;
    }
  }
};
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