<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index(): Response
    // {
    //     //
    // }

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
    public function store(StoreCommentRequest $request): RedirectResponse
    {
        $post_id = Post::where('slug' ,'=', $request->post_slug)->first();
        Comment::create([
            'post_id' => $post_id->id,
            'user_id' => auth()->user()->id,
            'name' => auth()->user()->name,
            'comment' => $request->comment
        ]);
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    // public function show(Comment $comment): Response
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Comment $comment): Response
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    // public function update(UpdateCommentRequest $request, Comment $comment): RedirectResponse
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
//     public function destroy(Comment $comment): RedirectResponse
//     {
//         //
//     }
}
