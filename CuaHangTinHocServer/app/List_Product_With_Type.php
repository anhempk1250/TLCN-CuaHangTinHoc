<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class List_Product_With_Type extends Model
{
    //
    protected $table = "list_product_with_type";
    protected $primaryKey = ["product_id","product_type_id"];
}
