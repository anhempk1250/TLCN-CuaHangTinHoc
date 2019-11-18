<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Orders extends Model
{
    //
    protected $table = "orders";

    public function getListOrder(){
        $order = DB::table('orders')
            ->select('orders.id','orders.time','orders.order_status_id','orders.total_Price','orders.employee_id','orders.customer_id','orders.address')
            ->get();
        return $order;
    }

    public function updateOrderStatus(Request $request){
        $order = Orders::find($request->id);
        $order->order_status_id = $request->order_status_id;
        $order->save();
        return $order;
    }
}
