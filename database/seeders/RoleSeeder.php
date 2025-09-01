<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin role
        $adminRole = Role::create(['name' => 'admin']);
        
        // Get all permissions
        $permissions = Permission::all();
        
        // Assign all permissions to admin role
        $adminRole->syncPermissions($permissions);
        
        // Create user role (optional - for regular users)
        $userRole = Role::create(['name' => 'user']);
        
        // Assign basic permissions to user role (view only)
        // $userPermissions = Permission::whereIn('name', [
        //     'users.view',
        //     'categories.view'
        // ])->get();
        
        // $userRole->syncPermissions($userPermissions);
    }
}
