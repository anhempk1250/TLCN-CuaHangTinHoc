<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product_Type extends Model
{
    //
    protected $table = "product_type";

    public function productListWithType() {
        return $this
            ->belongsToMany(Product::class,"list_product_with_type","product_type_id");
    }

    public static function getProductTypeList() {
        return Product_Type::with("productListWithType","productListWithType.firstImage")
            ->where('HomePage','=',true)
            ->get();
    }
}
