<template>
    <div class="header-container">
        <div class="header-left-container">
            <img src="../../../assets/images_ysy/preview@3x.png"/>
            <div class="header-left-title">
                {{headerTitle}}
            </div>
        </div>
        <div class="header-right-container">
            <img src="../../../assets/images_ysy/anywork@3x.png"/>
        </div>
    </div>
</template>

<script>
    /**
     * @author 小余
     * 本组件课前是header组件，用途是针对课前预习，课后复习等模块进行标题复用
     * 组件用法，只需要传入一个header的内容headerTitle即可
     */
    export default {
        name: "exerciseHeader",

        props: {
            headerTitle: {
                type: String
            }
        }


    }
</script>

<style scoped lang="scss">
    @import "exerciseHeader.scss";
</style>
