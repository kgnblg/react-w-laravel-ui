<?php

namespace App\Http\Controllers;

use App\Product;
use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\{ UpdateProductRequest, CreateProductRequest };
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ProductResource;
use JWTAuth;

use App\Notifications\OrderNotification;
use App\Jobs\NotificationJob;
use Carbon\Carbon;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Product::class, 'product');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->user();
        $product = Product::where('user_id', '=', $user->id)->get();
        return ProductResource::collection($product);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CreateProductRequest  $request
     * @return ProductResource
     */
    public function store(CreateProductRequest $request)
    {
        $validated = $request->validated();
        $user = JWTAuth::user();

        $product = new Product();
        $product->name = $validated['name'];
        $product->description = $validated['description'];
        $product->price = $validated['price'];
        $product->user_id = $user->id;

        $product->save();

        NotificationJob::dispatch($user, new OrderNotification([
            'greeting' => 'New product notification',
            'data' => 'This is the new product ' . $product->name,
            'thanks' => 'Regards'
        ]))->delay(Carbon::now()->addSeconds(60));

        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $user = JWTAuth::user();
        if (! $product->user->is($user)) {
            return response()->json(['error' => 'You can not edit this product.'], 403);
        }

        $validated = $request->validated();
        $product->update([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'description' => $validated['description'],
        ]);

        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $user = JWTAuth::user();
        if (! $product->user->is($user)) {
            return response()->json(['error' => 'You can not delete this product.'], 403);
        }

        $product->delete();

        return response()->json(null, 204);
    }
}
