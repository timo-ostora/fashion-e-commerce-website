<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use App\Models\Product;

class OrderSeeder extends Seeder
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

        // Create orders for random users
        Order::factory()
            ->count(10)
            ->state(fn () => [
                'user_id' => $users->random()->id,
            ])
            ->create()
            ->each(function (Order $order) use ($products) {
                $itemsCount = fake()->numberBetween(1, 4);
                $total = 0;
                for ($i = 0; $i < $itemsCount; $i++) {
                    $product = $products->random();
                    $quantity = fake()->numberBetween(1, 3);
                    $price = $product->price;
                    $total += $price * $quantity;

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'price' => $price,
                    ]);
                }
                $order->update(['total_price' => $total]);
            });
    }
}
