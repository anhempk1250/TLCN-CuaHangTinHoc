<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Psy\Util\Json;

class Orders extends Model
{
    //
    protected $table = "orders";
    public $timestamps = true;

    public function employee() {
        return $this->belongsTo(EmployeeAccount::class,'employee_id');
    }

    public function customer() {
        return $this->belongsTo(User::class,'customer_id');
    }

    public function productList() { //product_list
        return $this->belongsToMany(Product::class
            ,'product_order','order_id','product_id')
            ->withPivot('ProductCount');
    }

    public function status() {
        return $this->belongsTo(Order_Status::class,'order_status_id');
    }

    public function getOrderList(){
        $order = Orders::with('employee','customer','productList','status')->get();
        return [
            'list' => $order
        ];
    }



    public function updateOrderStatus(Request $request){
        $order = Orders::find($request->id);
        $order->order_status_id = $request->order_status_id;
        $order->save();
        return $order;
    }

    public function insertStoreOrder(Request $request) {
        $order = new Orders();
        $order->employee_id =$request->user->id;
        $order->order_status_id = 1;
        $order->total_price = $request->total_price;
        $order->customer_id = $request->customer_id;
        $order->note = $request->note;
        $order->save();

        $productList = json_decode($request->productList);
        for($i=0;$i<count($productList);$i++) {
            $productOrder = new Product_Order();
            $productOrder->order_id = $order->id;
            $productOrder->product_id = $productList[$i]->id;
            $productOrder->productCount = $productList[$i]->productCount;
            $productOrder->save();
        }

        return [
            'msg' => 'Thêm thành công',
            'RequestSuccess' => true
        ];

    }

    public function confirmStoreOrder(Request $request) {
        $order = Orders::find($request->id);
        if($order) {
            $productList = json_decode($request->productList);
            $count = 0;
            $msg = '';
            $RequestSuccess = false;
            for($i =0;$i<count($productList);$i++) {
                $product = Product::find($productList[$i]->id);
                if($product) {
                    if( ($productList[$i]->pivot->ProductCount) > ($product->productCount)) {
                        $msg = 'Sản phẩm '.$product->name.' không đủ số lượng, ';
                        break;
                    }
                }
                $count++;
            }
            if($count == count($productList)) {
                $order->order_status_id = 1;
                $order->employee_id = $request->user->id;
                $order->save();
                $msg = 'Xác nhận thành công';
                $RequestSuccess = true;
            }
            return [
                'msg' => $msg,
                'RequestSuccess' => $RequestSuccess,
                'list' => $this->getOrderList()
            ];
        }
    }

    public function cancelStoreOrder(Request $request) {
        $order = Orders::find($request->id);
        if($order) {
            $order->order_status_id = 3;
            $order->note = $request->note;
            $order->employee_id = $request->user->id;
            $order->save();
            return [
                'msg' => 'Hủy thành công',
                'RequestSuccess' => true,
                'list' => $this->getOrderList()
            ];
        }
    }
}
