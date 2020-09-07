<style scoped lang="scss">
    @import "../../../share/cssMixin/cssMixin";
    .calculagraph-container {
        position: fixed;
        right: 60px;
        bottom: 70px;
        z-index: 1;

        .calculagraph-details-container {
            @include flex-layout;
            $circleSize: 70px;
            margin: 10px 0;
            border-radius: 50%;
            width: $circleSize;
            height: $circleSize;
            font-size: 14px;
            background-color: #548cfe;
            color: white;
        }
    }
</style>

<template>
    <div class="calculagraph-container">
        <div class="calculagraph-details-container">
            03:36:29
        </div>

        <div class="calculagraph-details-container">
            回到顶部
        </div>
    </div>
</template>

<script>
    export default {
        name: "calculagraph",

        data() {
            return {
                calculateDate: 0
            }
        },

        computed: {

        },

        methods: {
            //时间倒数开始
            calculateStart() {
                setInterval(() => {

                }, 1000)
            }
        }
    }
</script>

