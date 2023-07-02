<?php

namespace App\Http\Controllers\Auth\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return response()->json([
                'status' => true,
                'message' => 'Your Post List',
                'posts' => Post::where('user_id', auth()->user()->id)->with(array('categories' => function ($q) {
                    $q->select(array('name'));
                }))->get()
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function homePost()
    {
        try {
            return response()->json([
                'status' => true,
                'message' => 'Your Post List',
                'posts' => Post::with(array('categories' => function ($q) {
                    $q->select(array('name'));
                }))->get()
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
    // public function create(): Response
    // {
    //     // 
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
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
            return response()->json([
                'status' => true,
                'message' => 'Create Post Success',
                'posts' => $post
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
    public function show(string $id)
    {
        try {
            $this->authorize('read post');
            $data = [
                'post' => Post::with('categories')->where('id', '=', $id)->first()
            ];
            return response()->json([
                'status' => true,
                'message' => 'Post List',
                'post' => $data['post']
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
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $this->authorize('update post');
            $post1 = Post::find($id)->first();
            if ($request->image !== $post1->image) {
                Storage::delete($post1->image);
                $post = Post::where('id', $id)->update([
                    'title' => $request->title,
                    'date' => $request->date,
                    'content' => $request->content,
                    // 'image' => $request->file('image')->store('post-image'),

                ]);
            } else if ($request->image) {
                $post = Post::where('id', $id)->update([
                    'title' => $request->title,
                    'content' => $request->content,
                    'date' => $request->date,
                ]);
            }
            $temp_category = [];
            foreach ($request->category as $value) {
                if (is_array($value)) {
                    $value = $value['value'];
                }
                $temp_category[] = $value;
            }
            $post1->categories()->sync($temp_category);

            return response()->json([
                'status' => true,
                'message' => 'Post has been updated!',
                'posts' => Post::where('id', '=', $id)->first()
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
            $post_name = Post::where('id', $id)->first();
            $this->authorize('delete post');
            $post = Post::where('id', $id)->first();

            if ($this->authorize('delete post') && $this->authorize('approve post')) {
                Storage::delete($post->image);
                Post::destroy($post->id);
                return response()->json([
                    'status' => true,
                    'message' => 'Post has been updated!',
                    'posts' => 'Post ( ' . $post_name->title . ' ) has been deleted!'
                ], 200);
            } else if ($post->user_id == auth()->user()->id) {
                Storage::delete($post->image);
                Post::destroy($post->id);
                return response()->json([
                    'status' => true,
                    'message' => 'Post has been updated!',
                    'posts' => 'Post ( ' . $post_name->title . ' ) has been deleted!'
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'You are not authorized to delete this post!'
                ], 403);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
