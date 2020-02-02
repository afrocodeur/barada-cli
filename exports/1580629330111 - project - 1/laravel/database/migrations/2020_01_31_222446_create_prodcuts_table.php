<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProdcutsTable extends Migration {

    public function up()
    {
        /*
         *          *
         */
        Schema::create('prodcuts', function(Blueprint $table) {
                        $table->bigIncrements('id');
                        $table->string('name');
                        $table->string('description');
                        $table->string('price');
                        $table->string('devise');
                        $table->timestamp('deleted_at')->nullable();
                        $table->timestamp('created_at')->nullable();
                        $table->timestamp('updated_at')->nullable();
                    });
    }

    public function down()
    {
        Schema::drop('prodcuts');
    }
}