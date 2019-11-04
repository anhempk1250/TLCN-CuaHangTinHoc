<?php


namespace App\Http\Controllers;
use App\Product;
use App\Product_Category;
use Faker\Provider\Base;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class StorePageController extends BaseController
{
    public function getProduct() {
        $product = new Product();
        return $product->getStoreProductList();
    }

    public  function createCategory(Request $request) {
        $productCategory = new Product_Category();
        return $productCategory->createCategory($request);
    }
}