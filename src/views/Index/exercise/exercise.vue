<style scoped lang="scss">
    @import "exercise";
</style>

<template>
    <div class="exercise-container">
        <div class="header-component-container">
            <exerciseHeader :headerTitle="'课前预习'"></exerciseHeader>
        </div>
        <div class="exercise-content-container">
            <div>
                <exerciseContent
                        v-for="item in exerciseList"
                        :key="item.questionId"
                        :exeIndex="item.index"
                        :content="item.content"
                        :id="item.questionId"
                        :ansList="item.ansList"
                        :type="item.type"
                >
                </exerciseContent>
            </div>
        </div>
    </div>
</template>

<script>
    import exerciseHeader from "../../../component/exerciseComponent/exerciseHeader/exerciseHeader";
    import exerciseContent from "../../../component/exerciseComponent/exerciseContent/exerciseContent";
    import exerciseApi from "../../../share/api/exerciseApi";
    import {data} from "../../../share/testData/exercise";
    import LoginApi from "../../../share/api/loginApi";
    import {reFormatData} from "../../../component/exerciseComponent/exerciseContent/utils";

    export default {
        name: "exercise",

        data() {
            return {
                exerciseList: null
            }
        },

        components: {
            exerciseHeader: exerciseHeader,
            exerciseContent: exerciseContent
        },

        mounted() {
            // LoginApi.login({
            //     "studentId": "3118004982",
            //     "password": "123456",
            //     "valcode": "123"
            // }, (data) => {
            //     console.log(data)
            //     exerciseApi.getExerciseContent({testpaperId: 24, choice: 0}, () => {
            //
            //     })
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


