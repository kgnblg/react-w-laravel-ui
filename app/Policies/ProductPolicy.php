<?php

namespace App\Policies;

use App\Product;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Log;

class ProductPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any products.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        Log::info('Product policy - viewAny executed.');

        // Client and dealers can see the products
        return true;
    }

    /**
     * Determine whether the user can view the product.
     *
     * @param  \App\User  $user
     * @param  \App\Product  $product
     * @return mixed
     */
    public function view(User $user, Product $product)
    {
        Log::debug('Product policy - view executed.');
        $roles = $user->roles->pluck('name');
        return (
            $roles->contains('Client')
            || (
                $product->user->is($user)
                && $roles->contains('Dealer')
            )
        );
    }

    /**
     * Determine whether the user can create products.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        Log::debug('Product policy - create executed.');
        return $user->roles->pluck('name')->contains('Dealer');
    }

    /**
     * Determine whether the user can update the product.
     *
     * @param  \App\User  $user
     * @param  \App\Product  $product
     * @return mixed
     */
    public function update(User $user, Product $product)
    {
        Log::debug('Product policy - update executed.');
        return (
            $user->roles->pluck('name')->contains('Dealer')
            && $product->user->is($user)
        );
    }

    /**
     * Determine whether the user can delete the product.
     *
     * @param  \App\User  $user
     * @param  \App\Product  $product
     * @return mixed
     */
    public function delete(User $user, Product $product)
    {
        Log::debug('Product policy - delete executed.');
        return (
            $user->roles->pluck('name')->contains('Dealer')
            && $product->user->is($user)
        );
    }

    /**
     * Determine whether the user can restore the product.
     *
     * @param  \App\User  $user
     * @param  \App\Product  $product
     * @return mixed
     */
    public function restore(User $user, Product $product)
    {
        Log::debug('Product policy - restore executed.');
        return (
            $user->roles->pluck('name')->contains('Dealer')
            && $product->user->is($user)
        );
    }

    /**
     * Determine whether the user can permanently delete the product.
     *
     * @param  \App\User  $user
     * @param  \App\Product  $product
     * @return mixed
     */
    public function forceDelete(User $user, Product $product)
    {
        Log::debug('Product policy - forceDelete executed.');
        return (
            $user->roles->pluck('name')->contains('Dealer')
            && $product->user->is($user)
        );
    }
}
