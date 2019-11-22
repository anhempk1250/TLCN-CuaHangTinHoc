<?php


namespace App\Http\Controllers;


use App\EmployeeAccount;
use App\Product_Category;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Config;
use JWTAuth;
class StoreCategoryPageController extends BaseController
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
    public function getCategoryList(Request $request) {
        $category = new Product_Category();
        return ['list' => $category->getCategoryList()];
    }

    public function getCategoryListFromProductPage() {
        $category = new Product_Category();
        return ['list' => $category->getCategoryListFromProductPage()];
    }

    public function createCategory(Request $request) {
        $category = new Product_Category();
        return $category->createCategory($request);
    }

    public function updateCategory(Request $request) {
        $category = new Product_Category();
        return $category->updateCategory($request);
    }

    public function deleteCategory(Request $request) {
        $category = new Product_Category();
        return $category->deleteCategory($request);
    }
}