<?php


namespace App\Http\Controllers;

use App\CustomerAccount;
use App\Http\Controllers\Request\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Mail;
use Tymon\JWTAuth\Facades\JWTAuth;

class AccountController extends BaseController
{
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
        return $request;
    }

    public function register()
    {
        //$params = $request->only('email', 'name', 'password');
        $user = new CustomerAccount();
        $user->email = 'vinhdlv';
        $user->name = 'Đào Lê Văn Vinh';
        $user->phone = '123';
        $user->address = 'ahihi';
        $user->activeCode = 'sads';
        $user->password = bcrypt('123456');
        $user->save();
        return 'ss';
    }



}