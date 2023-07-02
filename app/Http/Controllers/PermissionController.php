<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Termwind\Components\Dd;

class PermissionController extends Controller
{
    public function index($id)
    {
        $this->authorize('read permission');
        $data = [
            'permissions' => Permission::where('module_id', $id)->get(),
            'id_module' => $id,
        ];
        // dd($data);
        return Inertia::render('Auth/Modules/Modules', $data);
    }

    public function create($id)
    {
        $this->authorize('create permission');
        $data = [
            'module_name' => Module::find($id)->name,
            'module_id' => $id,
            'permissions' => Permission::where('module_id', $id)->get(),
        ];
        // dd($data); q
        return Inertia::render('Auth/Modules/CreatePermission', $data);
    }
    public function store(Request $request, $id)
    {
        $this->authorize('create permission');
        $permission_old = Permission::where('module_id', $id)->get()->pluck('name')->toArray();
        $permission_new = $request->permission;
        // dd($permission_new);
        if (count($permission_old) == 0 && count($permission_new) > 0) {
            foreach ($permission_new as $key => $value) {
                $permission = new Permission();
                $permission->name = $value;
                $permission->guard_name = 'web';
                $permission->description = ucwords($value) . ' management';
                $permission->module_id = $id;
                $permission->save();
                // Permission::create([
                //     'name' => $value,
                //     'guard_name' => 'web',
                //     'description' => ucwords($value) . ' management',
                //     'module_id' => $id,
                // ]);
            }
            return redirect()->route('permissions.index', $id)->with('message', "Permission has been changed!");
        }

        $permission = array_diff($permission_new, $permission_old);
        if (count($permission) > 0) {
            
            
            foreach ($permission as $key => $value) {
                $permission = new Permission();
                $permission->name = $value;
                $permission->guard_name = 'web';
                $permission->description = ucwords($value) . ' management';
                $permission->module_id = $id;
                $permission->save();
                // Permission::create([
                //     'name' => $value,
                //     'guard_name' => 'web',
                //     'description' => ucwords($value) . ' management',
                //     'module_id' => $id,
                // ]);
            }
        }

        $permission = array_diff($permission_old, $permission_new);
        if (count($permission) > 0) {
            foreach ($permission as $key => $value) {
                Permission::where('name', $value)->delete();
            }
        }
        return redirect()->route('permissions.index', $id)->with('message', "Permission has been changed!");
    }
}
