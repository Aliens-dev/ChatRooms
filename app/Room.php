<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{


    protected $fillable = ['name', 'type'];


    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id' , 'id');
    }

    public function members() {
        return $this->belongsToMany(User::class,'room_user');
    }

    public function messages()
    {
        return $this->hasMany(Message::class,'room_id');
    }
}
