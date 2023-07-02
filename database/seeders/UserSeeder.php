<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $default_user_value =[
            'email_verified_at' => now(),
            'password' => Hash::make('123123123'), 
            'remember_token' => Str::random(10),
        ];
        $admin = User::create(array_merge([
            'name' => 'admin',
            'email' => 'bima@gmail.com',
        ], $default_user_value));
        $contributor = User::create(array_merge([
            'name' => 'contributor',
            'email' => 'contributor@gmail.com',
        ], $default_user_value));
        $viewer = User::create(array_merge([
            'name' => 'viewer',
            'email' => 'viewer@gmail.com',
        ], $default_user_value));

        
        $admin->assignRole('admin');
        $contributor->assignRole('contributor');
        $viewer->assignRole('viewer');
  
    }
}
