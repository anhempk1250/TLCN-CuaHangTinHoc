<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerAccount extends Model
{
    //
    protected $table = "customeraccount";
    protected $primaryKey = "email";
}
