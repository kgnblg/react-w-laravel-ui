<?php

use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            'user_id' => 1,
            'name' => Str::random('30'),
            'description' => Str::random('200'),
            'price' => 130.50,
        ]);
    }
}
