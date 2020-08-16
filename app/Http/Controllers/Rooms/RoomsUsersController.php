<?php

namespace App\Http\Controllers\Rooms;

use App\Http\Controllers\ApiController;
use App\Room;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoomsUsersController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @param Room $room
     * @return JsonResponse
     */
    public function index(Room $room)
    {
        $users = $room->members()->get();
        return $this->showAll($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @param Room $room
     * @param User $user
     * @return JsonResponse
     */
    public function store(Request $request,Room $room,User $user)
    {
        if($room->members->contains($user) || $room->user_id == $user->id) {
            return $this->ErrorResponse(401);
        }

        $user->joined()->attach($room);
        return $this->SuccessResponse();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
