<template>
    <div class="exercise-content-container">
        <div class="exercise-content-number">
            {{exeNumber}}. ({{exeType}})
        </div>
        <pre class="exercise-content-details">
            {{exerciseDetails}}
        </pre>
        <div class="ans-item-container">
            <div class="ans-row-container" v-for="item in ansRowList" :key="item.key" v-if="type === 1 || type === 2">
                <div
                        :style="item.isChoose ?
                        'background-color: #548cfe; color: white' :
                        'background-color: white; color: #548cfe'"
                        @click="chooseItem(item, ansRowList)"
                >
                    {{showCorrectCircle(item.vocabulary)}}
                </div>
                <div>{{item.ans}}</div>
            </div>
            <div class="fill-input-container" v-if="type === 3">
                <input
                        class="fill-field"
                        v-for="item in fillNumber"
                        :key="item.key"
                        v-model="item.fillContent"
                >
                </input>
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
            //如果是填空题的话，这个字段表示填空的数量，用于动态显示若干个输入框
            fillNumber: {
                type: Array
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
            },
        },

        data() {
            return {
                //题号信息
                exeNumber: this.exeIndex,
                //问题内容
                exerciseDetails: this.content,
                //存放答案选项
                ansRowList: this.ansList,
                //题目类型，单选，判断，填空
                exeType: null,
                //存储学生回答情况数组
                studentAnswerList: new Map()
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
            },

            //点击选择题或者判断题选项之后的操作,新选中的按钮更换颜色，原来的按钮还原状态
            chooseItem(node, itemArr) {
                itemArr.forEach(item => {
                    item.isChoose = item === node;
                })
            },

            //根据vocabulary判断是显示英文还是显示钩和叉
            showCorrectCircle (value) {
                if (value == 1) {
                    return '✔'
                } else if (value == 0) {
                    return '✗'
                }
                return value
            },

        }

    }
</script>

<style scoped lang="scss">
    @import "exerciseContent";
</style>
