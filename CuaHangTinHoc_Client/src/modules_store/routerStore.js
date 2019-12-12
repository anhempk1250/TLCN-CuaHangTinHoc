import StorePage from './store-page/StorePage.vue'
import CategoryPage from './category-page/CategoryPage.vue'
import ProductPage from './product-page/ProductPage'
import OrderPage from './order-page/OrderPage'
import PromotionPage from './promotion-page/PromotionPage'
import AccountPage from './account-page/AccountPage'
import CustomerPage from './customer-page/CustomerPage'
import ProfitPage from './profit-page/ProfitPage'
import SalesPage from './sales-page/SalesPage'
import OverviewPage from './overview-page/OverviewPage'
import ProductTypePAge from './product-type-page/ProductTypePage'
export default [
    {
        path: '/store',
        component: StorePage,
        children: [
            {
                path: '',
                name: 'overview',
                component: OverviewPage
            },
            {
                path: 'category',
                name: 'category',
                component: CategoryPage
            },
            {
                path: 'products',
                name: 'products',
                component: ProductPage
            },
            {
                path: 'productType',
                name: 'productType',
                component: ProductTypePAge

            },
            {
                path: 'order',
                name: 'order',
                component: OrderPage
            },
            {
                path: 'promotion',
                name: 'promotion',
                component: PromotionPage
            },
            {
                path: 'info',
                name: 'info',
                component: AccountPage
            },
            {
                path: 'customer',
                name: 'customer',
                component: CustomerPage
            },
            {
                path: 'profit', // lợi nhuận
                name: 'profit',
                component: ProfitPage

            },
            {
                path: 'sales', // doanh số,
                name: 'sales',
                component: SalesPage
            }
        ]
    }
]