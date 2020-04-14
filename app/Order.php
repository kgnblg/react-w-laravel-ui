<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\OrderProduct;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'customer_name',
        'customer_address',
        'status',
    ];

    public function order_products()
    {
        return $this->hasMany(OrderProduct::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
