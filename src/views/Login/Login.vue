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
    .top {
      position: absolute;
      bottom: 0.2em;
      left: 0.7em;
      font-size: 35px;
      color: #548cfe;
    }
    .left {
      position: absolute;
      top: 50%;
      left: 10%;
      width: 20em;
      transform: translateY(-65%);
    }
  }
</style>

<template>
  <div class="con">
    <div class="top">
      Welcome To Anywork &nbsp; &nbsp; : )
    </div>
    <div class="left">
      <loginCon v-show="model" :model.sync="model" @forgetPassShow="forgetPassShow=true"></loginCon>
      <regCon v-show="!model" :model.sync="model"></regCon>
    </div>
    <forgetPass v-show="forgetPassShow" :ifshow.sync="forgetPassShow"></forgetPass>
  </div>
</template>

<script>
  // 登录模块
  import loginCon from "@/components/Login/loginCon";
  // 注册模块
  import regCon from "@/components/Login/regCon";
  // 忘记密码
  import forgetPass from "@/components/Login/forgetPass";

  export default {
    name: "login",
    components: {
      loginCon,
      regCon,
      forgetPass
    },
    data() {
      return {
        model: true, // true-> 登录，false-> 注册
        forgetPassShow: false // 是否展示忘记密码模块
      };
    },
    methods: {
    }
  };
</script>
