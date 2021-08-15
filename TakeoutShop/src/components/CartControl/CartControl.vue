<template>
    <div class="cartcontrol">
        <transition name="move">
        <div class="iconfont icon-jian" v-if="food.count" @click.stop="updateFoodCount(true)"></div>
        </transition>
        <div class="cart-count" v-if="food.count">{{food.count}}</div>
        <div class="iconfont icon-jia" @click.stop="updateFoodCount(false)"></div>
    </div>
</template>

<script>
    export default {
        name: "CartControl",
        props: {
            food: Object
        },
        methods: {
            updateFoodCount(isAdd) {
                this.$store.dispatch('updateFoodCount',{isAdd,food:this.food})
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .cartcontrol
        font-size: 0

        .icon-jian
            display: inline-block
            padding 6px
            line-height 24px
            font-size 18px
            color limegreen

            &.move-enter-active, &.move-leave-active
                transition all .3s

            &.move-enter, &.move-leave-to
                opacity 0
                transform translateX(15px) rotate(180deg)

        .cart-count
            display: inline-block
            vertical-align: top
            width: 12px
            padding-top: 6px
            line-height: 24px
            text-align: center
            font-size: 14px

        .icon-jia
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size: 18px
            color limegreen
</style>