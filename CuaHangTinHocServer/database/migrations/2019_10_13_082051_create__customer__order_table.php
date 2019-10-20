<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomerOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Customer_Order', function (Blueprint $table) {
            $table->string('id_customer',100)->unsigned();
            $table->bigInteger('id_Order')->unsigned();
            $table->primary(['id_customer', 'id_Order']);
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
        Schema::dropIfExists('Customer_Order');
    }
}
