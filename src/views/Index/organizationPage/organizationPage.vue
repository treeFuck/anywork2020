<style scoped lang="scss">
@import "../index";
$fontColor: #548cfe;

.oganizationPage {
  position: relative;
  font-size: 12px;

  .title {
    display: flex;
    align-items: center;
    margin: 40px 0;

    img {
      display: inline;
    }

    .title-context {
      margin: 0 0 0 20px;
      font-size: 1.4rem;
      font-weight: 600;
      color: $fontColor;
    }
  }

  .test-all-card {
    .test-card {
      margin: 40px 0;
      border-radius: 1em;
      box-shadow: 0 0 36px 2px #b4b4b4;
      padding: 0 20px;
      background-color: white;

      .section-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 64px;
        font-size: 1.5em;
        font-weight: 600;
        cursor: pointer;

        .section-title-left {
          display: flex;
          align-items: center;
        }

        .section-name {
          display: flex;
          align-items: center;
          margin: 0 20px;
        }

        i {
          font-size: 2rem;
        }
      }

      .section-test {
        display: flex;
        justify-content: space-between;
        height: 65px;
        border-top: 2px solid #eae8e8;
        font-size: 1.5em;
        cursor: pointer;

        .section-test-left {
          display: flex;
          align-items: center;

          .section-test-status {
            padding: 4px 6px;
            color: white;
            background-color: #ee5353;
            font-size: 12px;
          }

          .section-test-name {
            margin: 0 0 0 18px;
          }
        }

        .section-test-right {
          display: flex;
          align-items: center;

          i {
            font-size: 1.5em;
          }

          .section-test-time {
            margin: 0 0 0 5px;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="oganizationPage">
    <div class="big-container">
      <div class="main-container">
        <Indexheader></Indexheader>
        <div class="title">
          <img src="../../../assets/images/preview@1x.png" alt="eyes">
          <div class="title-context">{{title}}</div>
        </div>
        <div class="test-all-card">
          <div class="test-card" v-for="(item, index) in chapterList" :key="index">
            <div
              class="section-title"
              @click.self="displayDetail($event, item)"
              :data-chapterid="item.chapterId"
            >
              <div class="section-title-left">
                <img src="../../../assets/images/phone@2x.png" alt="phone">
                <div class="section-name">{{item.chapterName}}</div>
              </div>
              <i data-v-9d741058="" class="icon-chapter ivu-icon ivu-icon-ios-arrow-down"></i>
            </div>
            <div class="section-test-all" v-if="item.display">
              <div
                class="section-test"
                v-for="(testItem, testIndex) in item.testList"
                :key="(testIndex)"
                @click.self="toExercise($event)"
                :data-paperid="testItem.testpaperId"
              >
                <div class="section-test-left">
                  <div
                    class="section-test-status"
                    :style="{backgroundColor: testItem.bgColor}"
                  >{{testItem.statusWord}}</div>
                  <div class="section-test-name">{{testItem.testpaperTitle}}</div>
                </div>
                <div class="section-test-right">
                  <i
                    data-v-9d741058=""
                    class="subject-item-commom subject-icon ivu-icon ivu-icon-ios-alarm-outline"
                  ></i>
                  <div class="section-test-time">{{testItem.createTime}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Indexheader from "../../../components/head/head.vue";
import OrganizationApi from "../../../share/api/organizationApi";
import { Notice } from "view-design";

export default {
  name: "organizationPage",
  props: {},
  components: {
    Indexheader
  },
  data() {
    return {
      title: "课前预习",
      displaySel: false,
      displayDet: false,
      organizationId: 0,
      chapterId: 0,
      testPaperType: 2,
      chapterList: [],
      testList: [],
      mode: 1
    };
  },
  computed: {},
  methods: {
    displayDetail(e, item) {
      console.log(e);
      this.chapterId = parseInt(e.target.dataset.chapterid);
      this.requestTestList(this.chapterId);
    },

    toExercise(e) {
      console.log(e.target.dataset.paperid);
      this.$router.push({name:'exercise', params: {testpaperId: e.target.dataset.paperid}});
    },
    /**
     * 获取章节列表
     */
    requestChapter() {
      let data = {
        organizationId: this.organizationId // int
      };

      OrganizationApi.gettestChapter(data).then(res => {
        console.log(res, "请求结果：章节列表");
        this.chapterList = res.data;
        let that = this;
        this.chapterList.forEach(function(item, index) {
          that.$set(item, "testList", {});
          that.$set(item, "display", flase);
        });
      });
    },

    /**
     * 获取试卷概要列表
     */
    requestTestList(chapterId) {
      console.log(chapterId);
      let data = {
        organizationId: this.organizationId, // int
        chapter: chapterId, // int，如果是请求考试，这个字段为0
        testPaperType: this.mode // int，1是考试，2是预习题，3是课后复习题
      };

      OrganizationApi.getTestList(data).then(res => {
        console.log(res, "请求结果：概要列表");
        let testList = res.data;
        let that = this;
        if (res.state == 0) {
          Notice.warning({
            title: res.stateInfo
          });
        } else if (res.state == 1) {
          testList.forEach(function(item, index) {
            if (item.status == 1) {
              item.statusWord = "已完成";
              item.bgColor = "#499ad3";
            } else if (item.status == 2) {
              item.statusWord = "未提交";
              item.bgColor = "#3bb255";
            } else if (item.status == 3) {
              item.statusWord = "未完成";
              item.bgColor = "#ee5353";
            }
          });
          this.chapterList.forEach(function(item, index) {
            if (that.chapterId === item.chapterId) {
              item.testList = testList;
              that.$set(item, "display", !item.display);
            }
          });
        }
      });
    }
  },
  mounted() {
    let that = this;
    this.organizationId = this.$route.params.organizationId;
    this.mode = this.$route.params.mode;
    if(this.mode == 1) {
      this.title = "课程考试"
    }else if(this.mode == 2) {
      this.title = "课前预习"
    }else if(this.mode == 3) {
      this.title = "课后练习"
    }
    console.log(this.organizationId);
    // 获取章节列表
    this.requestChapter();
  }
};
</script>