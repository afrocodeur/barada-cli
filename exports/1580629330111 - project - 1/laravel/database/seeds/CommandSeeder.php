<?php
use Illuminate\Database\Seeder;
use App\Models\Command;

class CommandSeeder extends Seeder
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
            Command::create($item);

    }
}