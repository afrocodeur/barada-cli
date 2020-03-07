<?php
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
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
            if(!isset($item['id']) OR !DB::table('roles')->select('id')->where('id', $item['id'])->count())
                Role::create($item);
        }

    }
}