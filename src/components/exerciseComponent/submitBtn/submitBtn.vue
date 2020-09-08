<style scoped lang="scss">
    @import "../../../share/cssMixin/cssMixin";

    $heightBtn: 2rem;

    .btn-container {
        height: $heightBtn;
        width: 100%;
    }

    .btn {
        float: right;
        @include text-align-center($heightBtn);
        height: $heightBtn;
        width: 104px;
        background-color: #19be6b;
        color: white;
        border-radius: 4px;
        margin-right: 2rem;
    }

</style>

<template>
    <div class="btn-container">
        <div class="btn" @click="beforeSubmitConfirm(1)">提交</div>
        <div class="btn" @click="beforeSubmitConfirm(0)">保存</div>
    </div>
</template>

<script>


    import {Modal} from "view-design";

    export default {
        name: "submitBtn",

        data() {
            return {
                exerciseList: null
            }
        },

        components: {},

        mounted() {

        },

        methods: {
            //向后台提交数据,提交前的最后询问
            beforeSubmitConfirm() {
                Modal.confirm({
                    title: '操作确认',
                    content: '<p>您确认要提交吗</p>',
                    onOk: () => {
                        this.submitData()
                    },
                });
            },

            //正式提交数据,emit触发父组件方法
            submitData(submitOrSave) {
                this.$emit('submit', {
                    //int 1为临时保存，0为正常提交
                    type: submitOrSave
                })
            },
        }

    }
</script>



