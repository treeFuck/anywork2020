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
            <submitBtn></submitBtn>
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

    export default {
        name: "exercise",

        data() {
            return {
                exerciseList: null
            }
        },

        components: {
            exerciseHeader: exerciseHeader,
            exerciseContent: exerciseContent,
            calculagrapha: calculagrapha,
            submitBtn: submitBtn
        },

        mounted() {
            // exerciseApi.getExerciseContent({"testpaperId": "24", "choice": "0"}, (res) => {
            //     console.log(res)
            // })

            let a = this.dataControl(data.data)
            this.viewRender(a)
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


            //那自己整理的数据结构渲染成为视图
            viewRender(renderData) {
                this.exerciseList = renderData
            },


        }

    }
</script>


