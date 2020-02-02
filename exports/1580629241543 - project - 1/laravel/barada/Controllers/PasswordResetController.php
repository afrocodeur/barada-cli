<?php
namespace Barada\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordReset\StoreRequest;
use App\Http\Requests\PasswordReset\UpdateRequest;
use App\Http\Requests\PasswordReset\DestroyRequest;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\PasswordReset;

abstract class PasswordResetController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(){
        $items = PasswordReset::all();

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

        
        $model = PasswordReset::create($data);

        return $model;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return mixed
     */
    public function show($id){
        $passwordReset = PasswordReset::findOrFail($id);

        return compact('passwordReset');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function edit($id){
        $passwordReset = PasswordReset::findOrFail($id);

        
        return ['passwordReset' => $passwordReset ];
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

        $passwordReset = PasswordReset::findOrFail($id);

        $data = $request->all();

        
        $passwordReset->update($data);

        return $passwordReset;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id){
        $passwordReset = PasswordReset::findOrFail($id);

        return $passwordReset->delete();
    }

}