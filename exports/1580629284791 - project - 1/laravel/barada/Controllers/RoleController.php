<?php
namespace Barada\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Role\StoreRequest;
use App\Http\Requests\Role\UpdateRequest;
use App\Http\Requests\Role\DestroyRequest;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\Role;

abstract class RoleController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(){
        $items = Role::all();

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

        
        $model = Role::create($data);

        return $model;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return mixed
     */
    public function show($id){
        $role = Role::findOrFail($id);

        return compact('role');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function edit($id){
        $role = Role::findOrFail($id);

        
        return ['role' => $role ];
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

        $role = Role::findOrFail($id);

        $data = $request->all();

        
        $role->update($data);

        return $role;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id){
        $role = Role::findOrFail($id);

        return $role->delete();
    }

}