<?php
namespace Barada\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model{
    /*
     *      **/

    use SoftDeletes;

    protected $table = 'users';
    protected $fillable = ['id', 'firstname', 'lastname', 'email', 'password', 'email_verified_at', 'type', 'deleted_at', 'created_at', 'updated_at'];
    protected $casts = ['email_verified_at' => 'date'];


        
    public function userRole(){
        return $this->hasMany(UserRole::class, 'user_id');
    }
        
    public function roles(){
        return $this->belongsToMany(Role::class, 'UserRole', 'user_id', 'role_id');
    }
        
    public function command(){
        return $this->hasMany(Command::class, 'user_id');
    }
        
    public function toString(){
        return $this->firstname.' '.$this->lastname;
    }
        
    public function search(Request $request, $get = true){
        $query = User::select();
                
        if($request->firstname)
            $query->where('firstname', $request->firstname);
                
        if($request->lastname)
            $query->where('lastname', $request->lastname);
                
        if($request->email)
            $query->where('email', $request->email);
                
        if($request->password)
            $query->where('password', $request->password);
                
        if($request->email_verified_at)
            $query->where('email_verified_at', $request->email_verified_at);
                
        if($request->type)
            $query->where('type', $request->type);
                
        if($request->deleted_at)
            $query->where('deleted_at', $request->deleted_at);
                
        if($request->created_at)
            $query->where('created_at', $request->created_at);
                
        if($request->updated_at)
            $query->where('updated_at', $request->updated_at);
        
        return $get ? $query->get() : $query;
    }
    
}