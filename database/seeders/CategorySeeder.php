<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'T-Shirts', 'slug' => 't-shirts'],
            ['name' => 'Shirts', 'slug' => 'shirts'],
            ['name' => 'Jeans', 'slug' => 'jeans'],
            ['name' => 'Pants', 'slug' => 'pants'],
            ['name' => 'Suits', 'slug' => 'suits'],
            ['name' => 'Jackets', 'slug' => 'jackets'],
            ['name' => 'Shoes', 'slug' => 'shoes'],
            ['name' => 'Accessories', 'slug' => 'accessories'],
            ['name' => 'Sportswear', 'slug' => 'sportswear'],
            ['name' => 'Underwear', 'slug' => 'underwear']
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
