import HomePage from './home-page/HomePage.vue'
import AdminPage from './admin-page/AdminPage.vue'
import MyPage from './my-page/MyPage.vue'
import ProductDetailPage from './product-detail-page/ProductDetailPage.vue'
export default [
    {
        path: '/',
        name: 'home-page',
        component: HomePage,
        meta: {
        }
    },
    {
        path: '/admin',
        name: 'admin-page',
        component: AdminPage,
        meta: {

        }
    },
    {
        path: '/mypage/',
        name: 'my-page',
        component: MyPage,
        meta: {

        }
    },
    {
        path: '/product/:id/:name',
        name: 'product',
        component: ProductDetailPage,
        meta: {
            product: {}
        }
    },
    {
        path: '/404',
        name: 'not-found-page',
        component: MyPage
    },
    {
        path: '*',
        redirect: '/404'
    }

]