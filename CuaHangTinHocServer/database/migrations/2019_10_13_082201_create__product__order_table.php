<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Product_Order', function (Blueprint $table) {
            $table->bigInteger('ID_Product')->unsigned();
            $table->bigInteger('ID_Order')->unsigned();
            $table->bigInteger('ProductCount');
            $table->primary(['ID_Product', 'ID_Order']);
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
        Schema::dropIfExists('Product_Order');
    }
}
