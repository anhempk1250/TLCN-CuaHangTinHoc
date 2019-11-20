<?php


namespace App\Http\Controllers;

use App\Product;
use App\Product_Type;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
class StoreProductPageController extends BaseController
{
    public function getProduct() {
        $product = new Product();
        return ['list' => $product->getStoreProductList()];
    }
    public function insertProduct(Request $request) {
        $product = new Product();
        return ['msg' => $product->insertProduct($request)];
    }

    public function updateProduct() {

    }
}