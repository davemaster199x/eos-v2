<?php

namespace App\Models\EliteModel\Provider;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PSpecialtyDetail extends Model
{
    use HasFactory;

    protected $table = 'p_specialty_details';

    protected $fillable = [
        'provider_id',
        'name',
        'status',
    ];

    public function provider()
    {
        return $this->belongsTo(Provider::class, 'provider_id');
    }
}
