<?php
namespace Barada\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Command\StoreRequest;
use App\Http\Requests\Command\UpdateRequest;
use App\Http\Requests\Command\DestroyRequest;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\Command;
use App\Models\User;
abstract class CommandController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(){
        $items = Command::all();

        return compact('items');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(){
                $user = User::all();
        
        return ['user' => $user];
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

        
        $model = Command::create($data);

        return $model;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return mixed
     */
    public function show($id){
        $command = Command::findOrFail($id);

        return compact('command');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function edit($id){
        $command = Command::findOrFail($id);

        
        return ['command' => $command , 'user' => $user];
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

        $command = Command::findOrFail($id);

        $data = $request->all();

        
        $command->update($data);

        return $command;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id){
        $command = Command::findOrFail($id);

        return $command->delete();
    }

}