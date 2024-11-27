<?php

namespace App\Models\EliteModel\SpecialistOffice;

use App\Models\EliteModel\Specialist\Specialist;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecialistOffice extends Model
{
    use HasFactory;

    protected $table = 'specialist_offices';

    protected $fillable = [
        'specialist_id',
        'full_address',
        'latitude',
        'longitude',
        'street_address',
        'city',
        'state',
        'zip',
        'office_name',
        'office_notes',
        'phone',
        'image_of_office',
        'status',
        'specialties_offered'
    ];

    protected $casts = [
        'specialties_offered' => 'array',
    ];

    public function specialties()
    {
        return $this->hasMany(SpecialtiesOfferedDetail::class, 'specialist_office_id');
    }

    public function specialist()
    {
        return $this->belongsTo(Specialist::class, 'specialist_id');
    }
}
