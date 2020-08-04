<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{


    protected $fillable = ['name', 'type'];


    public function owner()
    {
        return $this->belongsTo(User::class);
    }
}
