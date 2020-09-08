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
        <div class="btn">提交</div>
        <div class="btn">保存</div>
    </div>
</template>

<script>


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

        methods: {}

    }
</script>



