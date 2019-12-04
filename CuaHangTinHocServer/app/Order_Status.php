<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order_Status extends Model
{
    //
    protected $table = "order_status";

    public function getOrderStatusList() {
        return [
            'list' => Order_Status::all()
        ];
    }
}
