<style scoped lang="scss">
    @import "exercise";
</style>

<template>
    <div class="exercise-container">
        <calculagrapha></calculagrapha>
        <div class="header-component-container">
            <exerciseHeader
                    :headerTitle="title"
                    :score="score"
                    :show="finishStatus"
            ></exerciseHeader>
        </div>
        <div class="exercise-content-container">
            <div>
                <exerciseContent
                        v-for="item in exerciseList"
                        :key="item.questionId"
                        :exeIndex="item.index"
                        :fillNumber="item.fillNumber"
                        :analysis="item.analysis"
                        :content="item.content"
                        :id="item.questionId"
                        :ansList="item.ansList"
                        :type="item.type"
                        :star="item.isStar"
                        :ban="finishStatus"
                >
                </exerciseContent>
            </div>
        </div>
        <div>
            <submitBtn
                    v-if="!finishStatus"
                    @submit="confirmSubmitData"
            ></submitBtn>
        </div>
    </div>
</template>

<script>
    import exerciseHeader from "../../../components/exerciseComponent/exerciseHeader/exerciseHeader";
    import exerciseContent from "../../../components/exerciseComponent/exerciseContent/exerciseContent";
    import exerciseApi from "../../../share/api/exerciseApi";
    import {judgeMode, judgeStatus, reFormatData} from "./utils";
    import calculagrapha from "../../../components/exerciseComponent/calculagraph/calculagraph";
    import submitBtn from "../../../components/exerciseComponent/submitBtn/submitBtn";
    import * as globalUtils from '../../../share/utils/globalUtils'
    import {Message} from 'view-design'
    import {autoFillAns} from "./utils";

    export default {
        name: "exercise",

        data() {
            return {
                //标题 2->课前预习 1->考试 3->课后复习
                title: '',

                exerciseList: null,

                testpaperId: null,

                //用户是否完成该章节题目的标志
                finishStatus: true,

                //学生成绩
                score: {score: 0}
            }
        },

        components: {
            exerciseHeader: exerciseHeader,
            exerciseContent: exerciseContent,
            calculagrapha: calculagrapha,
            submitBtn: submitBtn,
        },

        mounted() {
            this.getExercisePaperId()

            this.getExerciseData()
        },

        methods: {
            /**
             * 把后台传送过来的数据整理一次成为我们渲染的格式，和后台解耦
             * @param outerData
             */
            dataControl(outerData) {
                const renderData = []

                if (outerData) {
                    for (let i = 0; i < outerData.length; i++) {
                        renderData.push(reFormatData(outerData[i], i))
                    }
                } else {
                    Message.info('没有题目')
                }

                return renderData
            },

            //页面渲染的时候请求习题
            getExerciseData() {
                let paperStatus = judgeStatus(this.$route.query.paperStatus)

                exerciseApi.getExerciseContent({"testpaperId": this.testpaperId, "choice": paperStatus}).then((res) => {
                    //处于完成状态的时候才需要执答题结果查询
                    if (this.finishStatus) {
                        this.getDetails()
                    }

                    this.viewRender(this.dataControl(res.data))
                })
            },


            //btn组件点击确认之后触发事件，进行答案提交
            confirmSubmitData(type) {
                const requestData = {
                    "studentId": JSON.parse(sessionStorage.getItem("anyworkUserInfo")).userId,
                    "testpaperId": this.testpaperId,
                    // int 1为临时保存，0为正常提交,
                    "temporarySave": type.type,
                    // string 格式为yyyy-MM-dd HH:mm:ss
                    "endTime": globalUtils.getCurrentDate(),
                    "studentAnswer": []
                }

                //整理请求格式
                this.reFormatExerciseContent(requestData.studentAnswer)

                exerciseApi.submitAnswerData(requestData).then(({state, stateInfo}) => {
                    if (state == 1) {
                        Message.success(stateInfo)
                        this.$router.go(-1)
                    } else {
                        Message.error(stateInfo)
                    }
                })
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
                        case 4: {}
                        case 3: {
                            const userAns = item.fillNumber

                            const data = {
                                questionId: item.questionId,
                                studentAnswer: ''
                            }

                            requestArray.push(data)

                            //如果是一个题有几个填空位置，不同回答之间需要用∏隔开
                            if (userAns.length === 1) {
                                data.studentAnswer = userAns[0].fillContent
                            } else {
                                console.log(userAns)
                                userAns.forEach(value => {
                                    //去除空格以后长度为0，就是用户什么东西都没有写
                                    if (value.fillContent == "") {
                                        data.studentAnswer += " " + '∏'
                                    } else if (!globalUtils.removeSpace(value.fillContent).length) {
                                        data.studentAnswer += " " + '∏'
                                    } else {
                                        data.studentAnswer += value.fillContent + '∏'
                                    }
                                })
                                //把末尾多余的一个∏替换掉
                                data.studentAnswer = data.studentAnswer.substring(0, data.studentAnswer.length - 1)
                            }

                            if (!globalUtils.removeSpace(data.studentAnswer).length) {
                                data.studentAnswer = " "
                            }

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
                let { testpaperId, mode, paperStatus } = this.$route.query

                this.title = judgeMode(mode)

                this.finishStatus = parseInt(paperStatus.toString()) === 1

                this.testpaperId = testpaperId
            },

            //获取试卷答案 如果用户这份试卷已经完成了 那么就把答案解析显示出来
            getDetails() {
                if (this.finishStatus) {
                    exerciseApi.getDoneDetails({ testpaperId: this.testpaperId }).then(({state, stateInfo, data}) => {
                        this.score.score = data.socre

                        autoFillAns(data, this.exerciseList)
                    })
                }
            },

        }

    }
</script>


