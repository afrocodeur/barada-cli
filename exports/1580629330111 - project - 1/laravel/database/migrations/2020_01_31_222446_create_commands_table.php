<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommandsTable extends Migration {

    public function up()
    {
        /*
         *          *
         */
        Schema::create('commands', function(Blueprint $table) {
                        $table->bigIncrements('id');
                        $table->string('name');
                        $table->string('description');
                        $table->bigInteger('user_id');
                        $table->timestamp('deleted_at')->nullable();
                        $table->timestamp('created_at')->nullable();
                        $table->timestamp('updated_at')->nullable();
                    });
    }

    public function down()
    {
        Schema::drop('commands');
    }
}