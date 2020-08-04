<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;





Route::get('/login', 'AuthController@login')->name('login');
Route::post('/login', 'AuthController@loginPost')->name('login');

Route::group(['middleware'=>'auth:api'], function() {
    Route::get('rooms', 'Rooms\RoomController@index')->name('rooms.index');
    Route::post('rooms', 'Rooms\RoomController@store')->name('rooms.store');
    Route::patch('rooms/{room}','Rooms\RoomController@update')->name('rooms.update');
    Route::delete('rooms/{room}','Rooms\RoomController@destroy')->name('rooms.destroy');
});
