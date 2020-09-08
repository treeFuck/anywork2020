<style scoped lang="scss">
  .loginCon {
    width: 100%;

    .title {
      font-size: 2em;
      text-align: center;
      color: #548cfe;
    }

    .inputCon {
      color: #495060;

      .input {
        display: flex;
        align-items: center;
        margin: 0.5em 0;
        border-bottom: 1px solid #548cfe;

        img {
          height: 1.3em;
        }

        input {
          width: 100%;
          height: 3em;
          line-height: 3em;
          font-size: 13px;
          border: none;
          outline: none;
          text-indent: 1em;
          background: #fff;
        }
      }

      .barcode {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .barcodeImg {
          width: 48%;
        }

        .input {
          width: 48%;
        }
      }
    }

    .btnCon {
      display: flex;
      justify-content: space-between;
      margin-top: 1em;

      div {
        height: 2.5em;
        width: 48%;
        line-height: 2.5em;
        text-align: center;
        cursor: pointer;
        border-radius: 5px;
      }

      .toReg {
        color: #495060;
        border: 1px solid #dddee1;
        background-color: #f7f7f7;
      }

      .sure {
        color: #fff;
        border: 1px solid #fff;
        background-color: #7f3ffd;
      }
    }
  }
</style>

<template>
  <div class="loginCon">
    <div class="title">登录</div>
    <div class="inputCon">
      <div class="input">
        <img src="../../assets/images/account@3x.png"/>
        <input type="text" v-model="studentId" placeholder="学号"/>
      </div>
      <div class="input">
        <img src="../../assets/images/lock@3x.png"/>
        <input type="password" v-model="password" placeholder="密码"/>
      </div>
      <div class="barcode">
        <img class="barcodeImg" :src="barcodeURL" alt="">
        <div class="input">
          <input type="password" v-model="valcode" placeholder="验证码"/>
        </div>
      </div>
    </div>
    <div class="btnCon">
      <div class="toReg">去注册</div>
      <div class="sure" @click="sure">登录</div>
    </div>
  </div>
</template>

<script>
  import loginApi from '../../share/api/loginApi';

  export default {
    name: "loginCon",
    data() {
      return {
        password: "123456",
        studentId: "3118004972",
        valcode: "111",
      };
    },
    computed: {
      barcodeURL() {
        return `${this.$httpUrl}/utils/valcode?${new Date().valueOf()}`
      }

    },
    methods: {
      sure() {
        // 请求登录
        let send = {
          password: this.password,
          studentId: this.studentId,
          valcode: this.valcode
        }
        loginApi.loginHTTP(send).then(res => {
          if (res.data.state == 1) {
            // 登录成功后，存储用户信息
            this.$store.commit('addUserInfo', res.data.data);
            // 跳转页面
            this.$router.push({name: "index"});
          } else {
            this.$Message.warning(res.data.stateInfo)
          }
        })
      }
    }
  }
</script>
