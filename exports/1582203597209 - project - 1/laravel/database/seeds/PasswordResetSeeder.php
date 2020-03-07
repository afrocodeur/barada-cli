<?php
use Illuminate\Database\Seeder;
use App\Models\PasswordReset;

class PasswordResetSeeder extends Seeder
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
            if(!isset($item['id']) OR !DB::table('password_resets')->select('id')->where('id', $item['id'])->count())
                PasswordReset::create($item);
        }

    }
}