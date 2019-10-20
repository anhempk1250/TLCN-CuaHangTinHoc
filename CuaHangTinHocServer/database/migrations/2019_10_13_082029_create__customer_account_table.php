<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomerAccountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('CustomerAccount', function (Blueprint $table) {
            $table->string('id',100);
            $table->primary('id');
            $table->string('Password',50);
            $table->string('Name',50);
            $table->boolean('Sex');
            $table->string('Phone',15);
            $table->string('Address', 200);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('CustomerAccount');
    }
}
