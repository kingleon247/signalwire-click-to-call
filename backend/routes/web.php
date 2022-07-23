<?php

    use Illuminate\Support\Facades\Redirect;
    use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return Redirect::to(env('FRONTEND_URL'));
});

Route::get('/home', function () {
    return Redirect::to(env('FRONTEND_URL'));
});

Route::get('/logout', function () {
    return Redirect::to(env('FRONTEND_URL'));
});

require __DIR__.'/auth.php';
