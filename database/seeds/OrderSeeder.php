<?php

use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('order')->insert([
            'product_id' => 15,
            'count' => 10,
            'status' => 'sent',
            'total_price' => 1350,
        ]);
    }
}
