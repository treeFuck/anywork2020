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
            {{calculateDate}}
        </div>

        <div class="calculagraph-details-container">
            回到顶部
        </div>
    </div>
</template>

<script>
    import * as globalUtils from '../../../share/utils/globalUtils'
    //右下角悬浮定时器组件
    export default {
        name: "calculagraph",

        data() {
            return {
                dateStart: 0,
                calculateDate: '00:00:00'
            }
        },

        computed: {

        },

        mounted() {
            this.calculateStart()
        },

        methods: {
            //时间倒数开始
            calculateStart() {
                setInterval(() => {
                    this.dateStart++
                    this.calculateDate = this.dateShow(this.dateStart)
                }, 1000)
            },

            dateShow(count) {
                let seconds = globalUtils.verifyDateFormat(count % 60)
                let minutes = globalUtils.verifyDateFormat(parseInt(((count / 60) % 60).toString()))
                let hours = globalUtils.verifyDateFormat(parseInt((count / 60 / 60).toString()))

                return `${hours}:${minutes}:${seconds}`
            }
        }
    }
</script>

