<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure there are categories to attach products to
        $categories = Category::query()->pluck('id');
        if ($categories->isEmpty()) {
            return;
        }

        // Create products with images
        Product::factory()
            ->count(30)
            ->state(fn () => [
                'category_id' => $categories->random(),
            ])
            ->create()
            ->each(function (Product $product) {
                // 1 main image + 2 gallery images
                ProductImage::factory()->create([
                    'product_id' => $product->id,
                    'image' => fake()->imageUrl(800, 800, 'fashion', true),
                    'is_main' => true,
                ]);

                ProductImage::factory()->count(2)->create([
                    'product_id' => $product->id,
                    'image' => fake()->imageUrl(800, 800, 'fashion', true),
                    'is_main' => false,
                ]);
            });
    }
}
