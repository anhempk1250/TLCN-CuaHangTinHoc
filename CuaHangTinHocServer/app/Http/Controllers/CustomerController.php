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




    public function setCustomerAccount(Request $request) {
        $customer = new CustomerAccount();
        $customer->email = $request->email;
        $customer->password = Hash::make($request->input('password'));
        $customer->name = $request->input('name');
        //$customer->sex = $request->input('1');
        $customer->phone = $request->input('phone');
        $customer->address = $request->input('address');
        return $customer;
    }

    public function sendConfirmEmailCustomerAccount(Request $request) {

        $email = $request->input('email');
        if($cus = CustomerAccount::find($email))
            return 'email already exist';

        $customer = $this->setCustomerAccount($request);
        $code = bcrypt(md5(time().$customer->email));
        $customer->activeCode = $code;

        $customer->save();

        //$url = "http://localhost:8081/confirmSuccessEmail?email="+$customer->email+"&code="+$code;

        $url = route('customerVerify',['email' => $email, 'code' => $code ]);

        $data = array('name'=>$customer->name , "url" => $url );
        Mail::send('mail', $data, function($message) use($email) {
            $message->to($email,'')->subject
            ('Xác thực tài khoản');
            $message->from('daolevanvinh@gmail.com','vinh');
        });
        return 'success';
    }

    public function confirmEmail(Request $request) {
        $customer = CustomerAccount::find($request->input('email'));
        if($customer != null && $customer->activeCode == $request->input('code')) {
            $customer->activeCode = '-1';
            $customer->save();
            return redirect('http://localhost:8081/login');
        }
        return 'confirm_fail';
    }

    public function login(Request $request){
        $customer = CustomerAccount::find($request->input('email'));
        if($customer && Hash::check($request->input('password'),$customer->password)) {
            $credentials = $request->only('email', 'password');
            $token = JWTAuth::attempt($credentials);
            $data = [
                'token' => $token,
                'userName' => $customer->name
            ];
            return $data;
        } else {
            $errorData = [
                'title' => 'Đăng nhập thất bại',
                'msg' => 'Tài khoản hoặc mật khẩu không đúng'
            ];
            return $errorData;
        }
    }

    public function checkLoginCustomer(Request $request) {
        return ['user' => $request->user];
    }

    public function register()
    {
        //$params = $request->only('email', 'name', 'password');
        $user = new EmployeeAccount();
        $user->id = 'vinh';
        $user->name = 'Đào Lê Văn Vinh';
        $user->phone = '123';
        $user->address = 'ahihi';
        $user->id_type_of_employee = 1;
        $user->password = bcrypt('123456');
        $user->save();
        return 'ss';
    }
}