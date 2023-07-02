<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $guarded=['id'];
    use HasFactory;

    public function categories()
    {
        return $this->belongsTo(Category::class);
    }
    public function roles()
    {
        return $this->hasMany(User::class);
    }
}
