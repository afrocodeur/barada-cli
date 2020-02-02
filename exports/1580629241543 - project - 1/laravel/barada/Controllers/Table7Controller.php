<?php
namespace Barada\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Table7\StoreRequest;
use App\Http\Requests\Table7\UpdateRequest;
use App\Http\Requests\Table7\DestroyRequest;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\Table7;
use App\Models\Command;use App\Models\Product;
abstract class Table7Controller extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(){
        $items = Table7::all();

        return compact('items');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(){
                $command = Command::all();
                $product = Product::all();
        
        return ['command' => $command, 'product' => $product];
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

        
        $model = Table7::create($data);

        return $model;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return mixed
     */
    public function show($id){
        $table7 = Table7::findOrFail($id);

        return compact('table7');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function edit($id){
        $table7 = Table7::findOrFail($id);

        
        return ['table7' => $table7 , 'command' => $command, 'product' => $product];
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

        $table7 = Table7::findOrFail($id);

        $data = $request->all();

        
        $table7->update($data);

        return $table7;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id){
        $table7 = Table7::findOrFail($id);

        return $table7->delete();
    }

}