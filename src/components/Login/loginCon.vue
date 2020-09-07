<style scoped lang="scss">
.loginCon {
  .btnCon {
    .sure {
      height: 2em;
      width: 5em;
      line-height: 2.2em;
      text-align: center;
      color: #000;
      cursor: pointer;
      background: #f40;
    }
  }
}
</style>

<template>
  <div class="loginCon">
    <div class="title">登录</div>
    <div class="inputCon">
      <div class="input">
        <img src />
        <input type="text" v-model="stuId" />
      </div>
      <div class="input">
        <img src />
        <input type="password" v-model="pass" />
      </div>
    </div>
    <div class="btnCon">
      <div class="toReg">去注册</div>
      <div class="sure" @click="sure">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginCon",
  data() {
    return {
      stuId: "",
      pass: ""
    };
  },
  methods: {
    sure() {
      let send = {
        password: "123456",
        studentId: "3118004972",
        valcode: "1"
      }
      this.$axios
        .post(this.$httpUrl + "user/login", send)
        .then(res => {
          console.log(res.data.data)
           this.$store.commit('addUserInfo', res.data.data);
           console.log(this.$store.state.userInfo);
        });
      // http://qgailab.com/anywork/user/login
    }
  }
};
</script>
