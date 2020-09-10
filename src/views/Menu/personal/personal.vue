<style scoped lang="scss">
  .personal {
    .logo {
      height: 3.5em;
    }

    .touxiang {
      position: relative;
      margin: 0 auto;
      height: 8em;
      width: 8em;
      border-radius: 50%;
      overflow: hidden;

      input {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        cursor: pointer;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        opacity: 0;
      }

      img {
        display: block;
        height: 100%;
        width: 100%;
      }

      .tip {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 2.5em;
        line-height: 2.5em;
        color: #fff;
        font-size: 13px;
        text-align: center;
        background-color: #548cfe;
        opacity: 0;
        transition: opacity 0.5s;
      }

    }

    .touxiang:hover .tip {
      opacity: 1;
    }

    .inputCon {
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1.5em;
        height: 2.5em;
        line-height: 2.5em;
        border-bottom: 1px solid #548cfe;

        span {
          display: block;
          width: 3em;
          color: #548cfe;
          font-size: 1.5em;
          text-align: center;
        }

        input {
          width: 16em;
          color: #495060;
          border: none;
          outline: none;
          font-size: 1.2em;
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
  <div class="personal">
    <img class="logo" src="../../../assets/images/anywork@2x.png" alt="">
    <div class="touxiang">
      <input type="file" @change="uploadImg">
      <img :src="imgSrc" alt="">
      <div class="tip">修改头像</div>
    </div>
    <div class="inputCon">
      <div>
        <span>邮箱</span>
        <input type="text" v-model="email">
      </div>
      <div>
        <span>手机</span>
        <input type="text" v-model="phone">
      </div>
    </div>
    <Button class="btn" @click="sure" :loading="loading" long>保存</Button>
  </div>
</template>

<script>
  import personalApi from "@/share/api/personalApi.js";
  import utils from "./utils.js";

  export default {
    name: "personal",
    props: {},
    data() {
      return {
        email: '',
        phone: '',
        formData: null,
        imgSrc: '#',
        loading: false,
        regEmail: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
        regPhone: /^1[3456789]\d{9}$/
      };
    },
    computed: {},
    methods: {
      // 获取上传图片文件
      uploadImg(e) {
        let file = e.target.files[0];
        let judgeResult = utils.judgeFile(file.name);
        if (judgeResult !== 'OK') {
          this.$Modal.warning({
            title: "错误提示",
            content: judgeResult
          });
          e.target.value = "";
          return;
        } else {
          this.formData = new window.FormData();
          this.formData.append("file", file, file.name);
        }
        console.log(this.formData)
        utils.getImgSrc(file).then((blobUrl) => {
          this.imgSrc = blobUrl;
        });
        e.target.value = "";
      },
      // 确定提交
      sure() {
        if (!this.judegInput()) {
          return;
        }
        this.loading = true;
        personalApi.updateInfo({
          email: this.email,
          phone: this.phone
        })
        .then(res=>{
          console.log(res)
          console.log(this.formData)
          if(this.formData) {
            personalApi.uploadImg(this.formData)
                .then(res=>{
              this.loading = false;
              console.log(res)
            })
          } else {
            this.loading = false;
          }

        })


        // setTimeout(() => {
        //   this.loading = false;
        //   this.$Modal.success({
        //     title: "提交成功",
        //     content: "请留意邮箱信息通知。",
        //     onOk: () => {
        //     }
        //   });
        // }, 1000)
        //   loginApi.loginHTTP(send).then(res => {
        //     if (res.data.state == 1) {
        //     } else {
        //       this.$Message.warning(res.data.stateInfo)
        //     }
        //   })
      }
      ,
      // 校验输入
      judegInput() {
        // 校验邮箱
        if (!this.email.trim()) {
          this.$Message.warning("请输入邮箱");
          return false;
        } else if (!this.regEmail.test(this.email)) {
          this.$Message.warning("邮箱格式错误");
          return false;
        }
        // 校验手机
        if (!this.phone.trim()) {
          this.$Message.warning("请输入手机号");
          return false;
        } else if (!this.regPhone.test(this.phone)) {
          this.$Message.warning("手机号格式错误");
          return false;
        }
        return true;
      }
      ,
    },
    mounted() {
      let userInfo = this.$store.state.userInfo
      this.email = userInfo.email;
      this.phone = userInfo.phone;
      this.imgSrc = `${process.env.VUE_APP_URL}${userInfo.imagePath}`
    }
  };
</script>