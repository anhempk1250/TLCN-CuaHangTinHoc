<?php

namespace App;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;
class Product_Category extends Model
{
    //
    protected $table = "product_category";

    public function myEmployee() {
        return $this->belongsTo(EmployeeAccount::class,'employee_id','id');
    }

    public function products() {
        return $this->hasMany(Product::class,'product_category_id');
    }

    public function productTypes() {
        return $this->hasMany(Product_Type::class,'product_category_id');
    }

    public function getProductCategoryList() {
        return Product_Category::with('products','productTypes')->get();
    }


    public function getCategoryList() {
        $category = DB::table('product_category')
            ->leftJoin('employeeaccount','product_category.employee_id','=','employeeaccount.id')
            ->leftJoin('product','product_category.id','=','product.product_category_id')
            ->select('product_category.id','product_category.name','product_category.property','product_category.summaryName',
                DB::raw('COUNT(product.id) as numberOfProduct'),'employeeaccount.name as employeeName')
            ->where('product_category.status',1)
            ->groupBy('product_category.id','product_category.name','product_category.property','employeeaccount.name','product_category.summaryName')
            ->get();
        return $category;
    }

    public function createCategory(Request $request){
        $productCategory = new Product_Category();
        $productCategory->name =  $request->input("name");
        $productCategory->employee_id =  $request->input("employee_id");
        $productCategory->summaryName =  $request->input("summaryName");
        $productCategory->property =  $request->input("property");
        $productCategory->save();
        return $productCategory;
    }

    public function updateCategory(Request $request){
        $productCategory = Product_Category::find($request->id);
        $productCategory->name =  $request->input("name");
        $productCategory->employee_id =  $request->input("employee_id");
        $productCategory->summaryName =  $request->input("summaryName");
        $productCategory->property =  $request->input("property");
        $productCategory->save();
        return $productCategory;
    }

    public function deleteCategory(Request $request){
        $productCategory = Product_Category::find($request->id);
        $productCategory->status = 0;
        $productCategory->save();
        $product = Product::where('product_category_id',$request->id)
            ->update(['status' => 0]);
        return $productCategory;
    }
}
