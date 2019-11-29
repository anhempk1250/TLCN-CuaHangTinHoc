<template>
  <div>
    <HeaderStore />
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderStore from "../headerStore/headerStore.vue";
export default {
  components: { HeaderStore },
  created() {
    if (!localStorage.token) {
      this.$router.push({ name: "storeLoginPage" });
      this.$swal({
        title: "Error",
        text: "Vui lòng xác thực lại"
      })
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
          text: respone.data.msg
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
div {
  width: 100%;
  height: 100%;
  font-family: Roboto, sans-serif;
}
</style>