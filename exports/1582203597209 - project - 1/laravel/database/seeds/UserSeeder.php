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
                ['id' => 3,'firstname' => 'Eleonore','lastname' => 'Kodjovi','email' => 'e.kodjovi@test.io','password' => bcrypt('eleo'),'email_verified_at' => '2019-10-01','type' => 'moderator'],
                ['id' => 4,'firstname' => 'Tata','lastname' => 'Jolie','email' => 'tata@test.io','password' => bcrypt('Bourondu'),'email_verified_at' => '2019-10-01','type' => 'user'],
                ['id' => 5,'firstname' => 'Pull','lastname' => 'Git','email' => 'git@pull.ne','password' => bcrypt('Babelbe'),'email_verified_at' => '2020-01-01','type' => 'user'],
                ['id' => 6,'firstname' => 'Wowo','lastname' => 'chan','email' => 'trio@ilok.io','password' => bcrypt('DI08'),'email_verified_at' => '2019-01-01'],
                ['id' => 7,'firstname' => 'Rien a dire','lastname' => 'groo','email' => 'took@est.io','password' => bcrypt('Djanko'),'email_verified_at' => '2019-01-01','type' => 'user'],
                ];

        foreach($data as $item) {
            if(!isset($item['id']) OR !DB::table('users')->select('id')->where('id', $item['id'])->count())
                User::create($item);
        }

    }
}