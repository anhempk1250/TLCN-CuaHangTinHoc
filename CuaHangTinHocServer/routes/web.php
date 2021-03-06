<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::match(['get', 'post'], '/botman', 'BotManController@handle');
Route::get('/botman/tinker', 'BotManController@tinker');

// home page
//Route::get('/products','HomePageController@getSummaryProductList');

Route::get('/productCategory','HomePageController@getProductCategoryList');
Route::get('/producers', 'HomePageController@getProducerList');
Route::get('/productType','HomePageController@getProductTypeList');


// product list page
Route::get('/productFromProductListPage', 'ProductListPageController@getProductListFromProductListPage');
Route::get('/productCategoryFromProductListPage', 'ProductListPageController@getCategoryListFromProductListPage');
Route::get('/producerFromProductListPage','ProductListPageController@getProducerFromProductListPage');


// product detail page
Route::get('/productDetails','ProductDetailController@getProduct');
Route::get('/commentProduct','ProductDetailController@getCommentList');


// order - page
Route::get('/storeOrders','StoreOrderPageController@getListOrder');
Route::put('/storeOrders','StoreOrderPageController@updateOrderStatus');

// customer account
// register
Route::post('/customerRegister','CustomerController@register');


// login
Route::get('/customerLogin', 'CustomerController@login');
// login with social
Route::get('/loginSocial', 'CustomerController@loginSocial');

// request with check token of customer
Route::group(['middleware' => 'jwt.auth'], function () {
    // check login customer
    Route::get('/checkLoginCustomer', 'CustomerController@checkLoginCustomer');

    Route::patch('/customer', 'CustomerController@updateCustomer');

    Route::post('/customerOrder', 'CustomerController@makeOrder');
    Route::get('/customerOrder', 'CustomerController@getOrderList');
    Route::delete('/customerOrder', 'CustomerController@cancelOrder');

    Route::get('/customerOrderSuccess', 'CustomerController@getOrderSuccessList');

    Route::post('/customerInsertComment','CustomerController@insertComment');

    Route::get('/customerOrderComment', 'CustomerController@getOrderComment');
});







//Route::get('/checkToken','EmployeeController@storeCheckToken', 'EmployeeController@text');

Route::get('/storeAuthen', 'EmployeeController@storeLogin');



// request with check token of employee
Route::group([
    'middleware' => ['jwt.auth'],
], function ($router) {
    // check  token (customer && employee)
    Route::get('/checkToken','EmployeeController@storeCheckToken');

    // store category page

    Route::get('/storeCategory', 'StoreCategoryPageController@getCategoryList');
    Route::post('/storeCategory', 'StoreCategoryPageController@createCategory');
    Route::patch('/storeCategory', 'StoreCategoryPageController@updateCategory');
    Route::delete('/storeCategory', 'StoreCategoryPageController@deleteCategory');

    // store product page
    Route::get('/storeProduct','StoreProductPageController@getProduct');
    Route::post('/insertStoreProduct','StoreProductPageController@insertProduct');
    Route::post('/updateStoreProduct','StoreProductPageController@updateProduct');
    Route::delete('/storeProduct', 'StoreProductPageController@deleteProduct');
    Route::get('/storeCategoryFromProductPage', 'StoreCategoryPageController@getCategoryListFromProductPage');
    Route::get('/storeProducerFromProductPage','StoreProducerPageController@getProducer');

    // store product type page
    Route::get('/storeProductType','StoreProductTypePageController@getStoreProductTypeList');
    Route::post('/storeProductType','StoreProductTypePageController@insertProductType');
    Route::patch('/storeProductType','StoreProductTypePageControlcustomerRegisterler@updateProductType');
    Route::delete('/storeProductType','StoreProductTypePageController@deleteProductType');
    Route::post('/storeProductWithType', 'StoreProductTypePageController@addStoreProductToType');
    Route::delete('/storeProductWithType', 'StoreProductTypePageController@deleteStoreProductFromType');
    Route::get('/storeProductListFromProductTypePage',
        'StoreProductTypePageController@getStoreProductListFromProductTypePage');

    // store order
    Route::get('/storeOrder', 'StoreOrderPageController@getOrderList');
    Route::post('/storeOrder', 'StoreOrderPageController@insertStoreOrder');
    Route::patch('/storeOrder', 'StoreOrderPageController@confirmStoreOrder');
    Route::get('/storeOrderStatus', 'StoreOrderPageController@getOrderStatusList');
    Route::patch('/cancelStoreOrder', 'StoreOrderPageController@cancelStoreOrder');

    // store customer page
    Route::get('/storeCustomer','StoreOrderPageController@getCustomerList');

    // store employee
    Route::get('/storeEmployee', 'EmployeeController@getEmployeeAccountList');
    Route::post('/storeEmployee','EmployeeController@insertEmployeeAccount');
    Route::patch('/storeEmployee','EmployeeController@updateEmployeeAccount');
    Route::delete('/storeEmployee','EmployeeController@deleteEmployeeAccount');
    Route::get('/getInfoEmployee', 'EmployeeController@getInfoEmployee');

});



