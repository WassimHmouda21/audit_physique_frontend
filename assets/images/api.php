<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\Customer_sitesController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\Predefined_observationsController;
use App\Http\Controllers\ReponseController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get("/questions", [QuestionController::class, 'index']);
Route::get("/projects", [ProjectController::class, 'index']);
Route::get("/customer_sites", [Customer_sitesController::class, 'index']);

// Route for getSitebyCustomerId method
Route::get('/customer-sites/{customerId}', [Customer_sitesController::class, 'getSitebyCustomerId']);

Route::get("categories",[CategorieController::class,'index']);
// Show the form to create a new customer



Route::resource('customers', CustomerController::class)->except([
    'create'
]);

Route::get('customers/create', [CustomerController::class, 'create'])->name('customers.create');
Route::get('/customer', [CustomerController::class, 'index'])->name('customer.index');
Route::get('/predefined_observation/{question}', [Predefined_observationsController::class, 'getobservationsbyQuestion']);
Route::get('/customers/{id}/edit', [CustomerController::class, 'edit'])->name('customers.edit');

Route::put('/customers/{id}', [CustomerController::class, 'update'])->name('customers.update');

Route::get('/customerpage', [CustomerController::class, 'display']);
Route::post('/addImage', [CustomerController::class, 'sstoree'])->name('addImage');
Route::get('/predefined_observation/{question}', [Predefined_observationsController::class, 'getobservationsbyQuestion']);
Route::put('/reponses/{id}', [ReponseController::class, 'putReponsebyId']);
