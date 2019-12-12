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

    public function insertEmployeeAccount(Request $request) {
        $emp = EmployeeAccount::find($request->id);
        if(!$emp) {
            $emp = new EmployeeAccount();
            $emp->id = $request->id; // this is phone
            $emp->name = $request->name;
            $emp->phone = $request->phone;
            $emp->address = $request->address;
            $emp->password = Hash::make($request->password);
            $emp->id_type_of_employee = 2;
            $emp->save();
            return [
                'msg' => 'Thêm khách hàng thành công',
                'RequestSuccess' => true
            ];
        }
        return [
            'msg' => 'Tài khoản đã tồn tại !!!',
            'RequestSucess' => false
        ];
    }

    public function updateEmployeeAccount(Request $request) {
        $emp = EmployeeAccount::find($request->id);
        if($emp) {
            $emp->name = $request->name;
            $emp->phone = $request->phone;
            $emp->address = $request->address;
            if($request->changePassword == true)
                $emp->password = Hash::make($request->password);
            $emp->save();
            return [
                'msg' => 'Cập nhật thành công',
                'object' => $emp,
                'RequestSuccess' => true
            ];
        }
        return [
            'msg' => 'Không tìm thấy tài khoản !!!',
            'RequestSucess' => false
        ];
    }


    public function getEmployeeAccountList(Request $request) {
        return [
            'list' => EmployeeAccount::all()
        ];
    }

    public function getInfoEmployee(Request $request) {
        $employee = EmployeeAccount::find($request->user->id);
        if($employee) {
            return [
                'object' => $employee
            ];
        }
    }
}