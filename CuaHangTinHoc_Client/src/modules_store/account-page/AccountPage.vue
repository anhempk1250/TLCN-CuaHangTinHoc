<template>
  <div>Account Page</div>
</template>
<script>
export default {
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
    handleCheckLogin(respone) {
      if (respone.data.errorToken) {
        this.$swal({
          title: "Error",
          text: respone.data.errorToken 
        }).then(() => this.affterCheckLogin());
      }
    },
    affterCheckLogin() {
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      this.$router.push({ name: "storeLoginPage" });
    }
  }
};
</script>
<style scoped>
</style>