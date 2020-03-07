<?php
namespace Barada\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRole\StoreRequest;
use App\Http\Requests\UserRole\UpdateRequest;
use App\Http\Requests\UserRole\DestroyRequest;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\UserRole;
use App\Models\User;use App\Models\Role;
abstract class UserRoleController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(){
        $items = UserRole::all();

        return compact('items');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(){
                $user = User::all();
                $role = Role::all();
        
        return ['user' => $user, 'role' => $role];
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

        
        $model = UserRole::create($data);

        return $model;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return mixed
     */
    public function show($id){
        $userRole = UserRole::findOrFail($id);

        return compact('userRole');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function edit($id){
        $userRole = UserRole::findOrFail($id);

        
        return ['userRole' => $userRole , 'user' => $user, 'role' => $role];
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

        $userRole = UserRole::findOrFail($id);

        $data = $request->all();

        
        $userRole->update($data);

        return $userRole;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id){
        $userRole = UserRole::findOrFail($id);

        return $userRole->delete();
    }

}