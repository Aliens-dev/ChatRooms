<?php

namespace App\Http\Controllers\Rooms;

use App\Events\UserSendMessageEvent;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Message;
use App\Room;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class RoomsMessagesController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @param Room $room
     * @return JsonResponse
     */
    public function index(Room $room)
    {
        $inspect = Gate::inspect('view', $room);
        if($inspect->denied()) {
            return $this->ErrorResponse();
        }
        $messages = $room->messages()->orderBy('id')->get();
        return $this->showAll($messages);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @param Room $room
     * @return JsonResponse
     */
    public function store(Request $request, Room $room)
    {

        $inspect = Gate::inspect('view',$room);
        if($inspect->denied()) {
            return $this->ErrorResponse();
        }

        $rules = [
            'message' => 'required',
        ];

        $validate = Validator::make($request->all(),$rules);
        if($validate->fails()) {
            return $this->ErrorResponse();
        }

        $message = new Message();
        $message->sender_id = auth()->id();
        $message->room_id = $room->id;
        $message->message = $request->message;
        $message->save();

        broadcast(new UserSendMessageEvent($message));

        return $this->showOne($message);
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
