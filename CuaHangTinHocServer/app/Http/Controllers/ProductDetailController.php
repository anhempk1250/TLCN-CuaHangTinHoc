<?php


namespace App\Http\Controllers;

use App\Product;
use App\Product_Order;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
class ProductDetailController extends BaseController
{
    public function getProduct(Request $request) {
        $product = new Product();
        return $product->getProduct($request);
    }

    public function getCommentList(Request $request) {
        $po = new Product_Order();
        return $po->getCommentList($request);
    }
}