<?php

use App\Http\Controllers\TodoController;
use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('todos', TodoController::class);
Route::resource('item', ItemController::class);
