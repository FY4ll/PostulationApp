<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class postulations_preavis extends Model
{
    public $timestamps = true;
    protected $table = 'postulations_preavis';
    protected $primaryKey = 'id';
    protected $fillable = [
        'postulation_id',
        'colab_id',
        'resultat',
        'commentaire',
    ];

    public function postulation()
    {
        return $this->belongsTo('App\Models\Postulation\Postulation', 'postulation_id');
    }

    public function colab()
    {
        return $this->belongsTo('App\Models\Postulation\User', 'user_id');
    }
}

