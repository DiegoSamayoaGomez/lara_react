<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // Desactivar los timestamps automáticos
    public $timestamps = false;

    protected $fillable = [
        'title',
        'description'
    ];

    // Task model
    public function user()
    {
        // Especificar que la clave foránea es 'id_user' y no 'user_id'
        return $this->belongsTo(User::class, 'id_user');
    }
}
