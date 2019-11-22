<?php


namespace App\Http\Controllers;

use App\EmployeeAccount;
use Faker\Provider\Base;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;
use Illuminate\Routing\Controller as BaseController;
class EmployeeController extends  BaseController
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





    public function storeCheckToken(Request $request) {
        return 'ss';
    }

    public function storeLogin(Request $request) {
        $employee = EmployeeAccount::find($request->input('id'));
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
            return ['msg' => $errorData];
        }
        return ['msg' => 'Tài khoản hoặc mật khẩu không chính xác'];
    }
}