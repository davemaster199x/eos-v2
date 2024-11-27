<?php

namespace App\Models\EliteModel\SpecialistOffice;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecialtiesOfferedDetail extends Model
{
    use HasFactory;

    protected $table = 'sp_specialties_offered_details';

    protected $fillable = [
        'specialist_office_id',
        'specialties_offered',
        'status',
    ];

    public function specialistOffice()
    {
        return $this->belongsTo(SpecialistOffice::class, 'specialist_office_id');
    }
}
