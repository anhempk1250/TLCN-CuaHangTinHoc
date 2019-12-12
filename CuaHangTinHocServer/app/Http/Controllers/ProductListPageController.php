<?php


namespace App\Http\Controllers;

use App\Producer;
use App\Product;
use App\Product_Category;
use App\Product_Order;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
class ProductListPageController extends BaseController
{
    public function getProductListFromProductListPage() {
        $product = new Product();
        return $product->getProductListFromProductListPage();
    }

    public function getProducerFromProductListPage() {
        $producer = new Producer();
        return $producer->getProducerList();
    }

    public function getCategoryListFromProductListPage() {
        $category = new Product_Category();
        return $category->getCategoryListFromProductListPage();
    }
}