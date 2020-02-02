<?php
namespace Barada\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

use Illuminate\Database\Eloquent\SoftDeletes;

class Command extends Model{
    /*
     *      **/

    use SoftDeletes;

    protected $table = 'commands';
    protected $fillable = ['id', 'name', 'description', 'user_id', 'deleted_at', 'created_at', 'updated_at'];
    protected $casts = [];


        
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
        
    public function table7(){
        return $this->hasMany(Table7::class, 'command_id');
    }
        
    public function prodcuts(){
        return $this->belongsToMany(Product::class, 'Table7', 'command_id', 'product_id');
    }
        
    public function toString(){
        return $this->id;
    }
        
    public function search(Request $request, $get = true){
        $query = Command::select();
                
        if($request->name)
            $query->where('name', $request->name);
                
        if($request->description)
            $query->where('description', $request->description);
                
        if($request->user_id)
            $query->where('user_id', $request->user_id);
                
        if($request->deleted_at)
            $query->where('deleted_at', $request->deleted_at);
                
        if($request->created_at)
            $query->where('created_at', $request->created_at);
                
        if($request->updated_at)
            $query->where('updated_at', $request->updated_at);
        
        return $get ? $query->get() : $query;
    }
    
}