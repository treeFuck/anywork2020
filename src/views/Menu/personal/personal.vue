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
      <img src="" alt="">
      <div class="tip">修改头像</div>
    </div>
    <div class="inputCon">
      <div>
        <span>邮箱</span>
        <input type="text">
      </div>
      <div>
        <span>手机</span>
        <input type="text">
      </div>
    </div>
    <Button class="btn" @click="sure" :loading="loading" long>保存</Button>
  </div>
</template>

<script>
  // import loginApi from "../../share/api/loginApi";

  export default {
    name: "personal",
    props: {},
    data() {
      return {
        email: '',
        phone: '',
        loading: false
      };
    },
    computed: {},
    methods: {
      // 获取上传图片文件
      uploadImg(e) {
        let file = e.target.files;
        let len = file.length;
        let formdata = new window.FormData();
        let fileValue = file[0].name;
        if (this.judge(file[0].name) !== 'OK') {
          e.target.value = "";
          return;
        } else {
          formdata.append("file", file[0], file[0].name);
        }
        console.log(formdata.getAll("file"));
        e.target.value = "";
      },
      // 校验img文件
      judge(fileName) {
        let AllImgExt = ".png|.jpg|.svg|";
        var extName = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
        if (AllImgExt.indexOf(extName + "|") != -1) {
          return 'OK';
        }
        let ErrMsg = `该文件类型不允许上传。请上传${AllImgExt}类型的文件，当前上传的文件有${extName}类型`
        return this.$Modal.warning({
          title: "错误提示",
          content: ErrMsg
        });
      },
      sure() {
        let send = {
          email: this.email,
        }
        if (!this.judeg()) {
          return;
        }
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.$Modal.success({
            title: "提交成功",
            content: "请留意邮箱信息通知。",
            onOk: () => {
            }
          });

        }, 1000)
        //   loginApi.loginHTTP(send).then(res => {
        //     if (res.data.state == 1) {
        //     } else {
        //       this.$Message.warning(res.data.stateInfo)
        //     }
        //   })
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