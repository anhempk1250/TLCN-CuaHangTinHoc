<?php


namespace App\Http\Controllers;

use App\EmployeeAccount;
use App\Product;
use App\Product_Type;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Config;
use JWTAuth;

class StoreProductPageController extends BaseController
{
    function __construct()
    {
        Config::set('jwt.user', EmployeeAccount::class);
        Config::set('jwt.identifier', 'id');
        Config::set('auth.providers', ['users' => [
            'driver' => 'eloquent',
            'model' => EmployeeAccount::class,
        ]]);
    }
    public function getProduct() {

        $product = new Product();
        return $product->getStoreProductList();
    }
    public function insertProduct(Request $request) {
        $product = new Product();
        return $product->insertProduct($request);
    }

    public function updateProduct() {

    }
}