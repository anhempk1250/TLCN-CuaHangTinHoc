<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Product_Type extends Model
{
    //
    protected $table = "product_type";

    public function productListWithType() {
        return $this
            ->belongsToMany(Product::class,"list_product_with_type","product_type_id");
    }

    public function category() {
        return $this->belongsTo(Product_Category::class,'product_category_id');
    }

    public static function getProductTypeList() {
        return Product_Type::with("productListWithType","productListWithType.firstImage")
            ->where('HomePage','=',true)
            ->get();
    }

    public function getStoreProductTypeList() {
        $types = Product_Type::with('category','productListWithType')
                ->where('status','=',1)->get();
        return [
            'list' => $types
        ];
    }

    public function insertProductType(Request $request) {
        if(!Product_Type::find($request->name)) {
            $type = new Product_Type();
            $type->name = $request->name;
            $type->HomePage = $request->HomePage;
            $type->status = 1;
            $type->product_category_id = $request->product_category_id;
            $type->save();
            return [
                'msg' => 'Thêm thành công',
                'RequestSuccess' => true
            ];
        } else {
            return [
                'msg' => 'Tên loại đã tồn tại',
                'RequestSuccess' => false
            ];
        }
    }

    public function updateProductType(Request $request) {
        $type =Product_Type::find($request->id);
        if($type) {
            $type->name = $request->name;
            $type->HomePage = $request->HomePage;
            $type->status = 1;
            $type->product_category_id = $request->product_category_id;
            $type->save();
            return [
                'msg' => 'Cập nhật thành công',
                'RequestSuccess' => true
            ];
        } else {
            return [
                'msg' => 'Loại không tồn tại',
                'RequestSuccess' => false
            ];
        }
    }

    public function deleteProductType(Request $request) {
        $type =Product_Type::find($request->id);
        if($type) {
            $type->status = 0;
            $type->save();
            return [
                'msg' => 'Xóa thành công',
                'RequestSuccess' => true
            ];
        } else {
            return [
                'msg' => 'Loại không tồn tại',
                'RequestSuccess' => false
            ];
        }
    }


}
