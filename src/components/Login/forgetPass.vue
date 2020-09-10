<style scoped lang="scss">
  .forgetPass {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    height: 100vh;
    width: 100vw;
    background-color: rgba(1, 1, 1, 0.5);

    .inputCon {
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 1.5em;
      width: 25em;
      transform: translate(-50%, -50%);
      background-color: #383838;
      box-shadow: 0 0 8px 2px #585858;
      border-radius: 10px;

      .input {
        margin: 1em auto;
      }

      .btnCon {
        display: flex;
        justify-content: space-between;
        margin: 1em auto;

        .btn {
          width: 45%;
        }

      }
    }
  }

</style>

<template>
  <div class="forgetPass">
    <div class="inputCon">
      <i-input class="input" v-model="email" type="text" placeholder="请输入您的邮箱" icon="ios-mail-outline"></i-input>
      <div class="btnCon">
        <Button class="btn" type="primary" @click="backLogin" :disabled="loading">返回登录</Button>
        <Button class="btn" type="success" @click="sure" :loading="loading">提交</Button>
      </div>

    </div>

  </div>
</template>

<script>
  import loginApi from "../../share/api/loginApi";

  export default {
    name: "forgetPass",
    props: {
      ifshow: Boolean
    },
    data() {
      return {
        email: "",
        loading: false,
        regEmail: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      };
    },
    methods: {
      // 请求注册
      backLogin() {
        this.$emit('update:ifshow', false)
      },
      sure() {
        let send = {
          email: this.email,
        }
        if (!this.judeg()) {
          return;
        }
        this.loading = true;
        loginApi.forgetPassWord(send).then(res => {
          if (res.data.state == 1) {
            this.loading = false;
            this.$Modal.success({
              title: "提交成功",
              content: "请留意邮箱信息通知。",
              onOk: () => {
                this.backLogin()
              }
            });
          } else {
            this.$Message.warning(res.data.stateInfo)
          }
        })
      },
      // 校验输入
      judeg() {
        if (!this.email.trim()) {
          this.$Message.warning("请输入邮箱");
          return false;
        } else if (!this.regEmail.test(this.email)) {
          this.$Message.warning("邮箱格式错误");
          return false;
        }
        return true;
      },
    }
  };
</script>