<?php

namespace App\Http\Controllers\Auth\API;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $this->authorize('read role');
            return response()->json([
                'status' => true,
                'message' => 'Role List',
                'roles' => Role::all()
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
            $this->authorize('create role');
            $request->validate([
                'name' => 'required|unique:roles',
                'description' => 'required',
                'guard_name' => 'required'
            ]);
            $role =  Role::create([
                'name' => $request->name,
                'description' => $request->description,
                'guard_name' => $request->guard_name
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Role has been added!',
                'data' => $role
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
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
            $this->authorize('update role');
            $request->validate([
                'name' => 'required|unique:roles,name,' . $id,
                'description' => 'required',
                'guard_name' => 'required'
            ]);
            $role = Role::find($id);
            $role->update([
                'name' => $request->name,
                'description' => $request->description,
                'guard_name' => $request->guard_name
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Role has been updated!',
                'data' => $role
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->authorize('delete role');
            $role = Role::find($id);
            $role->delete();
            return response()->json([
                'status' => true,
                'message' => 'Role ( ' . $role->name . ' ) has been deleted!',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
