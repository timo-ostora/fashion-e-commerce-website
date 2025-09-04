<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cart;
use App\Models\User;
use App\Models\Product;

class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $products = Product::all();
        if ($users->isEmpty() || $products->isEmpty()) {
            return;
        }

        foreach ($users as $user) {
            $itemsCount = fake()->numberBetween(0, 3);
            for ($i = 0; $i < $itemsCount; $i++) {
                Cart::create([
                    'user_id' => $user->id,
                    'product_id' => $products->random()->id,
                    'quantity' => fake()->numberBetween(1, 3),
                ]);
            }
        }
    }
}
