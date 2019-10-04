import HomePage from './home-page/HomePage'
import AdminPage from './admin-page/AdminPage'
import MyPage from './my-page/MyPage'
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
        name: 'my-page',
        component: MyPage,
        meta: {

        }
    }
]