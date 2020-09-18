<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UsersController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        if($request->email) {
            $users = User::where('email', 'like', "%". $request->email ."%")->get();
        }else {
            $users = User::all();
        }
        return $this->showAll($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return JsonResponse
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return $this->showOne($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $rules = [
            "name" => "required",
            "email" => "required|email|unique:users,email,". $id,
            "image" => "required|sometimes|image",
            "password" => "required"
        ];
        $validate = Validator::make($request->all(), $rules);
        if ($validate->fails()) {
            return $this->ErrorResponse();
        }
        $user = User::find($id);

        if($request->has("image")) {
            $image = $request->file('image')->store("avatar-".$id);
            $user->image = $image;
        }
        if($request->has('password')) {
            $request['password'] = Hash::make($request->password);
        }
        $user->name = $request->name;
        $user->password = $request->password;
        $user->email = $request->email;
        $user->save();

        return $this->SuccessResponse();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
