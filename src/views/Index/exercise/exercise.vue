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
    import {reFormatExerciseContent} from "./utils";

    export default {
        name: "exercise",

        data() {
            return {
                exerciseList: null,
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
                exerciseApi.getExerciseContent({"testpaperId": "27", "choice": "0"}).then((res) => {
                    console.log(res)
                    this.viewRender(this.dataControl(res.data.data))
                })
            },


            //btn组件点击确认之后触发事件，进行答案提交
            confirmSubmitData(type) {
                const requestData = {
                    "studentId": this.$store.state.userInfo.userId,
                    "testpaperId": 1,
                    // int 1为临时保存，0为正常提交,
                    "temporarySave": type.submitOrSave,
                    // string 格式为yyyy-MM-dd HH:mm:ss
                    "endTime": globalUtils.getCurrentDate(),
                    "studentAnswer": []
                }

                //整理请求格式
                this.reFormatExerciseContent(requestData.studentAnswer)

                exerciseApi.submitAnswerData(requestData, (res) => {
                    console.log(res)
                })

                console.log(requestData)
            },

            //遍历练习数组，整理用户填写的答案整理为后端数据发送格式
            reFormatExerciseContent(requestArray) {
                this.exerciseList.forEach(item => {
                    switch (item.type) {
                        case 2: {
                        }
                        case 1: {
                            const data = {
                                questionId: item.questionId,
                                studentAnswer: ''
                            }

                            item.ansList.forEach(value => {
                                value.isChoose && (data.studentAnswer = value.vocabulary)
                            })

                            requestArray.push(data)
                            break
                        }
                        case 3: {
                            const userAns = item.fillNumber

                            const data = {
                                questionId: item.questionId,
                                studentAnswer: ''
                            }

                            requestArray.push(data)

                            //如果是一个题有几个填空位置，不同回答之间需要用∏隔开
                            userAns.forEach(value => {
                                data.studentAnswer += value.fillContent + '∏'
                            })

                            //把末尾多余的一个∏替换掉
                            data.studentAnswer = data.studentAnswer.substring(0, data.studentAnswer.length - 1)

                            break
                        }

                        default: {
                            throw new Error('前端出现错误，没有这个题目类型')
                        }
                    }
                })
            },

            //那自己整理的数据结构渲染成为视图
            viewRender(renderData) {
                this.exerciseList = renderData
            },

            //从路由参数中获取学生的测试卷子的id
            getExercisePaperId() {
                this.$route.query
            }


        }

    }
</script>


