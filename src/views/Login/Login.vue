<script src="../../main.js"></script>
<style scoped lang="scss">
  .con {
    position: relative;
    height: 100vh;
    width: 100vw;
    min-width: 1200px;
    overflow: hidden;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: bottom right;
    background-image: url("../../assets/images/draw@2x.png");
    .left {
      position: absolute;
      top: 50%;
      left: 10%;
      width: 20em;
      transform: translateY(-60%);
    }
  }
</style>

<template>
  <div class="con">
    <div class="left">
      <loginCon v-show="model"></loginCon>
      <regCon v-show="!model"></regCon>
    </div>
  </div>
</template>

<script>
  import loginCon from "@/components/Login/loginCon";
  import regCon from "@/components/Login/regCon";

  export default {
    name: "login",
    components: {
      loginCon,
      regCon
    },
    data() {
      return {
        model: true // true-> 登录，false-> 注册
      };
    },
    methods: {}
  };
</script>
