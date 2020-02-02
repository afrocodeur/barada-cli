<?php
namespace Barada\Controllers\Api;

use Illuminate\Http\Response;
use Illuminate\Http\Request;

use Barada\Controllers\ProductController;

use App\Http\Requests\Product\StoreRequest;
use App\Http\Requests\Product\UpdateRequest;
use App\Http\Requests\Product\DestroyRequest;

abstract class ProductApiController extends ProductController{

    /**
     * Display a listing of the resource.
     */
    public function index(){
        $items =  parent::index();

        return $items['items'];
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return mixed
     */
    public function show($id){

        $values = parent::show($id);

        // TODO : do something with the resource

        return array_values($values)[0];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return mixed
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(StoreRequest $request){
        $item = parent::store($request);

        // TODO : do something with the resource

        return $item;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @param  Request $request
     * @return mixed
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update($id, UpdateRequest $request){
        $item = parent::update($id, $request);

        return $item;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id){
        parent::destroy($id);

        return [];
    }



}