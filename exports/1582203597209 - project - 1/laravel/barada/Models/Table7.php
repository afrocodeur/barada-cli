<?php
namespace Barada\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

use Illuminate\Database\Eloquent\SoftDeletes;

class Table7 extends Model{
    /*
     *      **/

    use SoftDeletes;

    protected $table = 'table7';
    protected $fillable = ['id', 'command_id', 'product_id', 'deleted_at', 'created_at', 'updated_at'];
    protected $casts = [];


        
    public function command(){
        return $this->belongsTo(Command::class, 'command_id');
    }
        
    public function product(){
        return $this->belongsTo(Product::class, 'product_id');
    }
        
    public function toString(){
        return $this->id;
    }
        
    public function search(Request $request, $get = true){
        $query = Table7::select();
                
        if($request->command_id)
            $query->where('command_id', $request->command_id);
                
        if($request->product_id)
            $query->where('product_id', $request->product_id);
                
        if($request->deleted_at)
            $query->where('deleted_at', $request->deleted_at);
                
        if($request->created_at)
            $query->where('created_at', $request->created_at);
                
        if($request->updated_at)
            $query->where('updated_at', $request->updated_at);
        
        return $get ? $query->get() : $query;
    }
    
}