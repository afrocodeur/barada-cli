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

        foreach($data as $item) {
            if(!isset($item['id']) OR !DB::table('Commands')->select('id')->where('id', $item['id'])->count())
                Command::create($item);
        }

    }
}