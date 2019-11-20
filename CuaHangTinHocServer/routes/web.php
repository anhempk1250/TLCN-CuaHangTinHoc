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

Route::post('/testLaravel',function (\Illuminate\Http\Request $request){
    $fname = $request->input('firstName');
    $lname = $request->input('lastName');
    return "firstName : $fname / lastName : $lname" ;
});

// home page
Route::get('/products','HomePageController@getSummaryProductList');

Route::get('/productCategory','HomePageController@getProductCategoryList');
Route::get('/producers', 'HomePageController@getProducerList');
Route::get('/productType','HomePageController@getProductTypeList');





// product detail page
Route::get('/productDetails','ProductDetailController@getProduct');



// order - page
Route::get('/storeOrders','StoreOrderPageController@getListOrder');
Route::put('/storeOrders','StoreOrderPageController@updateOrderStatus');

// customer account
//temp register
Route::get('/temp', 'CustomerAccountController@register');
// register
Route::post('/customerRegister','CustomerAccountController@sendConfirmEmailCustomerAccount');
Route::get('/confirmEmail','CustomerAccountController@confirmEmail')->name('customerVerify');

// login
Route::get('/customerLogin', 'CustomerController@login');

// request with check token of customer
Route::group(['middleware' => 'jwt.auth'], function () {
    // check login customer
    Route::get('/checkLoginCustomer', 'CustomerController@checkLoginCustomer');
});









//Route::get('/checkToken','EmployeeController@storeCheckToken', 'EmployeeController@text');


Route::get('/storeAuthen', 'EmployeeController@storeLogin');



// request with check token of employee
Route::group(['middleware' => 'jwt.auth'], function () {
    // check  token (customer && employee)
    Route::get('/checkToken','EmployeeController@storeCheckToken');

    // store category page
    Route::get('/storeCategory', 'StoreCategoryPageController@getCategoryList');
    Route::post('/storeCategory', 'StoreCategoryPageController@createCategory');
    Route::patch('/storeCategory', 'StoreCategoryPageController@updateCategory');
    Route::delete('/storeCategory', 'StoreCategoryPageController@deleteCategory');

    // store product page
    Route::get('/storeProduct','StoreProductPageController@getProduct');
    Route::post('/storeProduct','StoreProductPageController@insertProduct');
    Route::put('/storeProduct','StoreProductPageController@updateProduct');
    Route::get('/storeCategoryFromProductPage', 'StoreCategoryPageController@getCategoryListFromProductPage');

    // store product-page -> get producer list
    Route::get('/storeProducer','StoreProducerPageController@getProducer');

});