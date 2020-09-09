<style scoped lang="scss">
  .loginCon {
    width: 100%;
    @import './share.scss';

    .studentId .logo {
      background-image: url("../../assets/images/account@3x.png");
    }

    .password .logo {
      background-image: url("../../assets/images/lock@3x.png");
    }

    .forgetPass {
      height: 2em;
      line-height: 3em;
      cursor: pointer;
      color: #548cfe;
      text-align: right;
    }
  }
</style>

<template>
  <div class="loginCon">
    <div class="title">登录</div>
    <div class="inputCon">
      <div class="input studentId">
        <div class="logo"></div>
        <input type="text" v-model="studentId" placeholder="学号"/>
      </div>
      <div class="input password">
        <div class="logo"></div>
        <input type="password" v-model="password" placeholder="密码"/>
      </div>
      <div class="barcode">
        <img class="barcodeImg" :src="barcodeURL" alt="">
        <div class="input">
          <input type="text" v-model="valcode" placeholder="验证码"/>
        </div>
      </div>
    </div>
    <div class="forgetPass" @click="forgetPass">忘记密码 ？</div>
    <div class="btnCon">
      <div class="toReg" @click="toReg">去注册</div>
      <div class="sure" @click="sure">登录</div>
    </div>
  </div>
</template>

<script>
  import loginApi from '../../share/api/loginApi';

  export default {
    name: "loginCon",
    props: {
      model: Boolean
    },
    data() {
      return {
        studentId: "3118004972",
        password: "123456",
        valcode: "1",
      };
    },
    computed: {
      barcodeURL() {
        return `${process.env.VUE_APP_URL}/utils/valcode?${new Date().valueOf()}`
      }
    },
    methods: {
      // 切换到注册
      toReg() {
        this.$emit('update:model', false)
      },
      forgetPass() {
        this.$emit('forgetPassShow')
      },
      // 校验输入
      judeg() {
        if (!this.studentId.trim()) {
          this.$Message.warning("请输入学号");
          return false;
        }
        if (!this.password.trim()) {
          this.$Message.warning("请输入密码");
          return false;
        }
        if (!this.valcode.trim()) {
          this.$Message.warning("请输入验证码");
          return false;
        }
        return true;
      },
      // 请求登录
      sure() {
        let send = {
          password: this.password,
          studentId: this.studentId,
          valcode: this.valcode
        }
        if (!this.judeg()) {
          return;
        }
        loginApi.loginHTTP(send).then(res => {
          console.log(res)
          if (res.state == 1) {
            // 登录成功后，存储用户信息
            this.$store.commit('addUserInfo', res.data);
            // 跳转页面
            this.$router.push({name: "index"});
            // 测试其他接口
            // loginApi.testHTTP().then(res => {
            //   console.log(res)
            // })
          } else {
            this.$Message.warning(res.stateInfo)
          }
        })
      }
    }
  }
</script>
