<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'Elite User',
                'email' => 'elite@example.com',
                'password' => Hash::make('password'),
                'user_role' => 'Elite',
                'user_sub_role' => 'Administrator',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Provider User',
                'email' => 'provider@example.com',
                'password' => Hash::make('password'),
                'user_role' => 'Providers',
                'user_sub_role' => 'Provider Staff',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Law Firm User',
                'email' => 'lawfirm@example.com',
                'password' => Hash::make('password'),
                'user_role' => 'Law Firms',
                'user_sub_role' => 'Case Manage',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
