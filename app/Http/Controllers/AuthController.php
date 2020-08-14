<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends ApiController
{

    public function loginPost(Request $request)
    {
        $rules = [
            'email' => 'email|required',
            'password' => 'required',
        ];

        $validate = Validator::make($request->all(), $rules);

        if($validate->fails()) {
            return $this->showAll($validate->errors(),false,403);
        }
        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];
        if(!$token = JWTAuth::attempt($data)) {
            return $this->ErrorResponse(403);
        }

        $user = JWTAuth::user();
        return $this->showAll(['user' => $user, 'token' => $token],true,200);

    }

    public function register(Request $request)
    {
        // TODO : Create registration
    }


    public function checkToken(Request $request)
    {
        return $this->SuccessResponse();
    }

    public function logout()
    {
        JWTAuth::logout();
        return $this->SuccessResponse();
    }
}
