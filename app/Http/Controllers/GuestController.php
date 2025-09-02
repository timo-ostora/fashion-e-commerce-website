<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Category;

class GuestController extends Controller
{
    public function index() {
        return Inertia::render('guest/index');
    }

    public function categories() {
        $categories = Category::All();
        return Inertia::render('guest/categories', [
            'categories' => $categories,
        ]);
    }

    public function category($slug) {
        $category = Category::Where('slug', $slug)->first();
        return Inertia::render('guest/category', [
            'category' => $category,
        ]);
    }
}
