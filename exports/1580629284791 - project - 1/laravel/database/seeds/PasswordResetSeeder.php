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

        foreach($data as $item)
            PasswordReset::create($item);

    }
}