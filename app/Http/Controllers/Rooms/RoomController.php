<?php

namespace App\Http\Controllers\Rooms;

use App\Http\Controllers\ApiController;
use App\Room;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
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
     * Display a list of public rooms.
     *
     * @return JsonResponse
     */

    public function publicRooms()
    {
        $rooms = Room::where('type', '1')->get();
        return $this->showAll($rooms);
    }

    /**
     * Display a list of joined in rooms.
     *
     * @return JsonResponse
     */
    public function joinedRooms()
    {
        $rooms = auth()->user()->joined()->get();
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
            'type' => 'required|sometimes',
            'image' => 'required|image'
        ]);
        if($validate->fails()) {
            //return response()->json(['success' => false], 403);
            return $this->ErrorResponse(403);
        }
        if($request->has('image')) {
            $image = $request->file('image')->store("rooms");
        }
        $room = auth()->user()->addRoom($request->name,$image,$request->type);
        $room->members()->attach(auth()->user());
        //return response()->json(['success'=> true, 'room' => $room], 201);
        return $this->SuccessResponse(201);
    }

    /**
     * Display the specified resource.
     *
     * @param Room $room
     * @return JsonResponse
     */
    public function show($id)
    {

        $room = Room::find($id);
        if(is_null($room)) {
            return $this->ErrorResponse();
        }
        $response = Gate::inspect('view',$room);

        if($response->denied()) {
            return $this->ErrorResponse();
        }

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
            'image' => 'required|sometimes'
        ]);

        if($validate->fails()) {
            return response()->json(['success' => false], 403);
        }

        if($request->hasFile('image')) {
            Storage::delete($room->image);
            $image = $request->file('image')->store("rooms");
            $room->image = $image;
        }
        $room->name = $request->name;
        $room->save();

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
