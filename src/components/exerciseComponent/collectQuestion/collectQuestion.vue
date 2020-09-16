<template>
  <div class="exercise-content-container">
    <div class="exercise-content-number">
      <p>{{now + 1}}/{{total}} ({{exeType}})</p>
      <Icon
        :type="isStar ? 'ios-star' : 'ios-star-outline'"
        size="20"
        style="cursor: pointer"
        color="#f5a623"
        @click="collect"
      />
    </div>
    <pre class="exercise-content-details">
            {{content}}
    </pre>
    <!-- 选项 -->
    <div class="ans-item-container">
      <div class="ans-row-container" v-for="item in ansControl" v-if="type === 1 || type === 2">
        <div :style="getChooseColor(item.vocabulary)">{{showCorrectCircle(item.vocabulary)}}</div>
        <div>{{item.ans}}</div>
      </div>
      <!-- <div class="fill-input-container" v-if="type === 3">
                <input
                        class="fill-field"
                        v-for="item in fillNumber"
                        :key="item.key"
                        v-model="item.fillContent"
                >
      </div>-->
    </div>
    <!-- 解析 -->
    <div v-if="studentAns==''">
      <div class="analysis-con" style="color: red">解析:您未作答，正确答案为{{analysisChange(tureAns)}}。</div>
      <div class="analysis-con">{{analysis}}</div>
    </div>
    <div v-else-if="!isTrue">
      <div class="analysis-con" style="color: red">解析:正确答案为{{analysisChange(tureAns)}}，你的答案为 {{analysisChange(studentAns)}}。</div>
      <div class="analysis-con">{{analysis}}</div>
    </div>
    <div v-else-if="isTrue">
      <div class="analysis-con" style="color: green">解析:答案正确。</div>
      <div class="analysis-con">{{analysis}}</div>
    </div>
  </div>
</template>

<script>
import { Icon, Message } from "view-design";
import exerciseApi from "../../../share/api/exerciseApi";

export default {
  components: {
    Icon,
    Message,
  },

  name: "collectQuestion",

  props: [
    "questionId", // ID
    "type", // 题型
    "content", //题干
    "ansList", //question内容
    "isTrue", //是否正确
    "tureAns", //正确答案
    "studentAns", //学生答案
    "analysis", //解析显示
    "total", //题目总数
    "now",
  ],

  data() {
    return {
      //题目类型，单选，判断，填空
      exeType: null,
      //选项内容
      ansControl: [],
      isStar: true,
    };
  },

  mounted() {
    this.answerControl();
    this.transformExeType(this.type);
  },

  methods: {
    //选项数据
    answerControl() {
      if (this.type == 1) {
        this.ansControl.push({ vocabulary: "A", ans: this.ansList.a });
        this.ansControl.push({ vocabulary: "B", ans: this.ansList.b });
        this.ansControl.push({ vocabulary: "C", ans: this.ansList.c });
        this.ansControl.push({ vocabulary: "D", ans: this.ansList.d });
      } else if (this.type == 2) {
        this.ansControl.push({ vocabulary: "1", ans: "正确" });
        this.ansControl.push({ vocabulary: "0", ans: "错误" });
      }
    },

    //修改选择题解析
    analysisChange(str) {
      if (this.type == 2) {
        if (str == "0") return "错误";
        if (str == "1") return "正确";
      }
      return str;
    },

    //类似转为从数字变为中文，1->单选，2->判断，3->填空
    transformExeType(type) {
      switch (type) {
        case 1: {
          this.exeType = "单选题";
          break;
        }
        case 2: {
          this.exeType = "判断题";
          break;
        }
        case 3: {
          this.exeType = "填空题";
          break;
        }
      }
    },

    //获取选项样式
    getChooseColor(str) {
      if (str == this.tureAns) return "background-color: #548cfe; color: white";
      if (str == this.studentAns)
        return "background-color: rgb(255, 67, 30); color: white";
      return "background-color: white; color: #548cfe";
    },

    //点击选择题或者判断题选项之后的操作,新选中的按钮更换颜色，原来的按钮还原状态
    chooseItem(node, itemArr) {
      itemArr.forEach((item) => {
        item.isChoose = item === node;
      });
    },

    //根据vocabulary判断是显示英文还是显示钩和叉
    showCorrectCircle(value) {
      if (value == 1) {
        return "✔";
      } else if (value == 0) {
        return "✗";
      }
      return value;
    },

    //点击星收藏
    collect() {
      this.isStar = !this.isStar;

      let API = this.isStar ? "collectExercise" : "deleteCollect";

      exerciseApi[API]({ questionId: this.questionId }).then(
        ({ state, stateInfo }) => {
          if (state == 1) {
            Message.success("收藏成功");
          } else {
            Message.error(stateInfo);
          }
        }
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import "../exerciseContent/exerciseContent.scss";
</style>