<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/nosotros', [PageController::class, 'nosotros'])->name('nosotros');
Route::get('/soluciones', [PageController::class, 'soluciones'])->name('soluciones');
Route::get('/faq', [PageController::class, 'faq'])->name('faq');
Route::get('/formulario', [PageController::class, 'formulario'])->name('formulario');
Route::post('/formulario', [ContactController::class, 'store'])->name('formulario.store');
Route::get('/politica-privacidad', [PageController::class, 'politica'])->name('politica');
Route::get('/terminos-servicio', [PageController::class, 'terminos'])->name('terminos');
