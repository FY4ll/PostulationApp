<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Postulation extends Model
{
    protected $fillable = [
        'nom',
        'prenom',
        'mail',
        'apprentissage',
        'situation',
        'cv_path',
        'motivation_path',
        'video_path',
    ];
}
