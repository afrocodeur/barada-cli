<?php
namespace Barada\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

use Illuminate\Database\Eloquent\SoftDeletes;

class UserRole extends Model{
    /*
     *      **/

    use SoftDeletes;

    protected $table = 'user_roles';
    protected $fillable = ['id', 'user_id', 'role_id', 'deleted_at', 'created_at', 'updated_at'];
    protected $casts = [];


        
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
        
    public function role(){
        return $this->belongsTo(Role::class, 'role_id');
    }
        
    public function toString(){
        return $this->id;
    }
        
    public function search(Request $request, $get = true){
        $query = UserRole::select();
                
        if($request->user_id)
            $query->where('user_id', $request->user_id);
                
        if($request->role_id)
            $query->where('role_id', $request->role_id);
                
        if($request->deleted_at)
            $query->where('deleted_at', $request->deleted_at);
                
        if($request->created_at)
            $query->where('created_at', $request->created_at);
                
        if($request->updated_at)
            $query->where('updated_at', $request->updated_at);
        
        return $get ? $query->get() : $query;
    }
    
}