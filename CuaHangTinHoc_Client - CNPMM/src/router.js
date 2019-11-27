import Vue from 'vue'
import Router from 'vue-router'

import childrenRouter from './modules/router'
import Index from './views/index/Index.vue'
import IndexStore from './views/store/IndexStore.vue'
import childrenRouterStore from './modules_store/routerStore'
import LoginPage from './modules_store/login-page/LoginPage'
Vue.use(Router)

const baseRoutes = [

    {
        path: '/mystore/login',
        name: 'storeLoginPage',
        component: LoginPage
    },
    {
        path: '/store',
        component: IndexStore,
        children: childrenRouterStore
    },
    {
        path: '/',
        component: Index,
        children: childrenRouter
    }
]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: baseRoutes,
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
})


export default router


