<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTable7Table extends Migration {

    public function up()
    {
        /*
         *          *
         */
        Schema::create('table7', function(Blueprint $table) {
                        $table->bigIncrements('id');
                        $table->bigInteger('command_id');
                        $table->bigInteger('product_id');
                        $table->timestamp('deleted_at')->nullable();
                        $table->timestamp('created_at')->nullable();
                        $table->timestamp('updated_at')->nullable();
                    });
    }

    public function down()
    {
        Schema::drop('table7');
    }
}