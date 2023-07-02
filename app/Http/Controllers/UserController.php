<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Termwind\Components\Dd;

class UserController extends Controller
{
    public function dashboard()
    {
        $data = [
            'all_news' => count(Post::all()),
            'unpublished_news' => count(Post::where('status', 'unpublish')->get()),
            'published_news' => count(Post::where('status', 'publish')->get()),
            'users' => count(User::all())
        ];
        // dd($data);
        return Inertia::render('Dashboard', $data);
    }
    public function index(Request $request)
    {
        if ($request->keyword) {
            # code...
            $post = Post::where('posts.status' , '=' , 'publish')->with('categories')->join('users' , 'posts.user_id' , '=' , 'users.id')
            ->where('title' , 'like', '%'. $request->keyword . '%')
            ->orWhere('content' , 'like', '%'. $request->keyword . '%')
            ->select('posts.*','users.name AS author')
            ->latest('posts.date')
            ->paginate(8);
        } else {
            $post = Post::where('posts.status' , '=' , 'publish')->with('categories')->join('users' , 'posts.user_id' , '=' , 'users.id')
            ->select('posts.*','users.name AS author')
            ->latest('posts.date')
            ->paginate(8);
            # code...
        }
        // dd($post);
        $data =[
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'posts' => $post,
            'categories' => Category::all()

        ];
        return Inertia::render('Index', $data);
    }

    public function category(Request $request, $slugCategory)
    {   
        if ($request->keyword) {
            $post = $post = Post::where('posts.status' , '=' , 'publish')->with('categories')->join('users' , 'posts.user_id' , '=' , 'users.id')
            ->whereHas('categories', function($q) use ($slugCategory){
                $q->where('slug', 'LIKE', "$slugCategory%");
            })
            ->where(function ($query) use ($request)
            {
                $query->where('title' , 'like', '%'. $request->keyword . '%')
                ->orWhere('content' , 'like', '%'. $request->keyword . '%');
            })
            ->select('posts.*','users.name AS author')
            ->latest('posts.date')
            ->paginate(8);
        } else {
            $post = $post = Post::where('posts.status' , '=' , 'publish')->with('categories')->join('users' , 'posts.user_id' , '=' , 'users.id')
            ->whereHas('categories', function($q) use ($slugCategory){
                $q->where('slug', 'LIKE', "$slugCategory%");
            })
            ->select('posts.*','users.name AS author')
            ->latest('posts.date')
            ->paginate(8);
        }
        $data =[
            'category_name' => Category::where('slug', $slugCategory)->first()->name,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'category' => $slugCategory,
            'posts' => $post,
            'categories' => Category::all()
        ];
            return Inertia::render('Index', $data);
    }

    public function show($slug)
    {
        $post = Post::where([['posts.slug', '=', $slug], ['posts.status' , '=' , 'publish']])->with('categories')->with(array('comments' => function($q){
            $q->orderBy('created_at', 'desc');
        }))->join('users', 'posts.user_id' ,'=' , 'users.id')->select('posts.*', 'users.name AS user_name', 'users.email AS user_email')->first();
        // dd($post);
        $data =[
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'category' => $post->category,
           'post' => $post,
           'categories' => Category::all(),
           'show' => true


        ];
        
        return Inertia::render('ShowPost' , $data);
    }

    public function allUser()
    {
        $data = [
            'users' => User::with('roles')->latest('users.created_at')->get()
        ];
        return Inertia::render('Auth/All User/AllUser', $data);


    }
    public function allUserEdit($id)
    {
        $data = [
            'users' => User::where('id' , '=', $id)->with('roles')->first(),
            'roles' => Role::all()
        ];
        return Inertia::render('Auth/All User/EditUser', $data);
    }
    public function allUserUpdate(Request $request, $id)
    {
        // dd($request);
        $user = User::find($id);
        $user->roles()->sync($request->role);
        return Redirect::route('alluser.index')->with('message', "User's role has been updated!");
    }

    public function allUserDelete($id)
    {
        Post::where('user_id', '=', $id)->delete();
        User::where('id', '=', $id)->delete();
        return Redirect::route('alluser.index')->with('message', "User has been deleted!");
    }
   
}
