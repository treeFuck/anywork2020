<style scoped lang="scss">
@import "index";
$fontColor: #548cfe;

/*主页面*/
.index {
  /*背景图片设置*/
  .bg {
    position: absolute;
    width: 1000px;
    height: 850px;
    top: -40px;
    right: -150px;
    z-index: -1;
  }

  /*主容器*/
  .index-container {
    /*欢迎模块  字*/
    .welcome {
      width: 100%;
      margin: 200px 0;
      height: 360px;
      .welcome-word {
        margin: 50px 0;
        font-size: 1.67rem;
        color: $fontColor;
      }
      .student-class {
        width: 90px;
        height: 40px;
        border-radius: 2.5rem;
        font-size: 1rem;
      }
    }

    /*公告模块*/
    .notice-list {
      position: relative;
      margin-bottom: 50px;

      .notice-all-card {
        position: relative;

        /*左边图片*/
        .notice-img-container {
          position: absolute;
          top: 16px;
          left: -24px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          width: 58px;
          height: 58px;
          background-color: white;
          box-shadow: 0 0 24px 4px #dedbdb;

          img {
            width: 38px;
          }
        }
        /*右边内容*/
        .news-container {
          margin: 26px 0;
          padding: 16px 66px;
          border-radius: 3em;
          background-color: white;
          box-shadow: 0 0 24px 4px #dedbdb;

          .news-title {
            font-size: 20px;
          }

          .news-context {
            font-size: 16px;

            .news-teacher {
              display: inline-block;
            }

            .news-time {
              display: inline-block;
              margin-left: 70px;
            }
          }
        }
      }
    }

    /*排行榜模块*/
    .rank-list {
      position: relative;

      /*菜单栏*/
      .sort-select {
        position: absolute;
        right: 0;
        top: 0.5rem;
      }

      /*排行榜列表容器*/
      .rank-all-card {
        display: flex;
        flex-direction: column;

        .rank-card {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-self: stretch;
          margin: 15px 0;
          font-size: 18px;

          .rank-info {
            margin: 18px 0;
            flex: 1;
          }

          .rank-number {
            font-style: italic;
          }

          .rank-image {
            width: 60px;
            height: 60px;
            border-radius: 4em;
          }

          .image-div {
            margin: 0;
          }
        }
      }
    }
  }
}

/*模块选择容器*/
.select-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 80px auto;

  /*模块 4个*/
  .select-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    text-align: center;
    width: 180px;
    height: 190px;
    padding: 56px 40px;
    color: $fontColor;
    font-size: 1.5em;
    box-shadow: 0 0 24px 4px #dedbdb;
    cursor: pointer;
  }

  /*模块div内图片*/
  .select-img {
    width: 60px;
    margin: 10px 20px;
    margin-top: 0;
  }
}
</style>

