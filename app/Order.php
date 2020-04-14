<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'count',
        'status',
    ];

    public function product()
    {
        return $this->hasOne(Product::class);
    }
}
