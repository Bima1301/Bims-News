<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

use function PHPSTORM_META\map;

class ModulSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $moduls = [
            'post' => 'Post Management',
            'category' => 'Category Management',
            'comment' => 'Comment Management',
            'user' => 'User Management',
            'role' => 'Role Management',
            'permission' => 'Permission Management',
            'modul' => 'Modul Management',
        ];

        $permissions = [
            'create' => 'Create',
            'update' => 'Update',
            'delete' => 'Delete',
            'read' => 'Read',
            'owner' => 'Owner',
            'approve' => 'Approve',
            'all' => 'All',
        ];

        foreach ($moduls as $key => $value) {
            $modul= Module::create([
                'name' => $key,
                'description' => $value,
            ]);
            foreach ($permissions as $keyperm => $valueperm) {
                $permission = Permission::create([
                    'name' => $keyperm.' '.$key,
                    'description' => $valueperm.' '.$value,
                    'guard_name' => 'web',
                    'module_id' => $modul->id,
                ]);
                $role = Role::findByName('admin');
                $role->givePermissionTo($permission);
            }
        }
        
    }
}
