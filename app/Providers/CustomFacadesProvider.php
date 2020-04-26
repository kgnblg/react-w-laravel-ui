<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class CustomFacadesProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('example', function () {
            return new \App\Services\ExampleService('Kagan');
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
