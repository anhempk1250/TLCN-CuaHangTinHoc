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
        return Product_Category::with('products','productTypes')->where('status','=',1)->get();
    }


    public function getCategoryList() {
         $category = DB::table('product_category')
            ->leftJoin('employeeaccount','product_category.employee_id','=','employeeaccount.id')
            ->leftJoin('product','product_category.id','=','product.product_category_id')
            ->select('product_category.id','product_category.name','product_category.property','product_category.status','product_category.summaryName',
                DB::raw('COUNT(product.id) as numberOfProduct'),'employeeaccount.name as employeeName')
            //->where('product_category.status',1)
            ->groupBy('product_category.id','product_category.name','product_category.property','product_category.status','employeeaccount.name','product_category.summaryName')
            ->get();
        return $category;
    }

    public function getCategoryListFromProductPage() {
        return Product_Category::with('productTypes')->where('status','=',1)->get();
    }

    public function getCategoryListFromProductListPage() {
        return Product_Category::with('productTypes')
            ->where('status','=',1)->get();
    }

    public function createCategory(Request $request){
        $productCategory = new Product_Category();
        $productCategory->name =  $request->input("name");
        $productCategory->employee_id =  $request->input("user")->id;
        $productCategory->summaryName =  $request->input("summaryName");
        $productCategory->property =  $request->input("property");
        $productCategory->status = true;
        $productCategory->save();
        return [
            'msg' => [
                'msg' => 'Thêm danh mục thành công',
                'RequestSuccess' => true
            ]
        ];
    }

    public function updateCategory(Request $request){
        $productCategory = Product_Category::find($request->id);
        if($productCategory) {
            $productCategory->name =  $request->input("name");
            $productCategory->employee_id =  $request->input("user")->id;
            $productCategory->summaryName =  $request->input("summaryName");
            $productCategory->property =  $request->input("property");
            $productCategory->save();
            return [
                'msg' => [
                            'msg' => 'Cập nhật danh mục thành công',
                            'RequestSuccess' => true
                ]
            ];
        }
        return [
            'msg' => [
                'msg' => 'Lỗi, không tìm thấy danh mục'
            ]
        ];
    }

    public function deleteCategory(Request $request){
        $productCategory = Product_Category::find($request->id);
        if($productCategory) {
            $productCategory->status = 0;
            $productCategory->save();
            Product::where('product_category_id',$request->id)
                ->update(['product_category_id' => 1]);
            return [
                'msg' => [
                    'msg' => 'Xóa danh mục thành công',
                    'RequestSuccess' => true
                ]
            ];
        }
        return [
            'msg' => [
                'msg' => 'Lỗi, không tìm thấy danh mục'
            ]
        ];
    }
}
