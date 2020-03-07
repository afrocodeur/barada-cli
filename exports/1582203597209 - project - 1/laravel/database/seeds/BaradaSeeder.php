<?php
use Illuminate\Database\Seeder;

class BaradaSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(){

        $this->call(UserSeeder::class);
        $this->call(PasswordResetSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(UserRoleSeeder::class);
        $this->call(CommandSeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(Table7Seeder::class);
    
    }

}
