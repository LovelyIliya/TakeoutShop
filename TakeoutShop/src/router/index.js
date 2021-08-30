import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from "../pages/MSite/MSite";
import Order from "../pages/Order/Order";
import Profile from "../pages/Profile/Profile";
import Search from "../pages/Search/Search";
import Login from "../pages/Login/Login";
import Shop from "../pages/Shop/Shop";
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods";
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo";
import ShopRatings from "../pages/Shop/ShopRatings/ShopRatings";
import Payment from "../pages/Payment/Payment";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/msite',
    },

    {
        path: '/msite',
        component: MSite,
        meta: {
            showFooter: true
        }
    },

    {
        path: '/search',
        component: Search,
        meta: {
            showFooter: true
        }
    },

    {
        path: '/order',
        component: Order,
        meta: {
            showFooter: true
        }
    },

    {
        path: '/profile',
        component: Profile,
        meta: {
            showFooter: true
        }
    },

    {
        path: '/login',
        component: Login
    },

    {
        path: '/shop',
        component: Shop,
        redirect: '/shop/goods',
        children:[
            {
                path:'goods',
                component:ShopGoods
            },
            {
                path:'ratings',
                component:ShopRatings
            },
            {
                path:'info',
                component:ShopInfo
            }
        ]
    },

    {
        path: '/payment',
        component: Payment
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
