<?php


namespace App\Http\Controllers;

use App\Producer;
use Illuminate\Routing\Controller as BaseController;
class StoreProducerPageController extends BaseController
{
    public function getProducer() {
        $producer = new Producer();
        return ['list' => $producer->getProducerList()];
    }
}