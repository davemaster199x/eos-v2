<?php

namespace App\Models\EliteModel\SpecialistStaff;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SsSpecialistDetail extends Model
{
    use HasFactory;

    protected $table = 'ss_specialist_details';

    protected $fillable = [
        'specialist_staff_id', 'specialist_id', 'status',
    ];

    public function specialistStaff()
    {
        return $this->belongsTo(SpecialistStaff::class, 'specialist_staff_id');
    }

    public function specialist()
    {
        return $this->belongsTo(Specialist::class, 'specialist_id');
    }
}
