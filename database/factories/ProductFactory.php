<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'user_id' => factory(App\User::class),
        'name' => $faker->name,
        'description' => $faker->paragraph,
        'price' => $faker->randomNumber(2),
    ];
});
