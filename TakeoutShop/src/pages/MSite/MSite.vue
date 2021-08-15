<template>
    <div class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
            <router-link slot="left" class="header_search" to="/search">
                <i class="iconfont icon-sousuo"></i>
            </router-link>
            <router-link slot="right" class="header_login" :to="userInfo._id ? '/userinfo' : '/login' ">
                <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
                <span class="header_login_text" v-else>
                    <i class="iconfont icon-wode" style="font-size: 21px"></i>
                </span>
            </router-link>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
            <div class="swiper-container"  v-if="categorys.length">
                <div class="swiper-wrapper">
                    <!--分类区-->
                    <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
                        <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                            <div class="food_container">
                                <img :src="baseImageUrl+category.image_url">
                            </div>
                            <span>{{category.title}}</span>
                        </a>
                    </div>
                </div>
                <!-- 分页 -->
                <div class="swiper-pagination"></div>
            </div>
            <img src="./images/msite_back.svg" alt="" v-else>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
            <div class="shop_header">
                <i class="iconfont icon-xuanxiang"></i>
                <span class="shop_header_title">附近商家</span>
            </div>
            <shop-list/>
        </div>
    </div>
</template>

<script>
    import HeaderTop from "../../components/HeaderTop/HeaderTop";
    import ShopList from "../../components/ShopList/ShopList";
    import {mapState} from 'vuex'
    import Swiper from 'swiper/swiper-bundle.min'
    import 'swiper/swiper-bundle.min.css'
    export default {
        name: "MSite",
        data(){
            return{
                baseImageUrl:'https://fuss10.elemecdn.com/'
            }
        },
        components:{
            ShopList,
            HeaderTop
        },
        mounted() { //生命周期函数，页面加载完毕后执行
            this.$store.dispatch('getCategorys')
            this.$store.dispatch('getShops')
        },
        watch:{ //监听
          categorys(){ //categorys中有数据了
              this.$nextTick(()=>{ //界面更新完毕后执行
                  // 创建一个swiper实例对象，实现轮播
                  new Swiper('.swiper-container',{
                      loop: true, // 循环轮播
                      pagination: {
                          el: '.swiper-pagination',
                      }
                  })
              })
          },
        },
        computed:{
            ...mapState(['address','categorys','userInfo']), //调用state中的属性
            //根据categorys一维数组生成一个二维数组
            //小数组中的元素个数最大是8
            categorysArr(){
                const {categorys}=this //指向computed ，获得...mapState中的categorys
                //准备空的二维数组
                const arr=[]
                let minArr=[]
                categorys.forEach(c=>{
                    if (minArr.length===8){
                        minArr=[]
                    }
                    if (minArr.length===0){
                        arr.push(minArr)
                    }
                    minArr.push(c)
                })
                return arr
            },
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .msite  //首页
        width 100%
        .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
                width 100%
                height 100%
                .swiper-wrapper
                    width 100%
                    height 100%
                    .swiper-slide
                        display flex
                        justify-content center
                        align-items flex-start
                        flex-wrap wrap
                        .link_to_food
                            width 25%
                            .food_container
                                display block
                                width 100%
                                text-align center
                                padding-bottom 10px
                                font-size 0
                                img
                                    display inline-block
                                    width 50px
                                    height 50px
                            span
                                display block
                                width 100%
                                text-align center
                                font-size 13px
                                color #666
                .swiper-pagination
                    >span.swiper-pagination-bullet-active
                        background limegreen
        .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
                padding 10px 10px 0
                .shop_icon
                    margin-left 5px
                    color #999
                .shop_header_title
                    color #999
                    font-size 14px
                    line-height 20px

</style>