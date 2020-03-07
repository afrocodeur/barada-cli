<?php
use Illuminate\Database\Seeder;
use App\Models\UserRole;

class UserRoleSeeder extends Seeder
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
            if(!isset($item['id']) OR !DB::table('user_roles')->select('id')->where('id', $item['id'])->count())
                UserRole::create($item);
        }

    }
}