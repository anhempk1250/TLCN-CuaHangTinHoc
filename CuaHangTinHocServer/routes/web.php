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
Route::get('/productDetails','HomePageController@getProduct');
Route::get('/productCategory','HomePageController@getProductCategoryList');
Route::get('/producers', 'HomePageController@getProducerList');
Route::get('/productType','HomePageController@getProductTypeList');

// category page
Route::get('/categories', 'CategoryPageController@getCategoryList');

// store - product-page
Route::get('/storeProducts','StorePageController@getProduct');
Route::post('/storeProducts','StorePageController@createCategory');

// customer account
//temp register
Route::get('/temp', 'AccountController@register');
// register
Route::post('/customerRegister','AccountController@sendConfirmEmailCustomerAccount');
Route::get('/confirmEmail','AccountController@confirmEmail')->name('customerVerify');
// login
Route::get('/customerLogin', 'AccountController@login');

// request with check token
Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('user-info', 'UserController@getUserInfo');
});