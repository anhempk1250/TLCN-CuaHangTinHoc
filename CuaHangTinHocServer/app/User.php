<?php

namespace App;

use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    protected $table = "customerAccount";
    public $incrementing = false;
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }


    public function getCustomerList() {
        $user = User::with('orders')->get();
        return [
            'list' => $user
        ];
    }

    public function orders() {
        return $this->hasMany(Orders::class,'customer_id');
    }

    public function register(Request $request) {
        $user = User::find($request->id);
        if(!$user) {
            $user = new User();
            $user->id = $request->id; // this is phone
            $user->name = $request->name;
            $user->address = $request->address;
            $user->password = Hash::make($request->password);
            $user->save();
            return [
              'msg' => 'Thêm khách hàng thành công',
                'RequestSuccess' => true
            ];
        }
        return [
            'msg' => 'Số điện thoại đã tồn tại !!!',
            'RequestSucess' => false
        ];
    }

    public function getStoreCustomerList() {
        $users = DB::table('customeraccount')
            ->select('customeraccount.id','customeraccount.name','customeraccount.address'
                ,'orders.total_price','orders.created_at as last')
            ->leftJoin('orders','customeraccount.id','=','orders.customer_id')
                ->leftJoin('orders as orders2','orders.id','=','orders2.id')
                    ->whereRaw(DB::raw('orders.created_at <= orders2.created_at'))->get();
        return $users;
    }


}
