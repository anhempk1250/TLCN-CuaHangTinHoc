<?php


namespace App\Http\Controllers;

use App\EmployeeAccount;
use App\Order_Status;
use App\Orders;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Config;
use JWTAuth;
class StoreOrderPageController
{
    function __construct()
    {
        Config::set('jwt.user', EmployeeAccount::class);
        Config::set('jwt.identifier', 'id');
        Config::set('auth.providers', ['users' => [
            'driver' => 'eloquent',
            'model' => EmployeeAccount::class,
        ]]);
    }

    public function getOrderList() {
        $order = new Orders();
        return $order->getOrderList();
    }

    public function getCustomerList() {
        $cus = new User();
        return $cus->getCustomerList();
    }

    public function insertStoreOrder(Request $request) {
        $order = new Orders();
        return $order->insertStoreOrder($request);
    }

    public function getOrderStatusList() {
        $status = new Order_Status();
        return $status->getOrderStatusList();
    }

    public function confirmStoreOrder(Request $request) {
        $order = new Orders();
        return $order->confirmStoreOrder($request);
    }

    public function cancelStoreOrder(Request $request) {
        $order = new Orders();
        return $order->cancelStoreOrder($request);
    }
}