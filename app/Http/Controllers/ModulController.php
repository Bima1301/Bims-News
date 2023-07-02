<?php

namespace App\Http\Controllers;

use App\Models\Module;
use App\Http\Requests\StoreModulRequest;
use App\Http\Requests\UpdateModulRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;

class ModulController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $this->authorize('read modul');
        $data = [
            'modules' => Module::latest()->get(),
            'module' => 'active'
        ];
        return Inertia::render('Auth/Modules/Modules', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('create modul');
        return Inertia::render('Auth/Modules/CreateModul');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreModulRequest $request): RedirectResponse
    {
        $this->authorize('create modul');
        Module::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);
        return Redirect::route('modules.index')->with('message', "Modul has been added!");
    }

    /**
     * Display the specified resource.
     */
    // public function show(Module $modul): Response
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Module $module): Response
    {
        $this->authorize('update modul');
        return Inertia::render('Auth/Modules/EditModul', ['modul' => $module]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateModulRequest $request, Module $module): RedirectResponse
    {
        $this->authorize('update modul');
        Module::where('id', $module->id)->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);
        return Redirect::route('modules.index')->with('message', "Modul has been updated!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Module $module): RedirectResponse
    {
        $this->authorize('delete modul');
        try {
            $module = Module::findOrFail($module->id);
            $module->delete();
            return Redirect::route('modules.index')->with('message', "Modul has been deleted!");
        } catch (\Exception $e) {
            return Redirect::route('modules.index')->with('error', "Modul cannot deleted!");

        }
    }
}
