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

        foreach($data as $item)
            Table7::create($item);

    }
}