<template>
    <div class="exercise-content-container">
        <div class="exercise-content-number">
            {{exeNumber}} ({{exeType}})
        </div>
        <div class="exercise-content-details" v-text="exerciseDetails">
            {{exerciseDetails}}
        </div>
        <div class="ans-item-container">
            <div class="ans-row-container" v-for="item in ansRowList" :key="item.key">
                <div>{{item.vocabulary}}</div>
                <div>{{item.ans}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "exerciseContent",

        props: {
            exeIndex: {
                type: Number
            },
            type: {
                type: Number
            },
            content: {
                type: String,
            },
            id: {
                type: Number
            },
            ansList: {
                type: Array
            }
        },

        data() {
            return {
                //题号信息
                exeNumber: this.exeIndex,
                //问题内容
                exerciseDetails: this.content,
                //存放答案选项
                ansRowList: this.ansList,
                //题目类似，单选，判断，填空
                exeType: null
            }
        },

        mounted() {
            this.transformExeType(this.type)
        },

        methods: {
            //类似转为从数字变为中文，1->单选，2->判断，3->填空
            transformExeType(type) {
                switch (type) {
                    case 1: {
                        this.exeType = '单选题'
                        break
                    }
                    case 2: {
                        this.exeType = '判断题'
                        break
                    }
                    case 3: {
                        this.exeType = '填空题'
                        break
                    }
                }
            }
        }

    }
</script>

<style scoped lang="scss">
    @import "exerciseContent";
</style>
