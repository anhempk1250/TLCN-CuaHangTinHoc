<?php


namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Image extends Model
{
    protected $table= "image";
}



$myProduct = DB::table('Product')
    ->leftjoin('Discount','Product.discount_id','=','Discount.ID')
    ->leftjoin('Product_Category','Product.product_category_id','=','Product_Category.ID')
    ->leftjoin('image','Product.ID','=','image.product_id')
    ->select('Product.ID','Product.Name','Product.Price','Product.Description',
        'Product_Category.ID as Category_ID','Product_Category.Name as CategoryName','Product_Category.Property',
        'Discount.ID as ID_Discount','Discount.Name as DiscountName','Discount.Percent_Discount',
        'image.ID as ImageID','image.image_link')
    ->where('image.ID','=',1)
    ->get();