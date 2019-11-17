<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
class CustomerAccount extends Authenticatable
{
    use Notifiable;

    protected $table = "customeraccount";
    protected $primaryKey = "email";

    protected $fillable = [
        'name', 'email', 'password',
    ];
}
