<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/rooms', 'Rooms\RoomController@store')->name('rooms.store');
Route::patch('/rooms/{room}','Rooms\RoomController@update')->name('rooms.update');
