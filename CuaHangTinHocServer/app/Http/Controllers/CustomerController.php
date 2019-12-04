<?php


namespace App\Http\Controllers;

use App\CustomerAccount;
use App\EmployeeAccount;
use App\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;
use Illuminate\Routing\Controller as BaseController;
class CustomerController  extends BaseController
{
    function __construct()
    {
        Config::set('jwt.user', User::class);
        Config::set('jwt.identifier', 'email');
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
                'userName' => $customer->name,
                'RequestSuccess' => false
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
}