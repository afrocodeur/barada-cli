<?php
namespace Barada\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model{
    /*
     *      **/

    use SoftDeletes;

    protected $table = 'prodcuts';
    protected $fillable = ['id', 'name', 'description', 'price', 'devise', 'deleted_at', 'created_at', 'updated_at'];
    protected $casts = [];


        
    public function table7(){
        return $this->hasMany(Table7::class, 'product_id');
    }
        
    public function commands(){
        return $this->belongsToMany(Command::class, 'Table7', 'product_id', 'command_id');
    }
        
    public function toString(){
        return $this->id;
    }
        
    public function search(Request $request, $get = true){
        $query = Product::select();
                
        if($request->name)
            $query->where('name', $request->name);
                
        if($request->description)
            $query->where('description', $request->description);
                
        if($request->price)
            $query->where('price', $request->price);
                
        if($request->devise)
            $query->where('devise', $request->devise);
                
        if($request->deleted_at)
            $query->where('deleted_at', $request->deleted_at);
                
        if($request->created_at)
            $query->where('created_at', $request->created_at);
                
        if($request->updated_at)
            $query->where('updated_at', $request->updated_at);
        
        return $get ? $query->get() : $query;
    }
    
}