<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
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
        $rules = [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'image' => 'required|image',
            'password' => 'required'
        ];
        $validate = Validator::make($request->all(),$rules);

        if($validate->fails()) {
            return $this->showAll($validate->errors(),false,403);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();

        if($request->has('image')) {
            $image = $request->file('image')->store('avatar-'.$user->id);
            $user->image = $image;
            $user->save();
        }

        return $this->SuccessResponse();
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
