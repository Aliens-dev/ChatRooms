<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{

    protected $fillable = ['message'];

    public function sender()
    {
        return $this->belongsTo(User::class,'sender_id');
    }

    public function room()
    {
        return $this->belongsTo(Room::class,'room_id');
    }

}
