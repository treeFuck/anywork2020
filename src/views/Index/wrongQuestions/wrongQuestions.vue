<template>
  <div class="wrongQuestions">
    <div class="big-container">
      <div class="main-container">
        <Indexheader></Indexheader>
        <div class="title">
          <img src="../../../assets/images/exam@1x.png" alt="problems" />
          <div class="title-context">错题收藏</div>
        </div>

        <div>
          <collectQuestion
          v-for="(item, index) in exerciseList"
            :key="item.question.questionId"
            :questionId="item.question.questionId"
            :type="item.question.type"
            :content="item.question.content"
            :ansList="item.question"
            :isTure="item.isTure"
            :tureAns="item.question.key"
            :studentAns="item.studentAnswer"
            :analysis="item.question.analysis"
            :total="exerciseList.length"
            :now="index"
          ></collectQuestion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Indexheader from "../../../components/head/head.vue";
import WrongQs from "../../../share/api/wrongQuestionApi";
import exerciseApi from "../../../share/api/exerciseApi";
import collectQuestion from "../../../components/exerciseComponent/collectQuestion/collectQuestion.vue";

export default {
  name: "wrongQuestions",

  components: {
    Indexheader,
    collectQuestion,
  },

  data() {
    return {
      wrongQuestions: [], //错题，存content、questionid
      exerciseList: [], //详细信息
    };
  },

  methods: {
    getWrongQ() {
      let that = this;
      WrongQs.getWrongQuestion().then((res) => {
        if (res.state == 1) {
          this.wrongQuestions = res.data;
          this.dataControl(res.data);
        } else {
          console.log(res.stateInfo);
        }
      });
    },

    /* 根据id找题目详细信息 */
    dataControl(arr) {
      arr.forEach((item, index) => {
        this.getExerciseList(item.questionId);
      });
    },
    getExerciseList(id) {
      WrongQs.getDetailAns({ questionId: id }).then((res) => {
        if (res.state == 1 ) {
          this.exerciseList.push(res.data);
        }
      }).catch(err=>{
        console.log(err);
      });
    },
  },

  mounted() {
    this.getWrongQ();
  },
};
</script>

<style scoped lang="scss">
@import "../index";
$fontColor: #548cfe;
.wrongQuestions {
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
}
</style>