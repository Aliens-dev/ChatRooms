<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




Route::post('/login', 'AuthController@loginPost')->name('login');
Route::post('/register', 'AuthController@register')->name('register');

Route::group(['middleware'=>'jwtauth'], function() {

    Route::post('/checkToken', 'AuthController@checkToken')->name('checkToken');
    Route::post('/logout', 'AuthController@logout')->name('logout');
    // Rooms
    Route::get('rooms', 'Rooms\RoomController@index')->name('rooms.index');
    Route::post('rooms', 'Rooms\RoomController@store')->name('rooms.store');
    Route::get('rooms/public', 'Rooms\RoomController@publicRooms')->name('rooms.public');
    Route::get('rooms/joined', 'Rooms\RoomController@joinedRooms')->name('rooms.joined');
    Route::get('rooms/{room}','Rooms\RoomController@show')->name('rooms.show');
    Route::patch('rooms/{room}','Rooms\RoomController@update')->name('rooms.update');
    Route::delete('rooms/{room}','Rooms\RoomController@destroy')->name('rooms.destroy');

    // Participants
    Route::get('rooms/{room}/users','Rooms\RoomsUsersController@index')->name('room.user.index');
    Route::post('rooms/{room}/users/{user}','Rooms\RoomsUsersController@store')->name('room.user.store');
    Route::delete('rooms/{room}/users/{user}','Rooms\RoomsUsersController@destroy')->name('room.user.destroy');

    // Messages
    Route::get('rooms/{room}/messages', 'Rooms\RoomsMessagesController@index')->name('room.messages.index');
    Route::post('rooms/{room}/messages', 'Rooms\RoomsMessagesController@store')->name('room.messages.store');
    // users
    Route::get('users', 'Users\UsersController@index')->name('users.index');
    Route::get('users/{id}', 'Users\UsersController@show')->name('users.show');
    Route::patch('users/{id}', 'Users\UsersController@update')->name('users.update');

});
