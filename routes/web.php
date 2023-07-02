<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ModulController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use PHPUnit\Metadata\PostCondition;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Index', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('error', function (Request $request) {
    return Inertia::render('ErrorPage', ['status' => $request->status]);
})->name('error');

Route::get('/dashboard', [UserController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/', [UserController::class, 'index'])->name('index');
Route::get('/category/{id}', [UserController::class, 'category'])->name('category');
Route::get('/show/{slug}', [UserController::class, 'show'])->name('show.post');
Route::get('/search/{keyword}', [UserController::class, 'search'])->name('search.post');

Route::get('/dashboard/mypost/publish/{idPost}', [PostController::class, 'publish'])->middleware('role:admin')->name('mypost.publish');
Route::get('/dashboard/mypost/unpublish/{idPost}', [PostController::class, 'unpublish'])->middleware('role:admin')->name('mypost.unpublish');
Route::get('/dashboard/mypost/adminPost', [PostController::class, 'adminPost'])->middleware('role:admin')->name('mypost.adminPost');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::resource('/dashboard/mypost', PostController::class)->middleware('auth');
Route::resource('/dashboard/modules', ModulController::class)->middleware('auth');
Route::resource('/dashboard/roles', RoleController::class)->middleware('auth');
// make perfix
Route::get('/dashboard/modules/roles/{id}/permissions', [RoleController::class, 'rolePermission'])->name('role.permissions.index')->middleware('auth');
Route::get('/dashboard/modules/roles/{id}/permissions/manage', [RoleController::class, 'manageRole'])->name('manage.role.permissions.index')->middleware('auth');
Route::post('/dashboard/modules/roles/{id}/permissions/manage/managePermission', [RoleController::class, 'manageRolePermission'])->name('manage.role.permissions.create')->middleware('auth');

Route::get('/dashboard/modules/{id}/permissions', [PermissionController::class, 'index'])->name('permissions.index')->middleware('auth');
Route::get('/dashboard/modules/{id}/permissions/create', [PermissionController::class, 'create'])->name('permissions.create')->middleware('auth');
Route::post('/dashboard/modules/{id}/permissions/create', [PermissionController::class, 'store'])->name('permissions.create')->middleware('auth');


Route::resource('/dashboard/category', CategoryController::class)->middleware('permission:read category|create category|update category|delete category');
Route::get('/dashboard/alluser', [UserController::class, 'allUser'])->name('alluser.index')->middleware('permission:read user');
Route::get('/dashboard/alluser/edit/{id}', [UserController::class, 'allUserEdit'])->name('alluser.edit')->middleware('permission:read user');
Route::post('/dashboard/alluser/update/{id}', [UserController::class, 'allUserUpdate'])->name('alluser.update')->middleware('permission:update user');
Route::delete('/dashboard/alluser/delete/{id}', [UserController::class, 'allUserDelete'])->name('alluser.delete')->middleware('permission:delete user');
Route::resource('/comment', CommentController::class)->middleware('permission:read comment|create comment|update comment|delete comment');
require __DIR__ . '/auth.php';
