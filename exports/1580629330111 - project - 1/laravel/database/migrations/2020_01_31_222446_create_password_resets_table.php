<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePasswordResetsTable extends Migration {

    public function up()
    {
        /*
         *          *
         */
        Schema::create('password_resets', function(Blueprint $table) {
                        $table->bigIncrements('id');
                        $table->string('email');
                        $table->string('token');
                        $table->timestamp('deleted_at')->nullable();
                        $table->timestamp('created_at')->nullable();
                        $table->timestamp('updated_at')->nullable();
                    });
    }

    public function down()
    {
        Schema::drop('password_resets');
    }
}