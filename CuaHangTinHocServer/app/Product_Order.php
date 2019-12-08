<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product_Order extends Model
{
    //
    protected $table ="product_order";
    protected $primaryKey = ['order_id', 'product_id'];
    public $incrementing = false;
}
