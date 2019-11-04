<?php


namespace App\Http\Controllers;

use App\Product_Category;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class CategoryPageController extends BaseController
{

    public function getCategoryList() {
        $category = new Product_Category();
        return $category->getCategoryList();
    }

    public function createCategory(Request $request) {

    }
}