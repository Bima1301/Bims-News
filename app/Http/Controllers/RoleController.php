<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Models\Module;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $this->authorize('read role');
        $data = [
            'roles' => Role::latest()->get(),
        ];
        return Inertia::render('Auth/Role/Roles', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('create role');
        return Inertia::render('Auth/Role/CreateRole');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request): RedirectResponse
    {
        $this->authorize('create role');
        Role::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);
        return Redirect::route('roles.index')->with('message', "Role has been added!");
    }

    /**
     * Display the specified resource.
     */
    // public function show(Role $role): Response
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role): Response
    {
        $this->authorize('update role');
        return Inertia::render('Auth/Role/EditRole', ['role' => $role]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role): RedirectResponse
    {
        $this->authorize('update role');
        Role::where('id', $role->id)->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);
        return Redirect::route('roles.index')->with('message', "Role has been updated!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role): RedirectResponse
    {
        $this->authorize('delete role');
        try {
            $role = Role::findOrFail($role->id);
            $role->delete();
            return Redirect::route('roles.index')->with('message', "Role has been deleted!");
        } catch (\Exception $e) {
            return Redirect::route('roles.index')->with('error', "Role cannot deleted!");
        }
    }

    public function rolePermission($id)
    {
        $this->authorize('read role');
        $data = [
            'permissions' => Role::with('permissions')->where('id', $id)->first(),
            'id_role' => $id,
            'role_name' => Role::where('id', $id)->first()->name,
            'permission' => 'active'
        ];
        // dd($data);
        return Inertia::render('Auth/Role/Roles', $data);
    }

    public function manageRole($idRole)
    {
        $this->authorize('create permission');
        $data = [
            'role_permissions' => Role::with('permissions')->where('id', $idRole)->first(),
            'modules' => Module::with('permissions')->get(),
            'id_role' => $idRole,
            'role_name' => Role::where('id', $idRole)->first()->name,
            'permission' => 'active'
        ];
        // dd($data);
        return Inertia::render('Auth/Role/ManageRolePermission', $data);
    }

    public function manageRolePermission(Request $request, $idRole)
    {
        dd($request->permissions);
        $this->authorize('create permission');
        $role = Role::find($idRole);
        $role->syncPermissions($request->permissions);
        return Redirect::route('role.permissions.index', $idRole)->with('message', "Role permission has been updated!");
    }
}
