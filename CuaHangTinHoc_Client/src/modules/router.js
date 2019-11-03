import HomePage from './home-page/HomePage.vue'
import AdminPage from './admin-page/AdminPage.vue'
import MyPage from './my-page/MyPage.vue'
import ProductDetailPage from './product-detail-page/ProductDetailPage.vue'
import NotFoundPage from './not-found-page/NotFoundPage.vue'
import CartPage from './cart-page/CartPage.vue'
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
        component: MyPage
    },
    {
        path: '/product/:id',
        name: 'product',
        component: ProductDetailPage,
        meta: {
            product: {}
        }
    },
    {
        path: '/cart',
        name: 'cart',
        component: CartPage
    },
    {
        path: '/404',
        name: 'not-found-page',
        component: NotFoundPage
    },
    {
        path: '*',
        redirect: '/404'
    }
]