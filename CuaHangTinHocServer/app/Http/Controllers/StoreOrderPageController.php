<?php


namespace App\Http\Controllers;

use App\EmployeeAccount;
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
}