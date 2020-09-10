<style scoped lang="scss">
  .newPassword {
    .top {
      display: flex;
      align-items: center;
      justify-content: left;
      padding: 2em 0;

      .logo {
        height: 3.5em;
      }

      .title {
        padding-left: 1.5em;
        font-size: 2.2em;
        font-weight: bold;
        color: #548cfe;
      }
    }


    .inputCon {
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 2em;
        height: 2em;
        line-height: 2em;


        span {
          display: block;
          margin-right: 0.5em;
          width: 6em;
          color: #548cfe;
          font-size: 1.3em;
          text-align: right;
        }

        input {
          width: 16em;
          color: #495060;
          border: none;
          outline: none;
          font-size: 1em;

          border-bottom: 1px solid #548cfe;
        }

        input::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
          color: #ababab;
        }
      }
    }

    .btn {
      margin-top: 2em;
      height: 2.2em;
      color: #fff;
      font-size: 1.3em;
      background: #548cfe;
    }
  }
</style>

<template>
  <div class="newPassword">
    <div class="top">
      <img class="logo" src="../../../assets/images/anywork@2x.png" alt="">
      <div class="title">修改密码</div>
    </div>

    <div class="inputCon">
      <div>
        <span>原始密码</span>
        <input type="password" v-model="oldPassword" placeholder="请输入你的原始密码">
      </div>
      <div>
        <span>重置密码</span>
        <input type="password" v-model="newPassword" placeholder="请输入你的新密码">
      </div>
      <div>
        <span>再次输入密码</span>
        <input type="password" v-model="surePassword" placeholder="请再次输入你的新密码">
      </div>
    </div>
    <Button class="btn" @click="sure" :loading="loading" long>保存</Button>
  </div>
</template>

<script>
  import personalApi from "../../../share/api/personalApi.js";

  export default {
    name: "newPassword",
    props: {},
    data() {
      return {
        oldPassword: '',
        newPassword: '',
        surePassword: '',
        loading: false
      };
    },
    methods: {
      sure() {
        if (!this.judge()) {
          return;
        }
        let send = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        }
        this.loading = true;
        personalApi.changePassword(send).then(res=>{
          this.loading = false;
          if (res.state == 1) {
            this.$Modal.success({
              title: "修改成功",
              content: "密码修改成功，请重新登录",
              onOk: () => {
                // 清空 vuex 的用户信息
                this.$store.commit("delUserInfo");
                // 返回登录页面
                this.$router.replace({name: "login"});
              }
            });
          }
          else {
            this.$Message.warning(res.stateInfo);
          }
        })
      },
      judge() {
        if (!this.oldPassword) {
          this.$Message.warning("原始密码不能为空");
          return false;
        }
        if (!this.newPassword) {
          this.$Message.warning("重置密码不能为空");
          return false;
        }
        if (!this.surePassword) {
          this.$Message.warning("请再次输入确认密码");
          return false;
        }
        if (this.newPassword != this.surePassword) {
          this.$Message.warning("新密码和旧密码不一致");
          return false;
        }
        return true;
      }
    }
  };
</script>