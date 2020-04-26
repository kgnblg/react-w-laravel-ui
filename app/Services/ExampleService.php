<?php

namespace App\Services;

class ExampleService
{
    private $param;

    public function __construct($param)
    {
        $this->param = $param;
    }

    public function handle()
    {
        dd('it works ' . $this->param);
    }
}
