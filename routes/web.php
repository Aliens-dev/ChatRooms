<?php

use Illuminate\Support\Facades\Route;



Route::view('/{app?}','app')->where('app','.*');

