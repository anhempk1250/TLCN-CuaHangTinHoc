<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class List_Product_With_Type extends Model
{
    //
    protected $table = "list_product_with_type";
    protected $primaryKey = ["product_id","product_type_id"];
    public $incrementing = false;

    public function addStoreProductToType(Request $request){
        $productWithType = List_Product_With_Type::where('product_id', '=', $request->product_id )
            ->where('product_type_id','=',$request->product_type_id)->get();
        if(count($productWithType) > 0) {
            return [
                'msg' => 'Sản phẩm '.$request->product_id.' đã thuộc loại '.$request->product_type_name,
                'RequestSuccess' => false
            ];
        } else {
            $pwt = new List_Product_With_Type();
            $pwt->product_id = $request->product_id;
            $pwt->product_type_id = $request->product_type_id;
            $pwt->save();
            return [
                'msg' => 'Thêm thành công',
                'RequestSuccess' => true
            ];
        }
    }

    public function deleteStoreProductFromType(Request $request) {
        //$productWithType = List_Product_With_Type::where('product_id', '=', $request->product_id )
          //  ->where('product_type_id','=',$request->product_type_id)->first();
        $productWithType = DB::table('list_product_with_type')
            ->where('product_id', '=', $request->product_id)
            ->where('product_type_id','=',$request->product_type_id)
            ->first();
        if($productWithType) {
            DB::table('list_product_with_type')
                ->where('product_id', '=', $request->product_id)
                ->where('product_type_id','=',$request->product_type_id)->delete();
            return [
                'msg' => 'Xóa thành công',
                'RequestSuccess' => true
            ];
        } else {
            return [
                'msg' => 'Không tồn tài sản phẩm '.$request->product_id.' trong loại '.$request->product_type_name,
                'RequestSuccess' => false
            ];
        }
    }

}
