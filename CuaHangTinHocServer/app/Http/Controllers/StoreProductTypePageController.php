<?php


namespace App\Http\Controllers;
use App\EmployeeAccount;
use App\List_Product_With_Type;
use App\Product;
use App\Product_Type;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Config;
use JWTAuth;

class StoreProductTypePageController extends BaseController
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

    public function getStoreProductTypeList() {
        $types = new Product_Type();
        return $types->getStoreProductTypeList();
    }

    public function getStoreProductListFromProductTypePage() {
        $product = new Product();
        return $product->getStoreProductListFromProductTypePage();
    }

    public function insertProductType(Request $request) {
        $type = new Product_Type();
        return $type->insertProductType($request);
    }

    public function updateProductType(Request $request) {
        $type = new Product_Type();
        return $type->updateProductType($request);
    }

    public function deleteProductType(Request $request) {
        $type = new Product_Type();
        return $type->deleteProductType($request);
    }

    public function addStoreProductToType(Request $request) {
        $pwt = new List_Product_With_Type();
        return $pwt->addStoreProductToType($request);
    }

    public function deleteStoreProductFromType(Request $request) {
        $pwt = new List_Product_With_Type();
        return $pwt->deleteStoreProductFromType($request);
    }
}