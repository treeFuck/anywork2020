<style scoped lang="scss">
 /*头部*/
.head-container {
  position: relative;
  width: 100%;

    #logo {
        width: 25px;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 20px;
    }

    /*右上方头像和选择栏*/
    .right-head {
        display: inline-block;
        position: absolute;
        right: 0;
        top: 0;

        #profile-picture {
        width: 30px;
        height: 30px;
        border: 50%;
        }

        .select-img {
        width: 30px;
        height: 16px;
        margin: 7px 0;
        margin-left: 20px;
        cursor: pointer;
        }

        /*右边选项栏-》个人主页，退出登录，修改密码*/
        .right-head-select {
        display: inline-block;
        position: relative;
        padding-right: 20px;
        height: 150px;
        font-size: 0.85rem;

        .select-ul {
            position: absolute;
            top: 40px;
            right: 10px;
            list-style-type: none;

            li {
            margin: 10px 0;
            cursor: pointer;
            }
        }       
        }      
    }
}

</style>

<template>
  <div class="head-container">
    <img src="../../assets/images/anywork@2x.png" alt="logo" id="logo"/>
    <!--右边头像和选择栏-->
    <div class="right-head">
        <img :src="userInfo.imagePath" alt="profile-picture" id="profile-picture"/>
        <div class="right-head-select" @mouseover="displaySelect" @mouseleave="hideSelect">
            <img src="../../assets/images/gg.png" alt="profile-picture" class="select-img"/>
            <ul class="select-ul" v-if="displaySel" @click="selectTo($event)">
                <li>个人主页</li>
                <li>修改密码</li>
                <li>退出登录</li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
 import indexApi from '../../share/api/indexApi';

  export default {
    name: "indexHeader",
    props: {
     
    },
    data() {
      return {
        displaySel: false,
        userInfo: {}
      };
    },
    methods: {
      displaySelect(){
          this.displaySel = true;
      },
      hideSelect(){
          this.displaySel = false;
      },

      selectTo(e){
          if(e.target){
              if(e.target.innerText === "个人主页"){
                this.$router.push({name:'personal'});
              }else if(e.target.innerText === "修改密码"){
                this.$router.push({name:'newPassword'});
              }else if(e.target.innerText === "退出登录"){
                indexApi.userExit().then(res => {
                  localStorage.removeItem('Authorization')
                  console.log(res, "请求结果：退出登录") 
                  this.$router.push({name:'login'});
                })
              }
          }
      },
    /**
     * 请求个人信息
     */
      requestuserInfo(){

        indexApi.getUserInfo().then(res => {
          console.log(res, "请求结果：个人信息");
          this.userInfo = res.data;
          this.userInfo.imagePath = "http://qgailab.com/anywork" + this.userInfo.imagePath;
        })
      },

      /**
       * 清除所有cookie
       */
      // delAllCookie(){    
      //   var myDate=new Date();    
      //   myDate.setTime(-1000);//设置时间    
      //   var data=document.cookie;    
      //   var dataArray=data.split("; ");    
      //   console.log(dataArray)
      //   for(var i=0;i<dataArray.length;i++){    
      //     var varName=dataArray[i].split("=");    
      //     document.cookie=""+"=''; expires="+myDate.toGMTString();    
      //   }    
      // }
    },

    mounted(){
      // 获取个人信息
      this.requestuserInfo();
    }
  };
</script>