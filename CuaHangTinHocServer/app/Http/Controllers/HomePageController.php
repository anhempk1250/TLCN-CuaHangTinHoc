<?php


namespace App\Http\Controllers;

use App\Producer;
use App\Product;
use App\Product_Category;
use App\Product_Type;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
class HomePageController extends BaseController
{
    public function getSummaryProductList() {
        $product = new Product();
        return $product->getSummaryProductList();
    }



    public function getProductCategoryList() {
        $category = new Product_Category();
        return $category->getProductCategoryList();
    }

    public function getProducerList() {
        $producer = new Producer();
        return $producer->getProducerList();
    }

    public function getProductTypeList() {
        return ['list' => Product_Type::getProductTypeList()];
    }
}