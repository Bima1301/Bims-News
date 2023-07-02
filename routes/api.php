<?php

use App\Http\Controllers\Auth\API\AuthController;
use App\Http\Controllers\Auth\API\CategoryController;
use App\Http\Controllers\Auth\API\PermissionController;
use App\Http\Controllers\Auth\API\PostController;
use App\Http\Controllers\Auth\API\RoleController;
use App\Http\Controllers\Auth\API\RolePermissionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/posts/home', [PostController::class, 'homePost']);
Route::apiResource('posts', PostController::class)->middleware('auth:sanctum');
Route::apiResource('categories', CategoryController::class)->middleware('auth:sanctum');
Route::apiResource('roles', RoleController::class)->middleware('auth:sanctum');
Route::apiResource('permissions', PermissionController::class)->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/roles/{id}/permissions', [RolePermissionController::class, 'index']);
    Route::put('/roles/{id}/permissions', [RolePermissionController::class, 'update']);
});
