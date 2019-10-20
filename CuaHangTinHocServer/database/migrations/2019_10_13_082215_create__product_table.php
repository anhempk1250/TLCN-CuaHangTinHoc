<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Product', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('Name');
            $table->float('Price');
            $table->string('Description');
            $table->bigInteger('ID_Producer')->nullable()->unsigned();
            $table->bigInteger('ID_Type_Product')->nullable()->unsigned();
            $table->bigInteger('ID_Product_Category')->unsigned();
            $table->string('ID_Employee', 100);
            $table->string('ID_Discount')->nullable()->unsigned();
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
        Schema::dropIfExists('Product');
    }
}
