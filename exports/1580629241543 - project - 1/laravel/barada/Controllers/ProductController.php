<?php
namespace Barada\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreRequest;
use App\Http\Requests\Product\UpdateRequest;
use App\Http\Requests\Product\DestroyRequest;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\Product;

abstract class ProductController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(){
        $items = Product::all();

        return compact('items');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(){
        
        return [];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return mixed
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(StoreRequest $request){
        $data = $request->all();

        
        $model = Product::create($data);

        return $model;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return mixed
     */
    public function show($id){
        $product = Product::findOrFail($id);

        return compact('product');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function edit($id){
        $product = Product::findOrFail($id);

        
        return ['product' => $product ];
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

        $product = Product::findOrFail($id);

        $data = $request->all();

        
        $product->update($data);

        return $product;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id){
        $product = Product::findOrFail($id);

        return $product->delete();
    }

}