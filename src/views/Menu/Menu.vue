<style scoped lang="scss">
  .menuCon {
    position: relative;
    height: 100vh;
    width: 100vw;
    min-width: 1200px;
    overflow: hidden;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: bottom right;
    background-image: url("../../assets/images/draw@2x.png");
    .router-view {
      position: absolute;
      top: 50%;
      left: 10%;
      width: 25em;
      transform: translateY(-65%);
    }
  }
</style>

<template>
  <div class="menuCon">
    <router-view class="router-view"/>
  </div>
</template>

<script>

  export default {
    name:"Menu",
    mounted() {
    }
  };
</script>