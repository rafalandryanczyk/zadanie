<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChartsController;

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

Route::get('/', [ChartsController::class, 'index'])->name('charts');
Route::post('/charts/save', [ChartsController::class, 'save']);
Route::post('/charts/createSource', [ChartsController::class, 'createSource']);
Route::delete('/charts/deleteSource/{id}', [ChartsController::class, 'deleteSource']);
