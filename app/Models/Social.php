<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Social extends Model {

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'facebook',
        'instagram',
        'linkedin',
        'twitter',
        'google',
    ];

}
