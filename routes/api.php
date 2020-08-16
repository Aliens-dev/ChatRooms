<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




Route::post('/login', 'AuthController@loginPost')->name('login');

Route::group(['middleware'=>'jwtauth'], function() {

    Route::post('/checkToken', 'AuthController@checkToken')->name('checkToken');
    Route::post('/logout', 'AuthController@logout')->name('logout');
    // Rooms
    Route::get('rooms', 'Rooms\RoomController@index')->name('rooms.index');
    Route::post('rooms', 'Rooms\RoomController@store')->name('rooms.store');
    Route::get('rooms/{room}','Rooms\RoomController@show')->name('rooms.show');
    Route::patch('rooms/{room}','Rooms\RoomController@update')->name('rooms.update');
    Route::delete('rooms/{room}','Rooms\RoomController@destroy')->name('rooms.destroy');
    // Participants
    Route::get('rooms/{room}/users','Rooms\RoomsUsersController@index')->name('room.user.index');
    Route::post('rooms/{room}/users/{user}','Rooms\RoomsUsersController@store')->name('room.user.store');

    Route::get('users', 'Users\UsersController@index')->name('users');

});
