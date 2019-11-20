<?php


namespace App\Http\Controllers;

use App\CustomerAccount;
use App\EmployeeAccount;
use App\Http\Controllers\Request\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Mail;
use Tymon\JWTAuth\Facades\JWTAuth;

class AccountController extends BaseController
{
    function __construct()
    {
        Config::set('jwt.user', EmployeeAccount::class);
        Config::set('auth.providers', ['users' => [
            'driver' => 'eloquent',
            'model' => EmployeeAccount::class,
        ]]);
    }

    // for customer


    // for employee
    public function storeCheckToken(Request $request) {
        return [
            'msg' => 'token correct'
        ];
    }

    public function storeLogin(Request $request) {
        $employee = EmployeeAccount::find($request->id);

        if($employee && Hash::check($request->password, $employee->password)) {

            $credentials = $request->only('id', 'password');
            $token = JWTAuth::attempt($credentials);
            $data = [
                'token' => $token,
                'userName' => $employee->name
            ];
            return $data;
        } else {
            $errorData = [
                'title' => 'Đăng nhập thất bại',
                'msg' => 'Tài khoản hoặc mật khẩu không đúng'
            ];
            return $errorData;
        }
        return ['msg' => 'Tài khoản hoặc mật khẩu không chính xác'];
    }
}