<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserRolesTable extends Migration {

    public function up()
    {
        /*
         *          *
         */
        Schema::create('user_roles', function(Blueprint $table) {
                        $table->integer('id');
                        $table->bigInteger('user_id');
                        $table->bigInteger('role_id');
                        $table->timestamp('deleted_at')->nullable();
                        $table->timestamp('created_at')->nullable();
                        $table->timestamp('updated_at')->nullable();
                    });
    }

    public function down()
    {
        Schema::drop('user_roles');
    }
}