<template>
  <!--
  主页面
  -->
  <div class="index big-container">
    <!--背景-->
    <img src="../../assets/images/draw@2x.png" class="bg">
    <div class="index-container main-container">
      <Indexheader></Indexheader>
      <!--欢迎模块-->
      <div class="welcome">
        <div class="welcome-word">Welcome To Anywork : )</div>
        <div class="welcome-word">日拱一卒无有尽</div>
        <Button disabled class="student-class">{{organizationName}} ></Button>
      </div>
      <!--选择模块 4个 -->
      <div class="select-container">
        <div
          class="select-item"
          v-for="(item, index) in selectItem"
          :key="index"
          @click="toDetail(index)"
        >
          <img :src="item.imgSrc" :alt="item.name" class="select-img">
          {{item.name}}
        </div>
      </div>
      <!--公告模块-->
      <div class="notice-list" v-if="hasMessage">
        <h1>公告</h1>
        <div class="notice-all-card">
          <div v-for="(item, index) in messageList" :key="index">
            <div class="notice-img-container">
              <img src="../../assets/images/unread@1x.png">
            </div>
            <div class="news-container">
              <div class="news-title">{{item.title}}}</div>
              <div class="news-context">
                <div class="news-teacher">
                  <i data-v-7731a960="" class="ivu-icon ivu-icon-ios-person-outline"></i>
                  {{item.publisher}}
                </div>
                <div class="news-time">
                  <i data-v-7731a960="" class="ivu-icon ivu-icon-ios-clock-outline"></i>
                  {{item.createTime}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--排行榜模块-->
      <div class="rank-list">
        <h1>排行榜</h1>
        <i-select
          :model.sync="model1"
          style="width:200px"
          class="sort-select"
          placeholder="班级排名"
          @on-change="requestRankList"
        >
          <i-option
            v-for="(item, index) in sortList"
            :key="index"
            :value="item.value"
          >{{ item.label }}</i-option>
        </i-select>
        <div class="rank-all-card">
          <div class="rank-card" v-for="(item, index) in rankList" :key="index">
            <div class="rank-info rank-number">NO.{{(index + 1)}}</div>
            <div class="rank-info image-div">
              <img :src="item.imagePath" class="rank-image">
            </div>
            <div class="rank-info">{{item.username}}</div>
            <div class="rank-info">{{item.organizationName}}</div>
            <div class="rank-info">{{item.score}}</div>
            <div class="rank-info">{{item.studentId}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import indexApi from "../../share/api/indexApi";
import Indexheader from "../../components/head/head.vue";

export default {
  /**
   * 组件名称
   */
  name: "index",

  components: {
    Indexheader
  },

  data() {
    return {
      /**
       * 模块选择列表
       */
      selectItem: [
        {
          imgSrc: require("../../assets/images/preview@2x.png"),
          name: "课前预习"
        },
        {
          imgSrc: require("../../assets/images/pratice@2x.png"),
          name: "课后练习"
        },
        {
          imgSrc: require("../../assets/images/collect@2x.png"),
          name: "课程考试"
        },
        {
          imgSrc: require("../../assets/images/exam@2x.png"),
          name: "错题收藏"
        }
      ],
      /**
       * 排名榜列表
       */
      rankList: [],
      /**
       * 排序方式菜单栏选项
       */
      sortList: [
        {
          value: 1,
          label: "班级排名"
        },
        {
          value: 2,
          label: "整体排名"
        }
      ],
      model1: 1,

      myOrganization: {},
      organizationName: "",
      organizationId: 0,

      messageList: [],

      hasMessage: false,

      mode: 1
    };
  },

  methods: {
    toDetail(index) {
      if (index == 0) {
        this.mode = 2;
      } else if (index == 1) {
        this.mode = 3;
      } else if (index == 2) {
        this.mode = 1;
      } else if (index == 3) {
        /**
         * 跳转到错题
         */
      }
      this.$router.push({
        name: "organizationPage",
        params: { organizationId: this.organizationId, mode: this.mode }
      });
    },

    /**
     * 请求排名列表
     */
    requestRankList() {
      let data = {
        leaderboardType: this.model1
        // int，1为在班级排，2是按老师教的班排
      };

      indexApi.getRankList(data).then(res => {
        console.log(res, "请求结果：排名列表");
        this.rankList = res.data;
        this.rankList.forEach(function(item, index) {
          item.imagePath = "http://qgailab.com/anywork" + item.imagePath;
        });
      });
    },
    /**
     * 请求组织列表
     */
    requestOrganization() {
      let data = {
        organizationName: this.organizationName
      };
      indexApi.organizationSearch(data).then(res => {
        console.log(res, "请求结果：组织列表");
      });
    },

    /**
     * 获取我的组织
     */
    requestMyOrganization() {
      indexApi.getMyOrganization().then(res => {
        console.log(res, "请求结果：获取我的组织");
        this.myOrganization = res.data;
        this.organizationName = this.myOrganization[0].organizationName;
        this.organizationId = this.myOrganization[0].organizationId;
      });
    },

    /**
     * 获取公告信息
     */
    requestMessageList() {
      let data = {
        status: 0, // int，1代表要获取已读公告，0代表要获取未读公告，2代表获取全部公告
        pageNum: 1,
        pageSize: 10
      };
      indexApi.getMessageList(data).then(res => {
        console.log(res, "请求结果：获取公告");
        if (res.data !== null) {
          this.hasMessage = true;
          this.messageNumber = res.data.total;
          this.messageList = res.data.list;
        } else {
          this.hasMessage = false;
        }
      });
    }
  },

  mounted() {
    // 请求排名列表
    this.requestRankList();
    // 获取我的组织
    this.requestMyOrganization();
    // 请求组织列表
    this.requestOrganization();
    // 获取公告信息
    this.requestMessageList();
  }

  // webSocketLink(){
  //   let _this = this;
  //   var heartCheck = {
  //     timeout: 5000,//5秒
  //     timeoutObj: null,
  //     reset: function(){ clearInterval(this.timeoutObj); return this; },
  //     start: function(){ this.timeoutObj = setInterval(function(){
  //       _this.websocket.send("HeartBeat");
  //       console.log("HeartBeat");
  //     },this.timeout) }
  //   };
  //   if ('WebSocket' in window) {
  //     _this.updateUrl("/webSocketServer");
  //     _this.websocket = new WebSocket(_this.wsUrl);
  //   } else if('MozWebSocket' in window) {
  //     _this.updateUrl("/webSocketServer");
  //     _this.websocket = new MozWebSocket(_this.wsUrl);
  //   } else {
  //     _this.updateUrl("/sockjs/webSocketServer");
  //     _this.websocket = new SockJS(_this.wsUrl)
  //   }
  //   _this.websocket.onopen = function(){
  //     console.log("websock连接成功");
  //     heartCheck.reset().start();
  //   };
  //   _this.websocket.onmessage = function (event){
  //     console.log(event.data);
  //   }
  // },
  // beforeRouteLeave (to, from, next){
  //   if(this.websocket){
  //     this.websocket.close()
  //   }
  //  },
  // created(){
  //   this.webSocketLink();
  // }
};
</script>
