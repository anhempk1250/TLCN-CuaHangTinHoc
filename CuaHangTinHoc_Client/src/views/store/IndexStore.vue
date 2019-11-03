<template>
  <div>
    <HeaderStore />
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderStore from "../headerStore/headerStore.vue";
export default {
  components: { HeaderStore }
};
</script>
<style scoped>
div {
  width: 100%;
  height: 100%;
  font-family: Roboto, sans-serif;
}
</style>