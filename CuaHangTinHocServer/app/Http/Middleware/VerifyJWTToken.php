<?php

namespace App\Http\Middleware;
use App\EmployeeAccount;
use Closure;
use Config;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class VerifyJWTToken
{

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
