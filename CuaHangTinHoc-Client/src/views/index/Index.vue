<template>
  <div>
    <Header/>
    <router-view class='bodyContent' />
    <Footer/>
  </div>
</template>
<script>
import Header from "../header/Header";
import Footer from "../footer/Footer";
export default {
  data() {
    return {};
  },
  components: { Header, Footer }
};
</script>
<style scoped lang="scss">
div {
  text-align: center;
}
.bodyContent {
  background-color: #e9ebea;
  padding-left: 6rem;
  padding-right: 5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>