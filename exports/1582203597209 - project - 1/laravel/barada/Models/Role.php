<?php
namespace Barada\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model{
    /*
     *      **/

    use SoftDeletes;

    protected $table = 'roles';
    protected $fillable = ['id', 'title', 'description', 'deleted_at', 'created_at', 'updated_at'];
    protected $casts = [];


        
    public function userRole(){
        return $this->hasMany(UserRole::class, 'role_id');
    }
        
    public function users(){
        return $this->belongsToMany(User::class, 'UserRole', 'role_id', 'user_id');
    }
        
    public function toString(){
        return $this->id;
    }
        
    public function search(Request $request, $get = true){
        $query = Role::select();
                
        if($request->title)
            $query->where('title', $request->title);
                
        if($request->description)
            $query->where('description', $request->description);
                
        if($request->deleted_at)
            $query->where('deleted_at', $request->deleted_at);
                
        if($request->created_at)
            $query->where('created_at', $request->created_at);
                
        if($request->updated_at)
            $query->where('updated_at', $request->updated_at);
        
        return $get ? $query->get() : $query;
    }
    
}