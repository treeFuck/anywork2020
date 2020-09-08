<style scoped lang="scss">
    @import "exercise";
</style>

<template>
    <div class="exercise-container">
        <calculagrapha></calculagrapha>
        <div class="header-component-container">
            <exerciseHeader :headerTitle="'课前预习'"></exerciseHeader>
        </div>
        <div class="exercise-content-container">
            <div>
                <exerciseContent
                        v-for="item in exerciseList"
                        :key="item.questionId"
                        :exeIndex="item.index"
                        :fillNumber="item.fillNumber"
                        :content="item.content"
                        :id="item.questionId"
                        :ansList="item.ansList"
                        :type="item.type"
                        @collect="collectUserAnswerResult"
                >exercise-container
                </exerciseContent>
            </div>
        </div>
        <div>
            <submitBtn
                    @submit="confirmSubmitData"
            ></submitBtn>
        </div>
    </div>
</template>

<script>
    import exerciseHeader from "../../../components/exerciseComponent/exerciseHeader/exerciseHeader";
    import exerciseContent from "../../../components/exerciseComponent/exerciseContent/exerciseContent";
    import exerciseApi from "../../../share/api/exerciseApi";
    import {data} from "../../../share/testData/exercise";
    import {reFormatData} from "../../../components/exerciseComponent/exerciseContent/utils";
    import calculagrapha from "../../../components/exerciseComponent/calculagraph/calculagraph";
    import submitBtn from "../../../components/exerciseComponent/submitBtn/submitBtn";
    import * as globalUtils from '../../../share/utils/globalUtils'

    export default {
        name: "exercise",

        data() {
            return {
                exerciseList: null,
                collectUserAnswerList: new Map()
            }
        },

        components: {
            exerciseHeader: exerciseHeader,
            exerciseContent: exerciseContent,
            calculagrapha: calculagrapha,
            submitBtn: submitBtn,
        },

        mounted() {
            this.getExerciseData()
        },

        methods: {
            /**
             * 把后台传送过来的数据整理一次成为我们渲染的格式，和后台解耦
             * @param outerData
             */
            dataControl(outerData) {
                const renderData = []

                for (let i = 0; i < outerData.length; i++) {
                    renderData.push(reFormatData(outerData[i], i))
                }

                return renderData
            },

            //页面渲染的时候请求习题
            getExerciseData() {
                exerciseApi.getExerciseContent({"testpaperId": "27", "choice": "0"}, (res) => {
                    console.log(res)
                    this.viewRender(this.dataControl(res.data))
                })
            },

            //选择单个题目之后通过在组件中emit，触发这个方法，从而收集用户的填写答案
            collectUserAnswerResult(collectResult) {
                this.collectUserAnswerList.set(collectResult.questionId, collectResult.studentAnswer)
                console.log(this.collectUserAnswerList)
            },

            //btn组件点击确认之后触发事件，进行答案提交
            confirmSubmitData(type) {
                const requestData = {
                    "studentId": 1,
                    "testpaperId": 1,
                    // int 1为临时保存，0为正常提交,
                    "temporarySave": type.submitOrSave,
                    // string 格式为yyyy-MM-dd HH:mm:ss
                    "endTime": globalUtils.getCurrentDate(),
                    "studentAnswer": []
                }

                for (const key of this.collectUserAnswerList) {
                    requestData.studentAnswer.push({
                        questionId: key[0],
                        studentAnswer: key[1]
                    })
                }

                exerciseApi.submitAnswerData(requestData, (res) => {
                    console.log(res)
                })

                console.log(requestData)
            },

            //那自己整理的数据结构渲染成为视图
            viewRender(renderData) {
                this.exerciseList = renderData
            },


        }

    }
</script>


