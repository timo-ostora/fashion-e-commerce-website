<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Admin routes
Route::middleware(['auth', 'verified', 'permission:admin.access'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', fn () => Inertia::render('admin/index'))->name('index');
    
    Route::resource('users', UserController::class)
        ->middleware('permission:users.view');
    Route::resource('categories', CategoryController::class)
        ->middleware('permission:categories.view');
    Route::resource('products', ProductController::class)
        ->middleware('permission:products.view');
    Route::resource('roles', RoleController::class)
        ->middleware('permission:roles.view');
});