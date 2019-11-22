<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class EmployeeAccount extends Authenticatable
{
    //
    protected $table = "employeeaccount";
    public $incrementing = false;
    protected $primaryKey = "id";
    public function Product_Category() {
        $this->hasMany(Product_Category::class,'employee_id');
    }

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }
}
