<?php


namespace App\Http\Controllers;

use App\Orders;
use App\Product;
use App\Product_Order;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use JWTAuth;
use Illuminate\Routing\Controller as BaseController;
class CustomerController  extends BaseController
{
    function __construct()
    {
        Config::set('jwt.user', User::class);
        Config::set('jwt.identifier', 'id');
        Config::set('auth.providers', ['users' => [
            'driver' => 'eloquent',
            'model' => User::class,
        ]]);
    }

    public function register(Request $request) {
        $user = new User();
        return $user->register($request);
    }

    public function login(Request $request) {
        $customer = User::find($request->input('id'));

            if($customer && Hash::check($request->password, $customer->password)) {
                $credentials = $request->only('id', 'password');
                $token = JWTAuth::attempt($credentials);

                $data = [
                    'token' => $token,
                    'user' => $customer,
                    'RequestSuccess' => true
                ];
                return $data;
            } else {
                return ['msg' => 'Tài khoản hoặc mật khẩu không đúng',
                    'RequestSuccess' => false];
            }
            return ['msg' => 'Tài khoản hoặc mật khẩu không đúng',
                'RequestSuccess' => false];

    }


    public function getStoreCustomerList() {
        $user = new User();
        return $user->getStoreCustomerList();
    }

    public function loginSocial(Request $request)
    {
        $cus = User::find($request->id);
        if(!$cus) {
            $cus = new User();
            $cus->id = $request->id;
            $cus->name = $request->name;
            $cus->email = $request->email;
            $cus->save();
        }
        $token = JWTAuth::fromUser($cus);
        return ['user' => $cus, 'token' => $token];
    }


    public function checkLoginCustomer(Request $request) {
        return ['user' => User::find($request->user->id)];
    }
    public function updateCustomer(Request $request)  {
        $user = User::find($request->id);
        if($user) {
            $user->name = $request->name;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->address = $request->address;
            $user->save();
            return [
                'msg' => 'Cập nhật thành công',
                'RequestSuccess' => true,
                'user' => $user
            ];
        } else {
            return ['msg' => 'Tài khoản không tồn tại', 'RequestSuccess' => false];
        }
    }

    public function makeOrder(Request $request) {
        $order = new Orders();
        $order->order_status_id = 2;
        $order->total_price = $request->total_price;
        $order->customer_id = $request->user->id;
        $order->note = $request->note;
        $order->address = $request->address;
        $order->save();
        $total_price = 0;
        $productList = json_decode($request->productList);
        for($i=0;$i<count($productList);$i++) {
            $productOrder = new Product_Order();
            $productOrder->order_id = $order->id;
            $productOrder->product_id = $productList[$i]->id;
            $productOrder->productCount = $productList[$i]->count;
            $total_price += $productList[$i]->count * $productList[$i]->price;
            $productOrder->save();
        }
        $order->total_price = $total_price;
        $order->save();
        return [
            'msg' => 'Thêm thành công',
            'RequestSuccess' => true
        ];
    }

    public function getOrderList(Request $request) {
        return [
          'list' => Orders::with('status','productList')->where('customer_id','=',$request->user->id)->get()
        ];
    }

    public function getOrderSuccessList(Request $request) {

        $list = DB::table('orders')
            ->join('product_order','orders.id','=','product_order.order_id')
            ->join('product','product.id','=','product_order.product_id')
            ->where('product.status','=',1)
            ->where('orders.order_status_id', '=', 1)
            ->where('orders.customer_id','=',$request->user->id)->get();
        return [
            'list' => $list
        ];
    }

    public function cancelOrder(Request $request) {
        $order = Orders::with('productList')->find($request->id);
        if($order) {
            //$productOrder = Product_Order::all()->where('order_id','=',$order->id);
            //$order->tags()->detach();
            $order->productList()->detach();
            $order->delete();
            return ['msg' => 'Hủy đơn hàng thành công',
                'RequestSuccess' => true,
                'list' => Orders::with('status','productList')
                    ->where('customer_id','=',$request->user->id)->get()];
        }
    }


    public function insertComment(Request $request) {
        $pdo = Product_Order::all()->where('order_id','=',$request->order_id)
            ->where('product_id','=',$request->product_id)
            ->first();
        if($pdo) {
            //$pdo->comment = $request->comment;
            //$pdo->stars = $request->stars;
            DB::table('product_order')->where('order_id','=',$request->order_id)
                ->where('product_id','=',$request->product_id)
                ->update(['comment' => $request->comment,'stars' => $request->stars]);
            return [
                'msg' => 'Gửi nhận xét thành công',
                'RequestSuccess' => true
            ];
        } else {
            return [
                'msg' => 'Không tìm thấy sản phẩm trong đơn hàng',
                'RequestSuccess' => false
            ];
        }
    }
}