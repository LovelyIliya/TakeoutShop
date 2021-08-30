<template>
  <div class="payment">
    <HeaderTop title="结算界面">
      <span slot="left" @click="$router.back()">
        <i class="iconfont icon-arrow-left"></i>
      </span>
    </HeaderTop>
    <section class="orderlist">
      <div class="list">
        <div class="allcheck">
          <input type="checkbox" :checked="ischeckall" @click="changeCheckedAll"> 全选/全不选
        </div>
        <ul>
          <li v-for="(item,i) in cartFoods" :key="i">
            <div class="img">
              <img :src="item.image">
            </div>
            <div class="checkbox">
              <input type="checkbox" v-model="item.ischecked" :value="item"> 选择
            </div>
            <div class="text">
              <p>{{item.name}}</p>
              <p>{{item.info}}</p>
            </div>
            <div class="price">
              <p>￥{{(item.price*item.count).toFixed(2)}}</p>
              <p>共 {{item.count}} 件</p>
            </div>
            <div class="state">
              <p>等待结算 | <a @click="aa(i)">删除订单</a></p>
            </div>
          </li>
          <div style="height: 75px"></div>
        </ul>
      </div>

      <div class="bottom">
        <div class="info">
          <div class="priceInfo">
          ￥{{allprice.toFixed(2)}}
          </div>
          <div class="settlement">
            结算
          </div>
        </div>
      </div>

    </section>
    <div class="alert" v-if="showalert">
      <div class="mask">
        <div class="window">
          <h3>确定删除订单？</h3>
          <div class="btn">
            <button @click="showalert=false">取消</button>
            <button @click="setState">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import HeaderTop from "../../components/HeaderTop/HeaderTop";

  export default {
    name: "Payment",
    components: {HeaderTop},
    data() {
      return {
        showalert: false,
        delStateIndex: 0
      }
    },
    computed: {
      ...mapState(['cartFoods']),
      allprice() {
        let price = 0
        this.cartFoods.forEach(item => {
          if (item.ischecked) {
            price += item.count * item.price
          }
        })
        return price
      },
      ischeckall() {
        return this.cartFoods.every(item => item.ischecked)
      }
    },
    methods: {
      aa(i) {
        this.showalert = true
        this.delStateIndex = i
      },
      setState() {
        this.cartFoods.splice(this.delStateIndex, 1)
        this.showalert = false
      },
      changeCheckedAll() {
        let flag = !this.ischeckall
        this.cartFoods.forEach(item => item.ischecked = flag)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .payment
    .iconfont
      display block
      margin-top 5px
      color white
      font-size 30px

    .orderlist
      padding-top 45px

      .list
        .allcheck
          position fixed
          margin -40px 0 0 0
          padding-left 22px
          z-index 99
          line-height 40px
          width 100%
          height 40px
          background rgb(245, 245, 245)

      ul
        margin-top 40px

        li
          border 1px solid black
          margin 10px auto
          border-radius 5px
          width 90%
          height 120px
          min-height 120px
          max-height 140px
          background white
          position relative

          img
            float left
            border-radius 6px
            margin 10px
            width 80px
            height 80px

          p
            font-size 14px

          .checkbox
            position absolute
            bottom 5px
            left 12px

          .text
            width 270px
            margin 10px 0

            p:nth-child(1)
              margin-bottom 5px

          .price, .state
            position absolute
            right 4px

          .price
            top 40px
            height 80px
            line-height 24px
            text-align right

            p:nth-child(1)
              font-weight bold

            p:nth-child(2)
              color #8f8f94

          .state
            position absolute
            bottom 5px

            p
              color #8f8f94

            a
              color black
              font-weight bold

    .bottom
      position fixed
      width 100%
      bottom 0
      background #f5f5f5
      height 75px
      z-index 10
      .info
        position absolute
        bottom 15px
        width 85%
        left 50%
        transform translateX(-50%)
        border-radius 30px
        height 50px
        background #050506
        .priceInfo
          position absolute
          color white
          font-size 22px
          height 50px
          line-height 50px
          left 8px
        .settlement
          position absolute
          background #02a710
          width 100px
          height 100%
          right 0
          text-align center
          line-height 50px
          font-weight bold
          color black
          font-size 22px
          border-radius 0 30px 30px 0

    .alert
      width 100%
      height 100%
      overflow hidden

      .mask
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        background rgba(0, 0, 0, .5)

        .window
          position fixed
          left 50%
          top 50%
          width 200px
          height 150px
          text-align center
          border 1px solid black
          border-radius 15px
          background white
          box-sizing border-box
          padding 10px
          transform translate(-50%, -50%)

          .btn
            margin 40px auto
            bottom 10px
            display flex
            width 80%
            justify-content space-between

            button
              border 1px solid #00B7FF
              width 60px
              height 40px
              background rgba(0, 131, 166, .2)
</style>