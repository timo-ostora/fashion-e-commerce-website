<?php

use App\Http\Controllers\GuestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', [GuestController::class, 'index'])->name('home');
Route::get('/categories', [GuestController::class, 'categories'])->name('categories');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
});

// Modular route loading for clarity and scalability
foreach (['admin', 'settings', 'auth'] as $file) {
    require __DIR__ . "/{$file}.php";
}