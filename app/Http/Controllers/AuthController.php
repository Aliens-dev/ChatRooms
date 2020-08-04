<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends ApiController
{

    public function login() {

    }

    public function loginPost(Request $request)
    {
//        $rules = [
//            'email' => 'email|required',
//            'password' => 'password',
//        ];
//
//        $validate = Validator::make($request->all(), $rules);
//
//        if($validate->fails()) {
//            return $this->ErrorResponse(403,$validate->errors());
//        }
        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];
        if(!Auth::attempt($data)) {
            return $this->ErrorResponse(403,'Wrong Email Or Password');
        }

        $user = Auth::user();
        $token = $user->createToken('auth')->accessToken;

        return $this->SuccessResponse(200, ['user' => $user, 'token' => $token]);

    }

    public function register(Request $request)
    {
        // TODO : Create registration
    }
}
