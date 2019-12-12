<template>
  <div>
    <nav class="navbar navbar-expand-lg" style="background-color:#068f94;">
      <div class="nav-item dropdown ml-auto">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          style="color:white"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >Thông tin cá nhân</a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link
            class="dropdown-item"
            data-toggle="modal"
            data-target="#employee_modal"
            :to="{name: 'info'}"
          >Thông tin</router-link>
          <a class="dropdown-item" href="#" @click="logout()">Đăng xuất</a>
        </div>
      </div>
    </nav>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push({name: 'storeLoginPage'})
    }
  }
};
</script>
<style lang="scss" scoped>
</style>