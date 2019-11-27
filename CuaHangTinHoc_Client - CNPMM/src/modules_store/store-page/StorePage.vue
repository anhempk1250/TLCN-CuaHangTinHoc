<template>
  <div id="storePage">
    <div class="row">
      <div class="col-md-2">
        <leftMenu />
      </div>
      <div class="col-md-10" style="position: absolute;left: 16.667%;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import leftMenu from "../../components/left_menu/LeftMenu.vue";
export default {
  components: { leftMenu }
};
</script>
<style lang="scss" scoped>
@import "./StorePage.scss";
.col-md-2 {
  border: 1px solid silver;
  padding: 0;
  width: 100%;
  position: absolute;
  height: 90%;
  background-color: #e9ebea;
}
</style>