import HomePage from './home-page/HomePage.vue'
import AdminPage from './admin-page/AdminPage.vue'
import MyPage from './my-page/MyPage.vue'
import ProductDetailPage from './product-detail-page/ProductDetailPage.vue'
import NotFoundPage from './not-found-page/NotFoundPage.vue'
import CartPage from './cart-page/CartPage.vue'
import LoginPage from './login-page/LoginPage.vue';
import PolicyPage from './warranty-policy-page/WarrantyPolicyPage.vue'
import ShowRoomPage from './show-room-page/ShowRoomPage'
import ProductListPage from './product-list-page/ProductListPage.vue'
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
        path: '/mypage',
        name: 'mypage',
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
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/policy',
        name: 'policy',
        component: PolicyPage
    },
    {
        path: '/showroom',
        name: 'showroom',
        component: ShowRoomPage
    },
    {
        path: '/productList',
        name: 'productList',
        meta: {
            categoryID: '',
            typeID: '',
            producerID: '',
        },
        component: ProductListPage
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