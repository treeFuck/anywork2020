<template>
    <div class="wrongQuestions">
    <div class="big-container">
      <div class="main-container">
        <Indexheader></Indexheader>
        <div class="title">
          <img src="../../../assets/images/preview@1x.png" alt="eyes">
          <div class="title-context">错题收藏</div>
        </div>

        <div>
            <!-- 题目组件 -->
            
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Indexheader from "../../../components/head/head.vue";
import WrongQs from "../../../share/api/wrongQuestionApi";

export default {
    name: 'wrongQuestions',

    components: {
        Indexheader
    },

    data(){
        return {
            wrongQuestions:[], //错题，存content、questionid
        }
    },

    methods: {
        getWrongQ(){
            let that = this;
            WrongQs.getWrongQuestion().then(res => {
                // console.log(res);
                if(res.state == 1){
                    this.wrongQuestions = res.data;
                    console.log(this.wrongQuestions);
                } else {
                    console.log(res.stateInfo);
                }
                
            })
        },
    },

    mounted(){
        this.getWrongQ();
    }    

}
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