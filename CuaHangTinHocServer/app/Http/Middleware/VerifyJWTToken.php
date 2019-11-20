<?php

namespace App\Http\Middleware;
use App\EmployeeAccount;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EmployeeController;
use App\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
class VerifyJWTToken
{
    function __construct(Request $request)
    {
        if($request->employee) {
            Config::set('jwt.user', EmployeeAccount::class);
            Config::set('jwt.identifier', 'id');
            Config::set('auth.providers', ['users' => [
                'driver' => 'eloquent',
                'model' => EmployeeAccount::class,
            ]]);
        }
    }
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::toUser($request->input('token'));
            $request->merge([
                'user' => $user
            ]);

        }catch (JWTException $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                return response()->json(['errorToken' => 'Đã hết phiên đăng nhập, vui lòng đăng nhập lại']); //Token hết hạn
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return response()->json(['errorToken' => '\'Đã có lỗi xảy ra 1, vui lòng đăng nhập lại\'']); // token k hợp lệ
            } else {
                return response()->json(['errorToken' => '\'Đã có lỗi xảy ra 2, vui lòng đăng nhập lại\'']); // khong co token
            }
        }
        return $next($request);
    }
}
