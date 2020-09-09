
<style scoped lang="scss">
  .regCon {
    width: 100%;
    @import './share.scss';

    .studentId .logo {
      background-image: url("../../assets/images/account@3x.png");
    }

    .email .logo {
      background-image: url("../../assets/images/letter@3x.png");
    }

    .phone .logo {
      background-image: url("../../assets/images/phone@3x.png");
    }

    .password .logo {
      background-image: url("../../assets/images/lock@3x.png");
    }

    .surePassword .logo {
      background-image: url("../../assets/images/preview@1x.png");
    }

  }
</style>

<template>
  <div class="regCon">
    <div class="title">注册</div>
    <div class="inputCon">
      <div class="input studentId">
        <div class="logo"></div>
        <input type="text" v-model="studentId" placeholder="学号"/>
      </div>
      <div class="input email">
        <div class="logo"></div>
        <input type="text" v-model="email" placeholder="邮箱"/>
      </div>
      <div class="input phone">
        <div class="logo"></div>
        <input type="text" v-model="phone" placeholder="手机"/>
      </div>
      <div class="input password">
        <div class="logo"></div>
        <input type="password" v-model="password" placeholder="密码"/>
      </div>
      <div class="input surePassword">
        <div class="logo"></div>
        <input type="password" v-model="surePassword" placeholder="确认密码"/>
      </div>
      <div class="barcode">
        <img class="barcodeImg" :src="barcodeURL" alt="">
        <div class="input">
          <input type="text" v-model="valcode" placeholder="验证码"/>
        </div>
      </div>
    </div>
    <div class="btnCon">
      <div class="toLogin" @click="toLogin">去登录</div>
      <div class="sure" @click="sure">注册</div>
    </div>
  </div>
</template>

<script>
  import loginApi from "../../share/api/loginApi";

  export default {
    name: "regCon",
    props: {
      model: Boolean
    },
    data() {
      return {
        studentId: "",
        email: "",
        phone: "",
        password: "",
        surePassword: "",
        valcode: "",
        mark: 0, // 0 注册学生，1注册教师
        regEmail: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      };
    },
    computed: {
      barcodeURL() {
        return `${process.env.VUE_APP_URL}/utils/valcode?${new Date().valueOf()}`
      }
    },
    methods: {
      // 切换到登录
      toLogin() {
        this.$emit('update:model', true)
      },
      // 请求注册
      sure() {
        let send = {
          password: this.password,
          studentId: this.studentId,
          valcode: this.valcode
        }
        if (!this.judeg()) {
          return;
        }
        //   loginApi.loginHTTP(send).then(res => {
        //     if (res.data.state == 1) {
        //     } else {
        //       this.$Message.warning(res.data.stateInfo)
        //     }
        //   })
      },
      // 校验输入
      judeg() {
        if (!this.studentId.trim()) {
          this.$Message.warning("请输入学号");
          return false;
        }
        if (!this.email.trim()) {
          this.$Message.warning("请输入邮箱");
          return false;
        } else if (!this.regEmail.test(this.email)) {
          this.$Message.warning("邮箱格式错误");
          return false;
        }
        if (!this.phone.trim()) {
          this.$Message.warning("请输入手机号");
          return false;
        }
        if (!this.password.trim()) {
          this.$Message.warning("请输入密码");
          return false;
        }
        if (!this.surePassword.trim()) {
          this.$Message.warning("请再次输入确认密码");
          return false;
        }
        if (this.surePassword != this.password) {
          this.$Message.warning("两次输入密码不一致");
          return false;
        }
        if (!this.valcode.trim()) {
          this.$Message.warning("请输入验证码");
          return false;
        }
        return true;
      },
    }
  };
</script>
