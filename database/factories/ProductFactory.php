<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\Category;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->streetName().' '.fake()->randomElement(['Jacket','Sneakers','Tee','Jeans','Hoodie','Cap']),
            'slug' => fake()->unique()->slug(),
            'price' => fake()->randomFloat(2, 10, 500),
            'stock' => fake()->numberBetween(0, 500),
            'description' => fake()->paragraph(),
            'category_id' => Category::query()->inRandomOrder()->value('id'),
            'is_active' => true,
        ];
    }
}
