<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::controller(UserController::class)->group(function () {
    Route::get('/users', 'index');
    Route::post('/user', 'store');
    Route::get('/user/{id}', 'show');
    Route::put('/user/{id}', 'update');
    Route::delete('/user/{id}', 'destroy');
});

Route::controller(TaskController::class)->group(function () {
    Route::get('/user/{userId}/tasks', 'index');
    Route::post('/user/{userId}/tasks', 'store');
    Route::get('/user/{userId}/tasks/{taskId}', 'show');
    Route::put('/user/{userId}/tasks/{taskId}', 'update');
    Route::delete('/user/{userId}/tasks/{taskId}', 'destroy');
});
