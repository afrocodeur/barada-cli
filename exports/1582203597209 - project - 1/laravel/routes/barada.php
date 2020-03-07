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

Route::name('barada.')->group(function () {


    Route::resource("user", "UserController");

    Route::resource("password-reset", "PasswordResetController");

    Route::resource("role", "RoleController");

    Route::resource("user-role", "UserRoleController");

    Route::resource("command", "CommandController");

    Route::resource("product", "ProductController");

    Route::resource("table7", "Table7Controller");

});