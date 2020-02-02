<?php
namespace Barada\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

use Illuminate\Database\Eloquent\SoftDeletes;

class PasswordReset extends Model{
    /*
     *      **/

    use SoftDeletes;

    protected $table = 'password_resets';
    protected $fillable = ['id', 'email', 'token', 'deleted_at', 'created_at', 'updated_at'];
    protected $casts = [];


        
    public function toString(){
        return $this->id;
    }
        
    public function search(Request $request, $get = true){
        $query = PasswordReset::select();
                
        if($request->email)
            $query->where('email', $request->email);
                
        if($request->token)
            $query->where('token', $request->token);
                
        if($request->deleted_at)
            $query->where('deleted_at', $request->deleted_at);
                
        if($request->created_at)
            $query->where('created_at', $request->created_at);
                
        if($request->updated_at)
            $query->where('updated_at', $request->updated_at);
        
        return $get ? $query->get() : $query;
    }
    
}