<?php
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
                ['id' => 1,'firstname' => 'Root','lastname' => 'Administrator','email' => 'admin@admin.io','password' => bcrypt('admin'),'email_verified_at' => '2019-10-01','type' => 'admin'],
                ['id' => 2,'firstname' => 'John','lastname' => 'Doe','email' => 'j.doe@doe.io','password' => bcrypt('john'),'email_verified_at' => '2019-10-01'],
                ];

        foreach($data as $item)
            User::create($item);

    }
}