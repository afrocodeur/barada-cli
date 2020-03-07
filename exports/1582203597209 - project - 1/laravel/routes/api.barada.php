<?php
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

// BARADA GENERATE ROUTES

Route::name('api.barada.')->group(function () {


    Route::resource("user", "UserController")->except([ 'create', 'edit']);

    Route::resource("password-reset", "PasswordResetController")->except([ 'create', 'edit']);

    Route::resource("role", "RoleController")->except([ 'create', 'edit']);

    Route::resource("user-role", "UserRoleController")->except([ 'create', 'edit']);

    Route::resource("command", "CommandController")->except([ 'create', 'edit']);

    Route::resource("product", "ProductController")->except([ 'create', 'edit']);

    Route::resource("table7", "Table7Controller")->except([ 'create', 'edit']);

});