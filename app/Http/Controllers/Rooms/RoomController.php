<?php

namespace App\Http\Controllers\Rooms;

use App\Http\Controllers\ApiController;
use App\Room;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class RoomController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $rooms = auth()->user()->rooms()->get();
        return $this->showAll($rooms);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(),[
            'name' => 'required|min:3|max:50',
            'type' => '',
        ]);
        if($validate->fails()) {
            //return response()->json(['success' => false], 403);
            return $this->ErrorResponse(403);
        }
        $room = auth()->user()->rooms()->create($validate->validated());
        //return response()->json(['success'=> true, 'room' => $room], 201);
        return $this->SuccessResponse(201);
    }

    /**
     * Display the specified resource.
     *
     * @param Room $room
     * @return JsonResponse
     */
    public function show(Room $room)
    {
        return $this->showOne($room);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param $room
     * @return JsonResponse
     */
    public function update(Request $request, Room $room)
    {
        $response = Gate::inspect('update', $room);
        if($response->denied()) {
            //return response()->json(['success' => false], 401);
            return $this->ErrorResponse();
        }
        $validate = Validator::make($request->all(),[
            'name' => 'required|min:3|max:50',
            'type' => 'sometimes',
        ]);

        if($validate->fails()) {
            return response()->json(['success' => false], 403);
        }

        $room->update($validate->validated());
        //return response()->json(['success'=> true], 201);
        return $this->SuccessResponse(201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Room  $room
     * @return JsonResponse
     */
    public function destroy(Room $room)
    {
        $response = Gate::inspect('delete', $room);
        if($response->denied()) {
            return $this->ErrorResponse();
        }
        Room::find($room->id)->delete();
        return $this->SuccessResponse();
    }
}
