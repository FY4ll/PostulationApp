<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostulationUser extends Model
{
    public $timestamps = true;
    protected $table = 'postulation_user';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',
        'postulation_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function postulation()
    {
        return $this->belongsTo(Postulation::class);
    }
}
