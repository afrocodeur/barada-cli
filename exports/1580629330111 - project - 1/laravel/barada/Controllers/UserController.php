<?php
namespace Barada\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Http\Requests\User\DestroyRequest;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;

abstract class UserController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(){
        $items = User::all();

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

        
        if(isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);         }
        
        $model = User::create($data);

        return $model;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return mixed
     */
    public function show($id){
        $user = User::findOrFail($id);

        return compact('user');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function edit($id){
        $user = User::findOrFail($id);

        
        return ['user' => $user ];
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

        $user = User::findOrFail($id);

        $data = $request->all();

        
        if(isset($data['password'])) {
            $data['password'] = bcrypt($data['password']); 
        }
        
        $user->update($data);

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id){
        $user = User::findOrFail($id);

        return $user->delete();
    }

}