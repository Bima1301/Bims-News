<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded=['id'];
    use HasFactory;

    public function posts()
    {
        return $this->belongsToMany(Post::class);
    }
    public function getRouteKeyName()
{
    return 'slug';
}
}
