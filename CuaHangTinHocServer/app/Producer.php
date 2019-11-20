<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producer extends Model
{
    protected $table = "producer";

    public function getProducerList() {
        return Producer::all()->where('status','=',1);
    }

}
