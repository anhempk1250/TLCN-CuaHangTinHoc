<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Product_Order extends Model
{
    //
    protected $table ="product_order";
    protected $primaryKey = ['order_id', 'product_id'];
    public $incrementing = false;

    public function order() {
        return $this->belongsTo(Orders::class,'order_id');
    }

    public function getCommentList(Request $request) {
        return [
            'list' => Product_Order::with('order.customer')
                ->where('product_id','=',$request->id)->get()
        ];
    }
}
