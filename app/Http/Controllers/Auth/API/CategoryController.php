<?php

namespace App\Http\Controllers\Auth\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $this->authorize('read category');
            return response()->json([
                'status' => true,
                'message' => 'Category List',
                'categories' => Category::all()
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
            $this->authorize('create category');
            $request->validate([
                'name' => 'required|unique:categories'
            ]);
            $category = Category::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name) . '-' . uniqid()
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Category has been added!',
                'data' => $category
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage(),

            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $this->authorize('read category');
            return response()->json([
                'status' => true,
                'message' => 'Category List',
                'category' => Category::findOrFail($id)
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
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
            $this->authorize('update category');
            $request->validate([
                'name' => 'required|unique:categories'
            ]);
            Category::findOrFail($id)->update([
                'name' => $request->name,
                'slug' => Str::slug($request->name) . '-' . uniqid()
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Category has been updated!',
                'category' => Category::findOrFail($id)
            ], 200);
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
            $this->authorize('delete category');

            $category = Category::findOrFail($id);
            Category::findOrFail($id)->delete();
            return response()->json([
                'status' => true,
                'message' => 'Category ( ' . $category->name . ' ) has been deleted!'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
