<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Category;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $this->authorize('read post');
        if (auth()->user()->can('all post')) {
            $data = [
                // 'posts' => Post::join('users', 'posts.user_id', '=', 'users.id')->select('posts.*' , 'users.name as author')->latest('posts.date')->get()
                'posts' => Post::with('categories')->leftJoin('users', 'posts.user_id', '=', 'users.id')->select('posts.*', 'users.id AS user_id', 'users.name')->latest('posts.date')->get()
            ];
        } else {
            $data = [
                // 'posts' => Post::join('users', 'posts.user_id', '=', 'users.id')->select('posts.*' , 'users.name as author')->latest('posts.date')->get()
                'posts' => Post::with('categories')->where('user_id', '=', auth()->user()->id)->leftJoin('users', 'posts.user_id', '=', 'users.id')->latest('posts.date')->select('posts.*', 'users.id AS user_id', 'users.name')->get()
            ];
        }
        // dd($data);
        return Inertia::render('Auth/Post/MyPost', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('create post');
        $data = [
            'categories' => Category::all()
        ];
        return Inertia::render('Auth/Post/CreatePost', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request): RedirectResponse
    {
        $this->authorize('create post');
        $slug = Str::slug($request->title) . '-' . uniqid();
        if (auth()->user()->can('approve post') == "admin") {
            $post = Post::create([
                'user_id' => auth()->user()->id,
                'title' => $request->title,
                'slug' => $slug,
                'content' => $request->content,
                'date' => $request->date,
                'status' => 'publish',
                'image' => $request->file('image')->store('post-image')
            ]);

            foreach ($request->category as $value) {
                $post->categories()->attach($value);
            }
        } else {
            $post = Post::create([
                'user_id' => auth()->user()->id,
                'title' => $request->title,
                'slug' => $slug,
                'content' => $request->content,
                'status' => 'unpublish',
                'date' => $request->date,
                'image' => $request->file('image')->store('post-image')
            ]);
            foreach ($request->category as $value) {
                $post->categories()->attach($value);
            }
        }

        # code...
        return Redirect::route('mypost.index')->with('message', "Post has been added!");
    }

    /**
     * Display the specified resource.
     */
    public function show($request): Response
    {
        $this->authorize('read post');
        $post = Post::where('slug', '=', $request)->with(array('comments' => function($q){
            $q->orderBy('created_at', 'desc');
        }))->with('categories')->first();

        // dd($post->categories);
        return Inertia::render('Auth/Post/ShowPost', ['post' => $post]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($request): Response
    {
        $this->authorize('update post');
        $user_post = Post::with('categories')->where('slug', '=', $request)->first();

        if ($user_post->user_id == auth()->user()->id) {
            $post = Post::with('categories')->where('slug', '=', $request)->with(array('categories' => function ($q) {
                $q->select(array('name as label', 'id as value'));
            }))->first();
            // dd($post);
            return Inertia::render('Auth/Post/EditPost', ['post' => $post, 'allCategories' => Category::all()]);
        } else {
            abort(403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $slug): RedirectResponse
    {
        // dd($slug);
        $this->authorize('update post');
        $post1 = Post::where('slug', $slug)->first();
        // dd($post1);
        if ($request->image !== $post1->image) {
            Storage::delete($post1->image);
            Post::where('slug', '=', $slug)->update([
                'title' => $request->title,
                'date' => $request->date,
                'content' => $request->content,
                'image' => $request->file('image')->store('post-image'),

            ]);
        } else {
            Post::where('slug', '=', $slug)->update([
                'title' => $request->title,
                'content' => $request->content,
                'date' => $request->date,
            ]);
        }
        $temp_category = [];
        foreach ($request->category as $value) {
            // dd($value);
            if (is_array($value)) {
                $value = $value['value'];
            }
            $temp_category[] = $value;
        }
        $post1->categories()->sync($temp_category);
        return Redirect::route('mypost.index')->with('message', "Post has been updated!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): RedirectResponse
    {
        $this->authorize('delete post');
        $post = Post::where('id', $id)->first();
        Storage::delete($post->image);
        Post::destroy($post->id);
        // $post->categories()->sync([]);
        return Redirect::route('mypost.index')->with('message', "Post has been deleted!");
    }

    public function publish($idPost)
    {
        $this->authorize('approve post');
        // dd($idPost);
        // dd(Post::where('id', '=', $idPost)->first());
        Post::where('id', '=', $idPost)->update([
            'status' => 'publish'
        ]);
        return Redirect::route('mypost.index')->with('message', "Post has been published!");
    }
    public function unpublish($idPost)
    {
        $this->authorize('approve post');
        Post::where('id', '=', $idPost)->update([
            'status' => 'unpublish'
        ]);
        return Redirect::route('mypost.index')->with('message', "Post has been Un-Published!");
    }
    public function adminPost()
    {
        $this->middleware('permission:all post|owner post');
        $data = [
            // 'posts' => Post::join('users', 'posts.user_id', '=', 'users.id')->select('posts.*' , 'users.name as author')->latest('posts.date')->get()
            'posts' => Post::with('categories')->where('user_id', '=', auth()->user()->id)->latest('posts.date')->get()
        ];
        return Inertia::render('Auth/Post/AdminPost', $data);
    }
}
