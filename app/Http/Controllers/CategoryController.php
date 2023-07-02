<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $data = [
            'categories' => Category::latest()->get()
        ];
        return Inertia::render('Auth/Category/Category', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Category/CreateCategory');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $slug = Str::slug($request->name) . '-' . uniqid();
        Category::create([
            'name' => $request->name,
            'slug' => $slug
        ]);
        return Redirect::route('category.index')->with('message', "Category has been added!");

    }

    /**
     * Display the specified resource.
     */
    // public function show(Category $category): Response
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category): Response
    {
        return Inertia::render('Auth/Category/EditCategory', ['category' => $category]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        Category::where('id' , $category->id)->update([
            'name' => $request->name
        ]);
        return Redirect::route('category.index')->with('message', "Category has been updated!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category): RedirectResponse
    {
        // Category::destroy($category->id);
        try {
            $category = Category::findOrFail($category->id);
            $category->delete();
            return Redirect::route('category.index')->with('message', "Category has been deleted!");
        } catch (\Exception $e) {
            return Redirect::route('category.index')->with('error', "Category cannot deleted!");

        }

    }
}
