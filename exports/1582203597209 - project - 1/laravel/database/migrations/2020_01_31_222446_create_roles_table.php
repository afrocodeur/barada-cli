<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRolesTable extends Migration {

    public function up()
    {
        /*
         *          *
         */
        Schema::create('roles', function(Blueprint $table) {
                        $table->bigIncrements('id');
                        $table->string('title');
                        $table->string('description');
                        $table->timestamp('deleted_at')->nullable();
                        $table->timestamp('created_at')->nullable();
                        $table->timestamp('updated_at')->nullable();
                    });
    }

    public function down()
    {
        Schema::drop('roles');
    }
}