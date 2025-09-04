<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
class Category extends Model
{
        /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

}
