<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Permission;

class Module extends Model
{
    protected $guarded = ['id'];
    use HasFactory;

    public function permissions()
    {
        return $this->hasMany(Permission::class);
    }
}
