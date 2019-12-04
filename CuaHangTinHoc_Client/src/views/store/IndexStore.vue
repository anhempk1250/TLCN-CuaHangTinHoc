<template>
  <div>
    <HeaderStore />
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderStore from "../headerStore/headerStore.vue";
import { CommonService } from '../../service/common.service';
var commonService = new CommonService();
export default {
  components: { HeaderStore },
  created() {
    if (!localStorage.token) {
      this.$swal.fire({
        title: 'Lỗi',
        text: 'Lỗi đăng nhập, vui lòng đăng nhập lại'
      })
      this.$router.push({ name: "storeLoginPage" });
    } else {
      this.$store
        .dispatch("storeCheckToken")
        .then(respone => this.handleCheckLogin(respone));
    }
  },
  methods: {
    handleCheckLogin(response) {
      /*if (response.data.errorToken) {
        this.$swal({
          title: "Error",
          text: response.data.errorToken 
        }).then(() => this.affterCheckLogin());
      }*/
      commonService.checkErrorToken(response, this)
    },
    /*affterCheckLogin() {
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      this.$router.push({ name: "storeLoginPage" });
    }*/
  }
};
</script>
<style scoped>
div {
  width: 100%;
  height: 100%;
  font-family: Roboto, sans-serif;
}
</style>