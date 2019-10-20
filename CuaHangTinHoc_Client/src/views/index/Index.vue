<template>
  <body id="index">
    <Header/>
    <router-view class='bodyContent' />
    <Footer/>
  </body>
</template>
<script>
import Header from "../header/Header";
import Footer from "../footer/Footer";
export default {
  data() {
    return {};
  },
  components: { Header, Footer },
  mounted() {
        document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
};
</script>
<style scoped lang="scss">
div {
  text-align: center;
}
.bodyContent {
  background-color: #e9ebea;
  padding: 2% 5%;
}
</style>