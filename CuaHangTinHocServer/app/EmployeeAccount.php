<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmployeeAccount extends Model
{
    //
    protected $table = "employeeaccount";

    public function Product_Category() {
        $this->hasMany(Product_Category::class,'employee_id');
    }
}
