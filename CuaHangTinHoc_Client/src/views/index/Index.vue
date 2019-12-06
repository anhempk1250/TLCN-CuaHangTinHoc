<template>
<body id="index">
  <Header />
  <router-view class="bodyContent" />
  <Footer />
</body>
</template>
<script>
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      customerAccountObject: "customerAccountObject",
      customerAccountLoading: "customerAccountLoading"
    })
  },
  components: { Header, Footer },
  mounted() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
  methods: {
    handleGetCusInfo(response) {
      if (response.data.errorToken) {
        this.$swal({
          title: "Thông báo",
          text: response.data.msg
        });
        if (localStorage.ctoken) localStorage.removeItem("ctoken");
        this.$router.push({ name: "home-page" });
      } else {
        localStorage.cname = this.customerAccountObject.name;
      }
    }
  },
  created() {
    this.$store.dispatch(
      "updateProductHistory",
      localStorage.productHistoryList
    );
    if (localStorage.ctoken) {
      this.$store
        .dispatch("checkLoginCustomer")
        .then(response => this.handleGetCusInfo(response));
    }
  }
};
</script>
<style scoped lang="scss">
#index {
  font-family: Roboto, sans-serif;
}
div {
  text-align: center;
}
.bodyContent {
  background-color: #e9ebea;
  padding: 2% 5%;
}
</style>