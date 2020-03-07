<?php
use Illuminate\Database\Seeder;
use App\Models\Table7;

class Table7Seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
                ];

        foreach($data as $item) {
            if(!isset($item['id']) OR !DB::table('Table7')->select('id')->where('id', $item['id'])->count())
                Table7::create($item);
        }

    }
}