<?php

namespace App\Http\Controllers\Auth\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $this->authorize('read permission');
            return response()->json([
                'status' => true,
                'message' => 'Permission List',
                'permissions' => Permission::all()
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $this->authorize('create permission');
            $request->validate([
                'name' => 'required|unique:permissions',
                'description' => 'required',
                'guard_name' => 'required',
                'module_id' => 'required'
            ]);
            $permission =  Permission::create([
                'name' => $request->name,
                'description' => $request->description,
                'guard_name' => $request->guard_name,
                'module_id' => $request->module_id
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Permission Created',
                'permission' => $permission
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $this->authorize('update permission');
            $request->validate([
                'name' => 'required|unique:permissions,name,' . $id,
                'description' => 'required',
                'guard_name' => 'required',
                'module_id' => 'required'
            ]);
            $permission = Permission::find($id);
            $permission->name = $request->name;
            $permission->description = $request->description;
            $permission->guard_name = $request->guard_name;
            $permission->module_id = $request->module_id;
            $permission->save();
            return response()->json([
                'status' => true,
                'message' => 'Permission Updated',
                'permission' => $permission
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->authorize('delete permission');
            $permission = Permission::find($id);
            $permission->delete();
            return response()->json([
                'status' => true,
                'message' => 'Permission Deleted',
                'permission' => $permission
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
