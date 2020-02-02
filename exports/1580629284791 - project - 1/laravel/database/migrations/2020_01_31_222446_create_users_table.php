<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

    public function up()
    {
        /*
         *          *
         */
        Schema::create('users', function(Blueprint $table) {
                        $table->bigIncrements('id');
                        $table->string('firstname');
                        $table->string('lastname');
                        $table->string('email');
                        $table->string('password');
                        $table->timestamp('email_verified_at');
                        $table->string('type')->nullable();
                        $table->timestamp('deleted_at')->nullable();
                        $table->timestamp('created_at')->nullable();
                        $table->timestamp('updated_at')->nullable();
                    });
    }

    public function down()
    {
        Schema::drop('users');
    }
}